# v1 から v2 への移行

v2.0.0 では、型定義をfincode APIの実際の挙動に合わせ直し、あわせて通信部分を
作り直しました。

**Node.js 20.18.1 以上が必要になります。** HTTPクライアントを node-fetch から
undici に変えたためです。次の3つへの依存はなくなりました。

- `node-fetch`
- `https-proxy-agent`
- `form-data`

移行にあたっては、まず `tsc` を通してください。誤った名前や型はコンパイルエラーに
なります。ただし **コンパイルエラーにならない変更が5つ** あるので、そちらは
先に確認してください。

---

## 1. コンパイルエラーにならない変更

### 口座振替の預金区分

もっとも注意が必要な変更です。決済手段登録の `directdebit.account_type` は、
値の意味が入れ替わりました。

    v1: "0" = 普通預金 / "1" = 当座預金
    v2: "1" = 普通預金 / "2" = 当座預金

`"1"` は v1 でも v2 でも有効な値なので、当座預金を意図して `"1"` を渡していた
コードは、エラーにならずに普通預金として登録されます。v1 で `"0"` を渡していた
コードはAPIがエラーを返していたため、そちらは気付けます。

```ts
// v1 で当座預金を意図していたなら
directdebit: { account_type: "1" }   // → "2" に変える

// v1 で普通預金を意図していたなら
directdebit: { account_type: "0" }   // → "1" に変える（v1 ではAPIエラーだった）
```

契約情報や審査情報の `account_kind` は別のフィールドで、`0` = 普通 / `1` = 当座
のままです。取り違えないでください。

### クエリパラメータのリストの送信形式

v1 はリストを同じキーの繰り返しで送っていました。fincode APIは最初の値だけを
読むため、2つ目以降の条件が無視されていました。

    v1: status=CAPTURED&status=AUTHORIZED   → CAPTURED だけで絞り込まれる
    v2: status=CAPTURED,AUTHORIZED          → OR検索になる

ソート順も同じで、v1 では第2キー以降が効いていませんでした。

コードの書き方は変わりません。v1 で複数条件やマルチソートを指定していた場合、
**返ってくる結果が変わります**。件数や並び順に依存した処理があれば確認してください。

### 数値と文字列を取り違えていた項目

APIが数値で返す項目を `string`、文字列で返す項目を `number` と宣言していました。
`typeof` 判定やリテラル比較をしている箇所は動作が変わります。

| 項目                             | v1       | v2       |
| :--                              | :--      | :--      |
| `payment_term_day`（レスポンス） | `string` | `number` |
| `pay_times`（レスポンス）        | `string` | `number` |
| `destination_type`               | `string` | `number` |
| `log_keep_days`                  | `string` | `number` |
| Webhook通知の件数系8項目         | `number` | `string` |

Webhook通知の `succeeded` / `failed` / `total` / `error_total_count` /
`regist_total_count` / `succeeded_count` / `failed_count` / `total_count` は
文字列で届きます。v1 の型に従って数値として足し算していた場合、文字列連結に
なっていました。

---

### プロキシ環境変数

`options.proxyAgent` を指定しない場合、`HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` から
プロキシを読むようになりました。v1 はこれらを見なかったため、プロキシ配下では
`options.proxyAgent` を渡さないと接続できませんでした。

これらの環境変数が設定された環境で、fincode への通信だけはプロキシを経由させたく
ない場合は、`NO_PROXY` に fincode のホストを加えてください。

```
NO_PROXY=api.fincode.jp,api.test.fincode.jp
```

`options.proxyAgent` を渡した場合は従来どおりそちらが使われます。この指定は
`NO_PROXY` より優先されます。

---

### リクエストのタイムアウト

タイムアウトの既定値が60秒になりました。v1 では `options.timeout` を指定しない
場合、node-fetch に `undefined` が渡って無制限として扱われ、応答が来ないまま
リクエストが残り続けていました。

決済SDKでこれが問題になるのは、応答が返らないと決済が成立したか判断できないこと
です。60秒で打ち切り、`FincodeSDKError` を返します。

60秒を超える呼び出しがある場合は `options.timeout` で調整してください。`0` を
渡すと v1 と同じ無制限になります。

```ts
const fincode = createFincode({
    apiKey: "...",
    environment: "prod",
    options: { timeout: 120000 },  // 2分
})
```

---

