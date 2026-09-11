# 変更履歴

## 2.0.0

型定義をfincode APIの実際の挙動に合わせ直し、通信部分を作り直し、未対応だった
エンドポイントに追いついたメジャーリリースです。移行手順は
[MIGRATION.md](./MIGRATION.md) を参照してください。

APIリファレンスが定義する fincode の90オペレーションすべてに対応しました。

**Node.js 20.18.1 以上が必要になります。**

コンパイルエラーにならない変更が5つあります。口座振替の預金区分の値、
クエリパラメータのリストの送信形式、数値と文字列を取り違えていた項目、
プロキシ環境変数の読み取り、リクエストのタイムアウトの既定値です。移行ガイドの
冒頭にまとめています。

### セキュリティ

`FincodeConfig` がAPIキーを文字列で持っていたため、`JSON.stringify(fincode)` や
`console.log(fincode)` にシークレットキーが出力されていました。各リソースクラスも
同じ `config` を持つので、1インスタンスあたり15回出力されます。`apiKey` を
`getApiKey(): string` に変えました。関数は `JSON.stringify` の出力に含まれません。

### 修正

リクエストのタイムアウトに既定値（60秒）を設けました。`options.timeout` を
指定しない場合、node-fetch に `undefined` が渡って無制限として扱われ、応答が
来ないままリクエストが残り続けていました。決済が成立したかは応答を見ないと
判断できないため、60秒で打ち切って `FincodeSDKError` を返します。`0` を渡せば
従来どおり無制限になります。

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

数値と文字列を取り違えていた項目を揃えました。

| 項目                                          | 正しい型 |
| :--                                           | :--      |
| レスポンスの `payment_term_day` / `pay_times` | 数値     |
| `destination_type`                            | 数値     |
| `log_keep_days`                               | 数値     |
| Webhook通知の件数系8項目                      | 文字列   |

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

決済手段の削除が決済種別を送っておらず、どう呼んでも
`EP017023001`「決済種別が指定されていません。」で失敗していました。戻り値の型も
`id` と `delete_flag` の2項目でしたが、実際は決済手段オブジェクトを全項目返します。

### 追加

決済のリクエストを決済種別ごとの型に分けました。対象は登録と実行、売上確定、
キャンセル、再オーソリ、金額変更、認証後決済の7操作です。必須項目が決済種別ごとに
違うため、単一の型では表現できませんでした。

これにより、型に無く呼べなかった組み合わせが使えるようになりました。売上確定の
Apple Pay と Google Pay、再オーソリの Google Pay、金額変更の Google Pay と口座振替、
認証後決済の Google Pay です。

決済一覧取得のクエリも決済種別ごとに分け、欠けていた絞り込み項目を追加しました。

全種別共通のものは次のとおりです。

- `client_field_1`〜3
- `keyword`
- `customer_id`
- `process_date_from` / `process_date_to`
- `total_amount_min` / `total_amount_max`

決済種別ごとのものには、カードの `last_four_digits` やバーチャル口座の
`amount_pattern` などがあります。

`WebhookEvent` を28イベントから77イベントに拡張しました。Google Pay と口座振替、
バーチャル口座、決済手段、インボイス、チャージバック、変更申請、洗替の通知を
購読できます。

enum に不足していた値を追加しました。

| 型                      | 追加した値                  |
| :--                     | :--                         |
| `PayType`               | `Googlepay`                 |
| `PaymentStatus`         | `AWAITING_PAYMENT_APPROVAL` |
| `KonbiniCode`           | `00030`                     |
| `DirectDebitResultCode` | `"7"` / `"8"`               |
| `method`                | `"5"`                       |
| `pay_pattern`           | `bulk`                      |

ほかにもいくつかあります。

`retrieveDetailList` と `retrieveSummaryList` がクエリパラメータを受け取るように
なりました。型は定義済みでしたが、メソッドが引数として受け取っていませんでした。

未対応だったエンドポイントに対応しました。

- インボイス機能（`fincode.invoices`）9操作
- チャージバック（`fincode.chargebacks`）4操作
- テナントの変更申請（`fincode.changeRequests`）2操作
- 社印（`fincode.companyStamps`）3操作
- 決済手段の更新・停止・再有効化 3操作
- カード一覧取得（`fincode.cards.retrieveGroupList`）
- テナントの審査ファイルアップロードと決済手段追加申請 2操作

一括決済のバーチャル口座に対応しました。`pay_type` が3箇所でカードに固定されて
おり、登録も照会もできませんでした。明細の型も決済種別ごとに分け、
`retrieveDetailList` はクエリの `pay_type` で戻り値の形が決まります。

バーチャル口座の機能拡張に対応しました。決済手段として登録する固定バーチャル口座
（`pay_type: "Virtualaccount"`）、入金可能額設定
（`use_exact_deposit_amount`）、決済セッションの `virtualaccount` ブロックです。

口座振替の振替サービス（`settlement_route`）を追加しました。振替日の組み合わせが
2種類あり、決済・決済手段・サブスクリプション・課金結果の4箇所に現れます。

カード更新機能（洗替）の項目を追加しました。`card_updater_mode` と最終成功日時、
最終実施日時です。カードと決済手段の両方で読めます。

サブスクリプションのリトライ関連項目を追加しました。`subscription_retry_mode` と
`is_retry_scheduled` です。`is_retry_scheduled` はサブスクリプションと課金結果で
意味が違うため、JSDocで書き分けています。

