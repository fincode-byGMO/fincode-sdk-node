# 変更履歴

## 2.0.0

型定義をfincode APIの実際の挙動に合わせ直し、通信部分を作り直したメジャー
リリースです。移行手順は [MIGRATION.md](./MIGRATION.md) を参照してください。

**Node.js 20.18.1 以上が必要になります。**

コンパイルエラーにならない変更が4つあります。口座振替の預金区分の値、
クエリパラメータのリストの送信形式、数値と文字列を取り違えていた項目、
リクエストのタイムアウトの既定値です。移行ガイドの冒頭にまとめています。

### セキュリティ

`FincodeConfig` がAPIキーを文字列で持っていたため、`JSON.stringify(fincode)` や
`console.log(fincode)` にシークレットキーが出力されていました。各リソースクラスも
同じ `config` を持つので、1インスタンスあたり15回出力されます。`apiKey` を
`getApiKey(): string` に変えました。関数は `JSON.stringify` の出力に含まれません。

### 修正

リクエストのタイムアウトに既定値（60秒）を設けました。`options.timeout` を
指定しない場合、node-fetch に `undefined` が渡って無制限として扱われ、応答が
返らないリクエストが返らないまま残っていました。決済SDKでは、応答が返らないと
決済が成立したか判断できません。`0` を渡せば従来どおり無制限になります。

`tenants.retrieveExaminationInfoV2` が通信エラーのときに解決しませんでした。
通信エラーの catch が JSON 解析の catch に連鎖しており、外側に catch が
無かったためです。接続に失敗すると Promise が永久に未解決のまま残っていました。

決済手段とプランの6メソッドが、通信エラーを `FincodeSDKError` に包まずそのまま
reject していました。同じ失敗が呼び出し箇所によって違う型で返っていました。

`FincodeAPIError` と `FincodeSDKError` が `Error` を継承していなかったため、
`instanceof Error` が `false` で、スタックトレースも持っていませんでした。

送信・返却されるキー名が誤っていた項目を直しました。いずれも値がAPIに届かない、
あるいは常に `undefined` になっていました。

- 3Dセキュア2.0の認証パラメータ3項目の綴り（`tds2_pre_order_purchase_ind`、
  `tds2_recurring_expiry`、`tds2_recurring_frequency`）
- レスポンス9項目（`code_expiry_date`、`paypay_result_code`、`card.type`、
  サブスクリプション解約の `created` / `updated`、`scheduled_deposit_date`、
  `stop_cancelaltion_memo`、契約状況Webhookの `acquirer`、本番環境申請の
  `status_code`、`konbini_reception_mail_send_flag`）
- リクエスト5項目（テナントショップ更新の `examination_master_id`、
  `deposit_cycle_master_id`、審査情報更新の `contract_bank_account`、
  決済URL作成の `konbini_reception_mail_send_flag`、審査情報V2の
  `provides.digital_contents`）

口座振替の預金区分（`directdebit.account_type`）の値と意味を直しました。
`"1"` は普通預金、`"2"` は当座預金です。

クエリパラメータのリストをカンマ区切りで送るようにしました。同じキーの繰り返しでは
APIが最初の値しか読まないため、2つ目以降の条件とソートの第2キー以降が無視されて
いました。`null` を渡すと送信前に `TypeError` で落ちる問題も併せて解消しています。

数値と文字列を取り違えていた項目を揃えました。レスポンスの `payment_term_day` と
`pay_times`、`destination_type`、`log_keep_days` は数値、Webhook通知の件数系
8項目は文字列です。

売上入金明細（`AccountDetailObject`）の型を組み直しました。売上入金そのものの形を
していて、明細固有の項目を1つも持っていませんでした。

プラットフォーム利用料収入のサマリー（`PlatformAccountSummaryObject`）に
テナントショップの識別子と名称を追加しました。テナントごとの内訳を表すための型で、
どのテナントの分か判別できませんでした。