## 2. 決済種別ごとに分かれたリクエスト

必須項目が決済種別ごとに違うため、単一の型では表現できませんでした。v2 では
`pay_type` で判別するユニオンになっています。

### レスポンスの pay_type をリクエストに渡す場合

v1 で書けたこのコードは、v2 ではコンパイルエラーになります。

```ts
const created = await fincode.payments.create({ pay_type: "Card", job_code: "CAPTURE", amount: "3000" })

// v2 ではエラー: PayType を "Card" に代入できない
await fincode.payments.execute(created.id, {
    pay_type: created.pay_type,
    access_id: created.access_id,
})
```

レスポンスの `pay_type` は7種別すべてを取りうる `PayType` なので、特定の種別に
絞られたリクエスト型には渡せません。呼び出し側では決済種別が分かっているので、
リテラルで書いてください。

```ts
await fincode.payments.execute(created.id, {
    pay_type: "Card",
    access_id: created.access_id,
})
```

### 決済種別ごとの必須項目

登録（`payments.create`）で必須になる項目です。

    pay_type         job_code   amount   billing_amount
    Card             必須       -        -
    Konbini          -          必須     -
    Paypay           必須       必須     -
    Applepay         必須       必須     -
    Googlepay        必須       必須     -
    Directdebit      -          必須     -
    Virtualaccount   -          -        必須

実行（`payments.execute`）では、全種別で `access_id` が必須です。加えて次の項目が
必要になります。

    Konbini          device_name win_width win_height pixel_ratio win_size_type
    Paypay           redirect_url
    Applepay         token
    Googlepay        token method
    Directdebit      customer_id target_date

### 対応する決済種別が増えた操作

v1 では型に無く呼べなかった組み合わせです。

| 操作       | v2 で追加された種別    |
| :--        | :--                    |
| 売上確定   | Applepay、Googlepay    |
| 再オーソリ | Googlepay              |
| 金額変更   | Googlepay、Directdebit |
| 認証後決済 | Googlepay              |

金額変更で PayPay または口座振替を使う場合、`job_code` は渡せません。この2種別に
`job_code` は存在しないため、v1 で必須にしていたのが誤りでした。

### 決済一覧取得のクエリ

`RetrievingPaymentListQueryParams` もユニオンになり、`pay_type` の指定が必須です。

更新日時での絞り込みは、決済種別によって項目名が違います。

| 項目名                                | 決済種別                                     |
| :--                                   | :--                                          |
| `update_date_from` / `update_date_to` | Card、Applepay、Googlepay                    |
| `updated_from` / `updated_to`         | Konbini、Paypay、Directdebit、Virtualaccount |

v1 は `update_date_from` / `update_date_to` しか持っていなかったため、後者の4種別では
更新日時での絞り込みが効いていませんでした。

---

## 3. 名前が変わった型とフィールド

### 型名

| v1                                                | v2                                                |
| :--                                               | :--                                               |
| `ContractAquirer`                                 | `ContractAcquirer`                                |
| `RetrievinggPlatformAccountSummaryListPagination` | `RetrievingPlatformAccountSummaryListQueryParams` |

### レスポンスのフィールド

APIが返すキー名と一致しておらず、常に `undefined` になっていた項目です。

| v1                                                        | v2                                 |
| :--                                                       | :--                                |
| `cpde_expiry_date`                                        | `code_expiry_date`                 |
| `payment_result_code`                                     | `paypay_result_code`               |
| `card.card_type`                                          | `card.type`                        |
| `created_date` / `updated_date`（サブスクリプション解約） | `created` / `updated`              |
| `schedled_deposit_date`                                   | `scheduled_deposit_date`           |
| `stop_cancel_memo`                                        | `stop_cancelaltion_memo`           |
| `aquirer`（契約状況Webhook）                              | `acquirer`                         |
| `enable_immediate_use`（本番環境申請のレスポンス）        | `status_code`                      |
| `konbini_receipt_mail_send_flag`                          | `konbini_reception_mail_send_flag` |

### リクエストのフィールド

送信時のキー名が誤っており、指定した値がAPIに届いていなかった項目です。