Webhook通知の型を6つから20に増やし、決済種別ごとの共用体にしました。

決済の通知（`PaymentWebhookNotification`）は1つのフラットな型で、口座振替と
バーチャル口座、Google Pay の項目を持っていませんでした。決済種別ごとに7つの
変種に分け、7種別すべてに共通する13項目は分岐なしで読めるようにしています。
サブスクリプションと定期課金バッチ、一括決済の通知も同様に分けました。3つとも
`pay_type` がカードに固定されていました。

決済手段の通知（`customers.payment_methods.**`）は型がありませんでした。決済種別
ごとに決済手段IDの項目名が違い（`card_id` / `payment_method_id` / `id`）、
`status` の意味も違います。カードの `status` は3Dセキュア2.0認証の状態で、決済手段
の状態は `card_status` に入ります。

カード更新完了、インボイス、チャージバック、変更申請の4つを追加しました。

20の通知型すべてで `event` を届きうるイベントに絞ったため、そのエンドポイントに
来ないイベントを書くとコンパイルエラーになります。

決済のレスポンスに `acs_url` を追加しました。`tds2_ret_url` を指定した場合、
3Dセキュア認証を開始するURLがこの項目で返ります。3Dセキュア認証の呼び出しと
コールバック処理を自前で実装する場合に使います。

### 変更

売上入金とプラットフォーム利用料収入で、一覧と単体取得の型を分けました
（`AccountListItemObject`、`PlatformAccountListItemObject`）。一覧では手数料の内訳と
入金先口座が返りません。

サブスクリプション解約のレスポンス型を `SubscriptionObject` の別名にしました。
登録・取得・更新・解約はすべて同じスキーマなのに、解約だけ別の型を持ち、10項目以上で
指定が食い違っていました。

接続先の指定を `environment` に変えました。`"test"` と `"prod"` を取り、省略すると
`"test"` になります。APIキーの接頭辞（`m_test_` / `m_prod_`）と同じ語で揃えています。

`isLiveMode` も引き続き使えますが非推奨です。両方指定した場合は
`environment` が優先されます。

`options.baseUrl` を追加しました。接続先をURLで直接指定します。
テストでモックサーバーへ向ける場合などに使います。`https` 以外のURLと、
資格情報を含むURLは受け付けません。`environment` や `isLiveMode` との
同時指定もエラーにします。

`buildQueryString` の引数の型を `any` から `unknown` にしました。

`options.proxyAgent` を指定しない場合、`HTTP_PROXY` / `HTTPS_PROXY` /
`NO_PROXY` からプロキシを読むようにしました。v1 はこれらを見ないため、プロキシ配下
では `options.proxyAgent` を渡さないと接続できませんでした。`options.proxyAgent` を
渡した場合は従来どおりそちらが使われ、`NO_PROXY` より優先されます。

HTTPクライアントを node-fetch から undici に置き換えました。`node-fetch`、
`https-proxy-agent`、`form-data` の3つの依存が undici 1つになり、transitive を
含めると14パッケージから1パッケージになります。`options.proxyAgent` の指定方法は
変わりません。プロキシごとに `ProxyAgent` を作り直さず使い回すようにしたので、
呼び出しごとのTLSハンドシェイクが無くなります。

`FincodeSDKError` に `kind` を持たせました。タイムアウト（`timeout`）、通信失敗
（`network`）、本文がJSONでない（`response_body`）、それ以外（`unknown`）を
区別できます。v1 では区別する手段が node-fetch の内部表現である `e.child.type`
しかありませんでした。本文がJSONでない場合はHTTPステータスも `status` に残ります。

通信の内部実装を公開APIから外しました。

- `buildQueryString`
- `createFincodeRequestURL`
- `createFincodeRequestFetch`
- `createFincodeRequestHeader`
- 型 `FincodeRequestHeader`

68メソッドが持っていた同一の定型処理を共通の1箇所にまとめました。公開型は
変わりません。

決済手段のカード情報に2項目を追加しました。実APIが返すのに型にありませんでした。

- `tds2_ret_url`
- `error_code`

`PaymentMethodObject` に `virtualaccount` ブロックを追加し、`pay_type` の値域に
`Virtualaccount` を加えました。あわせて `PaymentSessionObject.transaction.pay_type`
にも `Virtualaccount` を加えています。

### テスト

認証情報なしで動くテストを141件にしました。以前は18件で、92メソッドのうち18は
どのテストからも一度も呼ばれていませんでした。

- クエリ文字列の組み立て（3件から10件に）
- リクエストの送信と失敗の分類（8件）。応答なし、非JSON応答、タイムアウト、
  接続失敗をそれぞれ再現します
- 全92メソッドのエンドポイント。HTTPメソッドとパスの組み立てを確かめます
- 実APIの都合で入れている組み立て。決済手段の削除が決済種別をクエリで送ること、
  インボイスのキャンセルと口座再発行が空のJSONを送ること、テナントの各操作が
  Tenant-Shop-Id を入れることなど
- 接続先の解決（14件）。`environment` の対応付け、`isLiveMode` との優先順位、
  `options.baseUrl` との排他、URLの検証
- `npm test` の対象範囲。実APIを叩くテストの除外指定が、テストの追加に追随して
  いるかを検出します

実APIを叩くテストは認証情報が必要なため、`npm test` の対象から外しています。
そちらは従来どおり `test:v1` 系で実行します。

## 1.1.0 以前

このリポジトリのコミット履歴を参照してください。
