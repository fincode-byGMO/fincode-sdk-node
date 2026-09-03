# v1 から v2 への移行

v2.0.0 では、型定義をfincode APIの実際の挙動に合わせ直しました。変更の大半は
型定義に閉じており、ランタイムの動作が変わるのはクエリパラメータの送信形式だけです。

移行にあたっては、まず `tsc` を通してください。誤った名前や型はコンパイルエラーに
なります。ただし **コンパイルエラーにならない変更が3つ** あるので、そちらは
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

| 項目 | v1 | v2 |
|:--|:--|:--|
| `payment_term_day`（レスポンス） | `string` | `number` |
| `pay_times`（レスポンス） | `string` | `number` |
| `destination_type` | `string` | `number` |
| `log_keep_days` | `string` | `number` |
| Webhook通知の件数系8項目 | `number` | `string` |

Webhook通知の `succeeded` / `failed` / `total` / `error_total_count` /
`regist_total_count` / `succeeded_count` / `failed_count` / `total_count` は
文字列で届きます。v1 の型に従って数値として足し算していた場合、文字列連結に
なっていました。

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

| 操作 | v2 で追加された種別 |
|:--|:--|
| 売上確定 | Applepay、Googlepay |
| 再オーソリ | Googlepay |
| 金額変更 | Googlepay、Directdebit |
| 認証後決済 | Googlepay |

金額変更で PayPay または口座振替を使う場合、`job_code` は渡せません。この2種別に
`job_code` は存在しないため、v1 で必須にしていたのが誤りでした。

### 決済一覧取得のクエリ

`RetrievingPaymentListQueryParams` もユニオンになり、`pay_type` の指定が必須です。

更新日時での絞り込みは、決済種別によって項目名が違います。

| 項目名 | 決済種別 |
|:--|:--|
| `update_date_from` / `update_date_to` | Card、Applepay、Googlepay |
| `updated_from` / `updated_to` | Konbini、Paypay、Directdebit、Virtualaccount |

v1 は `update_date_from` / `update_date_to` しか持っていなかったため、後者の4種別では
更新日時での絞り込みが効いていませんでした。

---

## 3. 名前が変わった型とフィールド

### 型名

| v1 | v2 |
|:--|:--|
| `ContractAquirer` | `ContractAcquirer` |
| `RetrievinggPlatformAccountSummaryListPagination` | `RetrievingPlatformAccountSummaryListQueryParams` |

### レスポンスのフィールド

APIが返すキー名と一致しておらず、常に `undefined` になっていた項目です。

| v1 | v2 |
|:--|:--|
| `cpde_expiry_date` | `code_expiry_date` |
| `payment_result_code` | `paypay_result_code` |
| `card.card_type` | `card.type` |
| `created_date` / `updated_date`（サブスクリプション解約） | `created` / `updated` |
| `schedled_deposit_date` | `scheduled_deposit_date` |
| `stop_cancel_memo` | `stop_cancelaltion_memo` |
| `aquirer`（契約状況Webhook） | `acquirer` |
| `enable_immediate_use`（本番環境申請のレスポンス） | `status_code` |
| `konbini_receipt_mail_send_flag` | `konbini_reception_mail_send_flag` |

### リクエストのフィールド

送信時のキー名が誤っており、指定した値がAPIに届いていなかった項目です。

| v1 | v2 |
|:--|:--|
| `tds2_pre_order_purchaselnd` | `tds2_pre_order_purchase_ind` |
| `tds2_recuring_expiry` | `tds2_recurring_expiry` |
| `tds2_recuring_frequency` | `tds2_recurring_frequency` |
| `id`（テナントショップ更新） | `examination_master_id` |
| `deoisut_cycle_master_id` | `deposit_cycle_master_id` |
| `bank_account`（審査情報更新） | `contract_bank_account` |
| `konbini_reception_mail_flag` | `konbini_reception_mail_send_flag` |
| `provides.digital_content`（審査情報V2） | `provides.digital_contents` |

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

| 項目 | 補足 |
|:--|:--|
| `SubscriptionObject.next_charge_date` | 解約済みと未完了のサブスクリプションでは入らない |
| `SubscriptionObject.plan_name` | |
| 決済手段の `card.expire` / `card.type` / `card.brand` | |

`SubscriptionObject.payment_method_id` と `end_month_flag` は任意になりました。
前者はカード決済のサブスクリプションでは返らず、後者は口座振替では返りません。

---

## 7. 指定が必須になった項目

| 項目 | 省略時のAPIの応答 |
|:--|:--|
| プラットフォームショップ更新の `examination_master_id` | 審査種別マスタIDが指定されていません |
| 決済URL作成の `konbini.konbini_reception_mail_send_flag` | お支払い画面案内メール送信フラグが指定されていません |
| 決済手段登録の `directdebit.bank_code` | null を渡せなくなった |
| 審査情報V2更新の `bank_account_info` | 5項目すべてが必須。`bank_name` などは渡せない |

カード登録セッション作成の `expire` は逆に任意になりました。省略するとAPIが24時間後を
既定値として設定します。

---

## 8. 値域が変わった enum

| 型 | 変更 |
|:--|:--|
| `PayType` | `Googlepay` を追加 |
| `PaymentStatus` | `AWAITING_PAYMENT_APPROVAL` を追加 |
| `KonbiniCode` | `00030`（ファミリーマート）を追加 |
| `DirectDebitResultCode` | `"7"` と `"8"` を追加 |
| `method` | `"5"`（リボ払い）を追加 |
| `pay_pattern` | `bulk` を追加 |
| `tds2_status` | `"2" \| "3"` から `ThreeDSecure2Status` に差し替え |
| `tds2_ship_ind` | `string` から `"01"`〜`"07"` に |
| `tds2_reorder_items_ind` / `tds2_pre_order_purchase_ind` | `string` から `"01" \| "02"` に |
| `ExaminationMaster` | 3値から12値に |
| `DepositCycleMasterId` | `3`、`4`、`5` を削除 |
| `SalesDepositStatusCode` | `503` を削除 |
| `PlatformRateConfig.id` | `string` から `ExaminationMaster` に |
| `WebhookEvent` | 28イベントから77イベントに |

---

## 9. 削除された項目

APIが受け取らない、あるいは返さない項目です。指定していてもAPIに無視されていました。

| 型 | 削除した項目 |
|:--|:--|
| 決済登録リクエスト | `token` |
| 決済実行リクエスト | `expire`、`account_shop_name` |
| PayPay決済のWebhook通知 | `merchant_capture_id` |
| カードのWebhook通知 | `order_id`、`error_code` |
| 一括決済のWebhook通知 | `process_plan_date` |
| `PlatformAccountSummaryObject` | `deposit_date`、`settlement_amount`、`bank_transfer_fee`、`verified` |

カードのWebhook通知には代わりに `customer_id` と `process_type` が入りました。
`process_type` は登録（`I`）と更新（`U`）を区別する項目で、`card.regist` と
`card.update` を同じエンドポイントで受ける場合に必要になります。