| v1                                       | v2                                 |
| :--                                      | :--                                |
| `tds2_pre_order_purchaselnd`             | `tds2_pre_order_purchase_ind`      |
| `tds2_recuring_expiry`                   | `tds2_recurring_expiry`            |
| `tds2_recuring_frequency`                | `tds2_recurring_frequency`         |
| `id`（テナントショップ更新）             | `examination_master_id`            |
| `deoisut_cycle_master_id`                | `deposit_cycle_master_id`          |
| `bank_account`（審査情報更新）           | `contract_bank_account`            |
| `konbini_reception_mail_flag`            | `konbini_reception_mail_send_flag` |
| `provides.digital_content`（審査情報V2） | `provides.digital_contents`        |

---

## 4. 引数の順序が変わったメソッド

クエリパラメータを受け取れるようになった2つのメソッドで、ヘッダーの位置が
第2引数から第3引数に移りました。

```ts
// v1
await fincode.accounts.retrieveDetailList(id, headers)
await fincode.platformAccounts.retrieveSummaryList(id, headers)

// v2
await fincode.accounts.retrieveDetailList(id, queryParams, headers)
await fincode.platformAccounts.retrieveSummaryList(id, queryParams, headers)
```

v1 では型が定義済みなのにメソッドが受け取っておらず、明細が10件を超えると残りを
取得できませんでした。

---

## 5. 一覧取得の戻り値の型

売上入金とプラットフォーム利用料収入は、一覧と単体取得で返却内容が違います。
一覧では手数料の内訳と入金先口座が返らないため、型を分けました。

```ts
// v2 の戻り値
fincode.accounts.retrieveList()         // ListResponse<AccountListItemObject>
fincode.accounts.retrieve(id)           // AccountObject
fincode.platformAccounts.retrieveList() // ListResponse<PlatformAccountListItemObject>
fincode.platformAccounts.retrieve(id)   // PlatformAccountObject
```

一覧の結果から `deposit_destination` や手数料の内訳を読んでいた場合、単体取得に
変える必要があります。v1 では型に存在していましたが、値は返っていませんでした。

`AccountDetailObject` は項目がほぼ入れ替わりました。v1 は売上入金そのものの形を
していて、明細固有の項目を1つも持っていませんでした。`GET /v1/accounts/{id}/detail`
の戻り値を使っていた場合、ほぼ全ての参照が `undefined` だったはずです。

---

## 6. null を返しうるようになった項目

| 項目                                                  | 補足                                             |
| :--                                                   | :--                                              |
| `SubscriptionObject.next_charge_date`                 | 解約済みと未完了のサブスクリプションでは入らない |
| `SubscriptionObject.plan_name`                        |                                                  |
| 決済手段の `card.expire` / `card.type` / `card.brand` |                                                  |

`SubscriptionObject.payment_method_id` と `end_month_flag` は任意になりました。
前者はカード決済のサブスクリプションでは返らず、後者は口座振替では返りません。

---

## 7. 指定が必須になった項目

| 項目                                                     | 省略時のAPIの応答                                    |
| :--                                                      | :--                                                  |
| プラットフォームショップ更新の `examination_master_id`   | 審査種別マスタIDが指定されていません                 |
| 決済URL作成の `konbini.konbini_reception_mail_send_flag` | お支払い画面案内メール送信フラグが指定されていません |
| 決済手段登録の `directdebit.bank_code`                   | null を渡せなくなった                                |
| 審査情報V2更新の `bank_account_info`                     | 5項目すべてが必須。`bank_name` などは渡せない        |

カード登録セッション作成の `expire` は逆に任意になりました。省略するとAPIが24時間後を
既定値として設定します。

---

## 8. 値域が変わった enum

| 型                                                       | 変更                                               |
| :--                                                      | :--                                                |
| `PayType`                                                | `Googlepay` を追加                                 |
| `PaymentStatus`                                          | `AWAITING_PAYMENT_APPROVAL` を追加                 |
| `KonbiniCode`                                            | `00030`（ファミリーマート）を追加                  |
| `DirectDebitResultCode`                                  | `"7"` と `"8"` を追加                              |
| `method`                                                 | `"5"`（リボ払い）を追加                            |
| `pay_pattern`                                            | `bulk` を追加                                      |
| `tds2_status`                                            | `"2" \| "3"` から `ThreeDSecure2Status` に差し替え |
| `tds2_ship_ind`                                          | `string` から `"01"`〜`"07"` に                    |
| `tds2_reorder_items_ind` / `tds2_pre_order_purchase_ind` | `string` から `"01" \| "02"` に                    |
| `ExaminationMaster`                                      | 3値から12値に                                      |
| `DepositCycleMasterId`                                   | `3`、`4`、`5` を削除                               |
| `SalesDepositStatusCode`                                 | `503` を削除                                       |
| `PlatformRateConfig.id`                                  | `string` から `ExaminationMaster` に               |
| `WebhookEvent`                                           | 28イベントから77イベントに                         |