契約情報のカード決済 仕向け先（`contract_card_destination`）を配列にしました。

必須・null許容の指定をAPIの挙動に合わせました。

APIが受け取らない項目、返さない項目を型から削除しました。

型名の綴りを直しました（`ContractAcquirer`）。

JSDocのエンドポイント誤記5件と、存在しない型を指していた `@param` / `@returns`
5件を直しました。閉塞している項目に `@deprecated` を付けました。

### 追加

決済のリクエストを決済種別ごとの型に分けました。対象は登録と実行、売上確定、
キャンセル、再オーソリ、金額変更、認証後決済の7操作です。必須項目が決済種別ごとに
違うため、単一の型では表現できませんでした。

これにより、型に無く呼べなかった組み合わせが使えるようになりました。売上確定の
Apple Pay と Google Pay、再オーソリの Google Pay、金額変更の Google Pay と口座振替、
認証後決済の Google Pay です。

決済一覧取得のクエリも決済種別ごとに分け、欠けていた絞り込み項目を追加しました。
全種別共通の `client_field_1`〜3 と `keyword`、`customer_id`、`process_date_from` /
`to`、`total_amount_min` / `max`、およびカードの `last_four_digits` や
バーチャル口座の `amount_pattern` などです。

`WebhookEvent` を28イベントから77イベントに拡張しました。Google Pay と口座振替、
バーチャル口座、決済手段、インボイス、チャージバック、変更申請、洗替の通知を
購読できます。

enum に不足していた値を追加しました。`PayType` の `Googlepay`、`PaymentStatus` の
`AWAITING_PAYMENT_APPROVAL`、`KonbiniCode` の `00030`、`DirectDebitResultCode` の
`"7"` と `"8"`、`method` の `"5"`、`pay_pattern` の `bulk` などです。

`retrieveDetailList` と `retrieveSummaryList` がクエリパラメータを受け取るように
なりました。型は定義済みでしたが、メソッドが引数として受け取っていませんでした。

### 変更

売上入金とプラットフォーム利用料収入で、一覧と単体取得の型を分けました
（`AccountListItemObject`、`PlatformAccountListItemObject`）。一覧では手数料の内訳と
入金先口座が返りません。

サブスクリプション解約のレスポンス型を `SubscriptionObject` の別名にしました。
登録・取得・更新・解約はすべて同じスキーマなのに、解約だけ別の型を持ち、10項目以上で
指定が食い違っていました。

`buildQueryString` の引数の型を `any` から `unknown` にしました。

HTTPクライアントを node-fetch から undici に置き換えました。`node-fetch`、
`https-proxy-agent`、`form-data` の3つの依存が undici 1つになり、transitive を
含めると14パッケージから1パッケージになります。`options.proxyAgent` の指定方法は
変わりません。プロキシごとに `ProxyAgent` を作り直さず使い回すようにしたので、
呼び出しごとのTLSハンドシェイクが無くなります。

`FincodeSDKError` に `kind` を持たせました。タイムアウト（`timeout`）、通信失敗
（`network`）、本文がJSONでない（`response_body`）、それ以外（`unknown`）を
区別できます。v1 では区別する手段が node-fetch の内部表現である `e.child.type`
しかありませんでした。本文がJSONでない場合はHTTPステータスも `status` に残ります。

通信の内部実装を公開APIから外しました。`buildQueryString`、
`createFincodeRequestURL`、`createFincodeRequestFetch`、
`createFincodeRequestHeader`、型 `FincodeRequestHeader` です。

68メソッドが持っていた同一の定型処理を共通の1箇所にまとめました。公開型は
変わりません。

### テスト

クエリ文字列の組み立てのユニットテストを3件から10件に増やしました。

リクエストの送信と失敗の分類のユニットテストを8件追加しました。応答なし・
非JSON応答・タイムアウト・接続失敗をそれぞれ再現します。認証情報なしで動きます。

## 1.1.0 以前

このリポジトリのコミット履歴を参照してください。