---

## 9. 削除された項目

APIが受け取らない、あるいは返さない項目です。指定していてもAPIに無視されていました。

| 型                             | 削除した項目                                                         |
| :--                            | :--                                                                  |
| 決済登録リクエスト             | `token`                                                              |
| 決済実行リクエスト             | `expire`、`account_shop_name`                                        |
| PayPay決済のWebhook通知        | `merchant_capture_id`                                                |
| カードのWebhook通知            | `order_id`、`error_code`                                             |
| 一括決済のWebhook通知          | `process_plan_date`                                                  |
| `PlatformAccountSummaryObject` | `deposit_date`、`settlement_amount`、`bank_transfer_fee`、`verified` |

カードのWebhook通知には代わりに `customer_id` と `process_type` が入りました。
`process_type` は登録（`I`）と更新（`U`）を区別する項目で、`card.regist` と
`card.update` を同じエンドポイントで受ける場合に必要になります。

---

## 10. エラーの扱い

### Error を継承するようになりました

`FincodeAPIError` と `FincodeSDKError` が `Error` を継承していなかったため、
`instanceof Error` が `false` になり、スタックトレースも持っていませんでした。
エラー監視に渡しても Error として扱われません。

```ts
// v1
catch (e) {
    e instanceof Error   // false
    e.stack              // undefined
}

// v2
catch (e) {
    e instanceof Error   // true
    e.stack              // あり
}
```

`e instanceof Error` で分岐して SDK のエラーを取りこぼしていた場合、v2 では
そちらの分岐に入るようになります。

### FincodeSDKError に失敗の種類が付きました

v1 ではタイムアウトも接続失敗もJSONの解析失敗も、すべて
`FincodeSDKError("Error fetching data")` になっていました。区別するには
`e.child.type` を読むしかなく、これは node-fetch の内部表現です。

`kind` を見てください。

| `kind`          | 意味                                                |
| :--             | :--                                                 |
| `timeout`       | `options.timeout` 内に終わらなかった                |
| `network`       | fincode に届かなかった（名前解決や接続、TLSの失敗） |
| `response_body` | 応答は来たが本文がJSONではなかった                  |
| `unknown`       | それ以外                                            |

```ts
catch (e) {
    if (e instanceof FincodeSDKError && e.kind === "timeout") {
        // リクエストが fincode に届いている可能性があります。
        // 決済登録なら、決済が成立しているかを一覧取得で確かめてください。
    }
}
```

`timeout` と `network` の違いは再送の判断で逆になります。`network` は届いて
いないので同じリクエストを送り直せますが、`timeout` は届いているかもしれません。

再送するかどうかはSDKでは判定しません。同じ失敗でも、決済登録の再送は二重決済に
なりうる一方で一覧取得なら安全で、冪等キーを付けているかどうかでも変わります。
呼び出している操作に応じて決めてください。

本文がJSONでない場合は `status` にHTTPステータスが入ります。fincode 自身はJSONを
返しますが、手前のプロキシやWAFが 502 や 503 でHTMLを返すことがあります。

### コンストラクタと child の型が変わりました

```ts
// v1
new FincodeSDKError(message, thrownObject)
// v2
new FincodeSDKError(message, kind, { status, child })
```

`child` の型が `any` から `unknown` になったため、`e.child.type` のような参照は
キャストが必要です。中身も node-fetch の `FetchError` から undici のエラーに
変わっています。`kind` を見れば、HTTPクライアントに依存せず判定できます。

`message` の文字列も種類ごとに変わりました。文字列で分岐していた場合は `kind` に
置き換えてください。

---

## 11. FincodeConfig の apiKey

`FincodeConfig.apiKey` が `getApiKey(): string` に変わりました。

v1 は `config` にAPIキーを文字列で持っていたため、`JSON.stringify(fincode)` や
`console.log(fincode)` にシークレットキーがそのまま出ていました。各リソースクラスも
同じ `config` を持つので、1インスタンスあたり15回出力されます。

```
JSON.stringify(fincode)
  {"config":{"isLiveMode":false,"apiKey":"m_test_...","options":{}},
   "_customers":{"_config":{"isLiveMode":false,"apiKey":"m_test_...
```

関数は `JSON.stringify` の出力に含まれず、`util.inspect` にも `[Function]` として
しか出ません。取り出す経路は `config.getApiKey()` として残しています。

`FincodeConfig` を自分で組み立てていた場合は修正が必要です。`createFincode` に
`apiKey` を渡す通常の使い方には影響しません。

---

## 12. import できなくなった識別子

通信の内部実装が公開APIに出ていたので、公開から外しました。

| 識別子                       | 用途                            |
| :--                          | :--                             |
| `buildQueryString`           | クエリ文字列の組み立て          |
| `createFincodeRequestURL`    | URLの組み立て                   |
| `createFincodeRequestFetch`  | fetch の組み立て                |
| `createFincodeRequestHeader` | ヘッダの組み立て                |
| `FincodeRequestHeader`（型） | `Record<string, string>` の別名 |

各メソッドの引数に現れる `FincodeRequestHeaders`（末尾が s）は引き続き import
できます。

SDKが未対応のエンドポイントを `createFincodeRequestFetch` で直接叩いていた場合は
影響します。

---

## 13. 決済手段APIの変更

### delete に決済種別が必要になりました

`paymentMethods.delete` は決済種別を送っていなかったため、v1 ではどう呼んでも
`EP017023001`「決済種別が指定されていません。」で失敗していました。第3引数に
クエリパラメータを取ります。

```ts
// v1（常に失敗していた）
await fincode.paymentMethods.delete(customerId, id)

// v2
await fincode.paymentMethods.delete(customerId, id, { pay_type: "Card" })
```

戻り値も変わりました。`DeletingPaymentMethodResponse`（`id` と `delete_flag` の
2項目）から `PaymentMethodObject` になり、この型は削除しました。`id` と
`delete_flag` はそのまま読めますが、`delete_flag` は省略可能な項目です。

`headers` を第3引数に渡していた場合は第4引数に移してください。

### pay_type の値域が広がりました

`PaymentMethodObject.pay_type` と `RetrievingPaymentMethodQueryParams.pay_type` に
`Virtualaccount` が加わりました。後者は v1 では `Directdebit` しか受け付けず、
カードと固定バーチャル口座は取得すらできませんでした。

`pay_type` で網羅的に分岐していた場合は分岐の追加が必要です。

---

## 14. 決済セッションの pay_type の値域

`PaymentSessionObject.transaction.pay_type` に `Virtualaccount` が加わりました。
この配列の要素を `switch` で網羅していた場合、分岐が1つ足りなくなります。

リクエスト側にも `virtualaccount` ブロックが加わりました。v1 では
リクエスト・レスポンスとも無く、バーチャル口座を含む決済URLを型どおりには
作れませんでした。

```ts
await fincode.paymentSessions.create({
    transaction: { pay_type: ["Virtualaccount"], amount: "1000" },
    virtualaccount: {
        virtualaccount_reception_mail_send_flag: "0",
        use_exact_deposit_amount: true,
    },
})
```

---

## 15. Webhook通知の型

通知型を6つから20に増やし、決済種別ごとの共用体にしました。

### 決済の通知が共用体になりました

`PaymentWebhookNotification` は1つのフラットな型で、口座振替とバーチャル口座、
Google Pay の項目を持っていませんでした。これらの通知は型どおりには読めません。
決済種別ごとに7つの変種に分けたので、分岐が必要になります。

```ts
// v1
const konbini = notification.konbini_code

// v2
switch (notification.pay_type) {
    case "Card":           return notification.approve
    case "Konbini":        return notification.konbini_code
    case "Virtualaccount": return notification.va_account_number
    // ...
}
```

7種別すべてに共通する13項目は分岐なしで読めます。

- `shop_id`
- `order_id`
- `access_id`
- `status`
- `customer_id`
- `client_field_1` から `client_field_3`
- `amount`
- `tax`
- `error_code`
- `pay_type`
- `event`

通知の `amount` と `tax` は文字列です。決済APIが返す数値とは違います。

### サブスクリプションと定期課金バッチ、一括決済も分かれました

3つとも `pay_type` が `Card` に固定されており、口座振替とバーチャル口座を
表現できませんでした。共用体にして値域を広げています。一括決済だけは分岐の軸が
操作（登録とバッチ）です。

### 決済手段の通知が加わりました

`customers.payment_methods.**` の通知は v1 に型がありませんでした。決済種別ごとに
構造が違うので、フラットな型を期待して自前で書いていた場合は分岐が必要です。

```ts
const receive = (p: PaymentMethodWebhookNotification) => {
    switch (p.pay_type) {
        case "Card":           return p.card_id
        case "Directdebit":    return p.payment_method_id
        case "Virtualaccount": return p.id
    }
}
```

決済手段IDの項目名が種別ごとに違い、`status` の意味も違います。カードの `status`
は3Dセキュア2.0認証の状態（`AUTHENTICATED` / `CHECK`）で、決済手段の状態は
`card_status` に入ります。

発火するイベントも種別ごとに違います。5つのイベントが発生するのは固定バーチャル
口座だけで、カードと口座振替は `customers.payment_methods.updated` のみです。

### 未対応だった4つを追加しました

カード更新完了、インボイス、チャージバック、変更申請です。

### event を型で絞りました

20の通知型すべてで、`event` は届きうるイベントだけを受けます。そのエンドポイント
に来ないイベントを書くとコンパイルエラーになります。

```ts
// インボイスの受信処理にカード決済のイベントは来ない
const p: InvoiceWebhookNotification = { event: "payments.card.regist" }
```

---

## 16. 一括決済のバーチャル口座

`pay_type` が3箇所で `Card` に固定されており、バーチャル口座の一括決済は登録も
照会もできませんでした。

```ts
// v2
await fincode.paymentBulks.create(
    { pay_type: "Virtualaccount", process_plan_date: "2030/01/01" },
    { file, fileName: "bulk.json" },
)
```

明細取得の戻り値はクエリの `pay_type` で決まります。明細自体は `pay_type` を
持たないため、リテラルを渡さないと形が確定しません。

```ts
const card = await fincode.paymentBulks.retrieveDetailList(id, { pay_type: "Card" })
// PaymentBulkDetailObject
const va = await fincode.paymentBulks.retrieveDetailList(id, { pay_type: "Virtualaccount" })
// VirtualAccountPaymentBulkDetailObject
```

一覧から読んだ `pay_type` のように値が確定しない場合は、両方の共用体が返ります。
共通の9項目は分岐なしで読めます。

---

## 17. 接続先の指定

`isLiveMode` に代わって `environment` を追加しました。`"test"` と `"prod"` を取り、
省略すると `"test"` になります。APIキーの接頭辞（`m_test_` / `m_prod_`）と同じ語です。

```ts
// v1
createFincode({ apiKey: "...", isLiveMode: true })

// v2
createFincode({ apiKey: "...", environment: "prod" })
```

`isLiveMode` も引き続き使えます。`@deprecated` を付けてあるので、エディタ上では
取り消し線で表示されます。両方を指定した場合は `environment` が優先されます。

### FincodeConfig の isLiveMode

`FincodeConfig` の `isLiveMode` が `baseUrl` に変わりました。実際に使う接続先が
文字列で入ります。

```ts
fincode.config.isLiveMode   // v1: boolean
fincode.config.baseUrl      // v2: "https://api.fincode.jp"
```

`createFincode` に `apiKey` と `environment` を渡す通常の使い方には影響しません。
`FincodeConfig` を自分で組み立てていた場合や、`config.isLiveMode` を読んでいた場合は
修正が必要です。

### 接続先をURLで指定する

`options.baseUrl` を追加しました。テストでモックサーバーへ向ける場合などに
使います。

```ts
createFincode({
    apiKey: "...",
    options: { baseUrl: "https://api.example.com" },
})
```

`https` 以外のURLと、資格情報を含むURL（`https://user:pw@host`）は受け付けません。
シークレットキーはリクエストごとに `Authorization` ヘッダーへ載るため、この値が
キーの送信先になります。外部から渡された値をそのまま指定しないでください。

`environment` や `isLiveMode` との同時指定はエラーになります。URLで指定する場合は
`environment` を外してください。消し忘れた `baseUrl` が `environment` を上書きして
しまうと、設定と実際の送信先が食い違ったまま気づけません。
