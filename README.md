# Node.js SDK library for fincode byGMO

fincode for Node.jsはJavaScript/TypeScriptプロジェクトにおけるfincode APIの呼び出しを支援するAPIラッパーライブラリです。APIの呼び出しを支援するヘルパー関数とTypeScriptの型定義を提供し、型安全性を保ちつつ可読性の高いfincodeの組み込みを可能にします。

このライブラリはサーバーサイドNode.jsプロジェクトでの利用を想定しています。ブラウザ上で動作するアプリケーションにおいてfincodeを使用したい場合は[fincode for ES Module](https://github.com/fincode-byGMO/fincode-sdk-js.git)を利用できます。

## v1 からの移行

v2.0.0 では型定義をfincode APIの実際の挙動に合わせ直しました。破壊的変更を含みます。
移行手順は [MIGRATION.md](./MIGRATION.md) を、変更の一覧は
[CHANGELOG.md](./CHANGELOG.md) を参照してください。

## Getting Started

プロジェクトでnpmを使っている場合、npm経由でfincode for Node.jsをインストールできます。

```bash
$ npm i @fincode/node

# yarnやpnpmなど、npmと互換のあるパッケージ管理システムによるインストールも可能です。
$ yarn add @fincode/node
```

## Usage

### 1. fincodeの管理画面からAPIキーを取得
テスト環境や本番環境の管理画面からAPIキーを取得します。

APIキーは**シークレットキー**である必要があります。

### 2. パッケージマネージャーからインストール
Getting Startedの手順に従い `@fincode/node` をプロジェクトにインストールします。

### 3. fincodeインスタンスの作成

`createFincode`メソッドを呼び出し、fincodeインスタンスを作成します。

```typescript
import { createFincode } from "@fincode/node"

const fincode = createFincode({
    apiKey: "m_****_**********", // Secret key
    isLiveMode: true,  // fincode Environment. true: Live mode, false: Test mode. default: false
    
    // Optional,
    options: {   
        // API Version
        version: "20211101",
        // Timeout in milliseconds. Defaults to 60000. Pass 0 to wait indefinitely.
        timeout: 10000,
        // Proxy
        proxyAgent: "http://url.to.proxy:8080"
    }
})

(async () => {
    
    // Register a payment with idempotent key
    const createdPayment = await fincode.payments.create({
        pay_type: "Card",
        job_code: "CAPTURE",
        amount: "3000"
    }, {
        idempotentKey: "{{idempotent key}}"
    })
    // Execute a payment
    const executedPayment = await fincode.payments.execute(
        createdPayment.id,
        {
            pay_type: "Card",
            access_id: createdPayment.access_id,
            customer_id: "{{id of customer}}",
            card_id: "{{id of customer's card}}",
        }
    )
    // Retrieve a payment
    const payment = await fincode.payments.retrieve(executedPayment.id, { pay_type : "Card" })

    // Retrieve a list of payments
    const payments = await fincode.payments.retrieveList({
        pay_type: "Card",
        limit: 10,
        page: 1,
        total_amount_min: 1000,
        total_amount_max: 10000,
    })
})()

```

## Call fincode API

fincodeインスタンスを作成することでfincode APIを呼び出すことができます。
fincodeインスタンスが持つメソッドは下記のように各APIと対応しています。

### クエリパラメーターとヘッダー
ヘッダーはすべてのAPI呼び出しのオプショナル引数として渡すことができます。
ヘッダー情報は下記のようなオブジェクトに格納します。

```typescript
{
    // idempotent_key に対応。冪等キー。
    idempotentKey?: string | undefined;
    // Tenant-Shops-Id に対応。テナントショップID。
    tenantShopId?: string | undefined;
    // Content-Type に対応。コンテンツタイプ。
    contentType?: string | undefined;
}
```

また、一覧取得APIなど一部のAPI呼び出しではオプショナル引数としてクエリパラメーターを渡すことができます。
クエリパラメーターは下記のようなオブジェクトに格納します。

```typescript
{
    limit?: string | number | null
    page?: string | number | null
    count_only?: boolean | null
    // その他APIによって異なるクエリパラメーター
}
```


### Payment API （決済API）

| API  |                                           | URL                             | 呼び出し方                                                        |
| :--- | :---------------------------------------- | :------------------------------ | :---------------------------------------------------------------- |
| 決済 | 登録                                      | `POST /v1/payments`             | `fincode.payments.create(requestBody)`                            |
|      | 実行                                      | `PUT /v1/payments/{id}`         | `fincode.payments.execute(id, requestBody)`                       |
|      | 一覧取得                                  | `GET /v1/payments`              | `fincode.payments.retrieveList({ pay_type: payType})`             |
|      | 取得                                      | `GET /v1/payments/{id}`         | `fincode.payments.retrieve(id, { pay_type: payType})`             |
|      | 売上確定                                  | `PUT /v1/payments/{id}/capture` | `fincode.payments.capture(id, requestBody)`                       |
|      | キャンセル                                | `PUT /v1/payments/{id}/cancel`  | `fincode.payments.cancel(id, requestBody)`                        |
|      | 再オーソリ                                | `PUT /v1/payments/{id}/auth`    | `fincode.payments.reauthorize(id, requestBody)`                   |
|      | 金額変更                                  | `PUT /v1/payments/{id}/change`  | `fincode.payments.changeAmount(id, requestBody)`                  |
|      | 3Dセキュア2.0認証実行(カード決済)         | `PUT /v1/secure2/{access_id}`    | `fincode.payments.execute3DSecureAuth(access_id, requestBody)`    |
|      | 3Dセキュア2.0認証実行結果取得(カード決済) | `GET /v1/secure2/{access_id}`    | `fincode.payments.retrieve3DSecureAuthResult(access_id)`          |
|      | 認証後決済実行(カード決済)                | `PUT /v1/payments/{id}/secure`  | `fincode.payments.executeAfter3DSecureAuth(id, requestBody)`      |
|      | バーコード取得(コンビニ決済)              | `PUT /v1/payments/{id}/barcode` | `fincode.payments.generateKonbiniPaymentBarcode(id, requestBody)` |

### Customer API （顧客API）

| API  |          | URL                         | 呼び出し方                                  |
| :--- | :------- | :-------------------------- | :------------------------------------------ |
| 顧客 | 登録     | `POST /v1/customers`        | `fincode.customers.create(requestBody)`     |
|      | 更新     | `PUT /v1/customers/{id}`    | `fincode.customers.update(id, requestBody)` |
|      | 一覧取得 | `GET /v1/customers`         | `fincode.customers.retrieveList()`          |
|      | 取得     | `GET /v1/customers/{id}`    | `fincode.customers.retrieve(id)`            |
|      | 削除     | `DELETE /v1/customers/{id}` | `fincode.customers.delete(id)`              |

### Card API （カードAPI）

| API    |          | URL                                            | 呼び出し方                                           |
| :----- | :------- | :--------------------------------------------- | :-------------------------------------------------- |
| カード | 登録     | `POST /v1/customers/{customer_id}/cards`        | `fincode.cards.create(customerId, requestBody)`     |
|        | 更新     | `PUT /v1/customers/{customer_id}/cards/{id}`    | `fincode.cards.update(customerId, id, requestBody)` |
|        | 一覧取得 | `GET /v1/customers/{customer_id}/cards`         | `fincode.cards.retrieveList(customerId)`            |
|        | 取得     | `GET /v1/customers/{customer_id}/cards/{id}`    | `fincode.cards.retrieve(customerId, id)`            |
|        | 削除     | `DELETE /v1/customers/{customer_id}/cards/{id}` | `fincode.cards.delete(customerId, id)`              |
|        | 一覧取得（顧客情報共有グループ単位） | `GET /v1/cards`             | `fincode.cards.retrieveGroupList()`                 |

### Payment Method API （決済手段API）

| API      |          | URL                                                                | 呼び出し方                                                              |
| :------- | :------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------- |
| 決済手段 | 登録     | `POST /v1/customers/{customer_id}/payment_methods`                  | `fincode.paymentMethods.create(customerId, requestBody)`               |
|          | 一覧取得 | `GET /v1/customers/{customer_id}/payment_methods`                   | `fincode.paymentMethods.retrieveList(customerId, { pay_type })`        |
|          | 取得     | `GET /v1/customers/{customer_id}/payment_methods/{id}`              | `fincode.paymentMethods.retrieve(customerId, id, { pay_type })`        |
|          | 更新     | `PUT /v1/customers/{customer_id}/payment_methods/{id}`              | `fincode.paymentMethods.update(customerId, id, requestBody)`           |
|          | 停止     | `PUT /v1/customers/{customer_id}/payment_methods/{id}/inactivate`   | `fincode.paymentMethods.inactivate(customerId, id, requestBody)`       |
|          | 再有効化 | `PUT /v1/customers/{customer_id}/payment_methods/{id}/reactivate`   | `fincode.paymentMethods.reactivate(customerId, id, requestBody)`       |
|          | 削除     | `DELETE /v1/customers/{customer_id}/payment_methods/{id}`           | `fincode.paymentMethods.delete(customerId, id, { pay_type })`          |

### Plan API (プランAPI)

| API    |          | URL                     | 呼び出し方                              |
| :----- | :------- | :---------------------- | :-------------------------------------- |
| プラン | 登録     | `POST /v1/plans`        | `fincode.plans.create(requestBody)`     |
|        | 更新     | `PUT /v1/plans/{id}`    | `fincode.plans.update(id, requestBody)` |
|        | 一覧取得 | `GET /v1/plans`         | `fincode.plans.retrieveList()`          |
|        | 取得     | `GET /v1/plans/{id}`    | `fincode.plans.retrieve(id)`            |
|        | 削除     | `DELETE /v1/plans/{id}` | `fincode.plans.delete(id)`              |

### Subscription API (サブスクリプションAPI)

| API                    |          | URL                                 | 呼び出し方                                      |
| :--------------------- | :------- | :---------------------------------- | :---------------------------------------------- |
| サブスクリプション     | 登録     | `POST /v1/subscriptions`            | `fincode.subscriptions.create(requestBody)`     |
|                        | 更新     | `PUT /v1/subscriptions/{id}`        | `fincode.subscriptions.update(id, requestBody)` |
|                        | 一覧取得 | `GET /v1/subscriptions`             | `fincode.subscriptions.retrieveList()`          |
|                        | 取得     | `GET /v1/subscriptions/{id}`        | `fincode.subscriptions.retrieve(id)`            |
|                        | 解約     | `DELETE /v1/subscriptions/{id}`     | `fincode.subscriptions.cancel(id)`              |
| サブスクリプション結果 | 一覧取得 | `GET /v1/subscriptions/{id}/result` | `fincode.subscriptions.retrieveResultList(id)`  |

### Session API (リダイレクト型API)

| API           |      | URL                      | 呼び出し方                                             |
| :------------ | :--- | :----------------------- | :----------------------------------------------------- |
| 決済URL       | 作成 | `POST /v1/sessions`      | `fincode.paymentSessions.create(requestBody)`          |
| カード登録URL | 作成 | `POST /v1/card_sessions` | `fincode.cardRegistrationSessions.create(requestBody)` |

### Payment Bulk API (一括決済API)

| API              |          | URL                             | 呼び出し方                                                        |
| :--------------- | :------- | :------------------------------ | :---------------------------------------------------------------- |
| 一括決済         | 登録     | `POST /v1/payments/bulk`        | `fincode.paymentBulks.create(queryParams, requestBody)`           |
|                  | 一覧取得 | `GET /v1/payments/bulk`         | `fincode.paymentBulks.retrieveList()`                             |
|                  | 削除     | `DELETE /v1/payments/bulk/{id}` | `fincode.paymentBulks.delete(id)`                                 |
| 一括決済詳細情報 | 一覧取得 | `GET /v1/payments/bulk/{id}`    | `fincode.paymentBulks.retrieveDetailList(id, { pay_type })`       |

### Invoice API (インボイスAPI)

| API        |                | URL                                                | 呼び出し方                                             |
| :--------- | :------------- | :------------------------------------------------- | :----------------------------------------------------- |
| インボイス | 登録           | `POST /v1/invoices`                                | `fincode.invoices.create(requestBody)`                 |
|            | 一覧取得       | `GET /v1/invoices`                                 | `fincode.invoices.retrieveList()`                      |
|            | 取得           | `GET /v1/invoices/{id}`                            | `fincode.invoices.retrieve(id)`                        |
|            | 更新           | `PUT /v1/invoices/{id}`                            | `fincode.invoices.update(id, requestBody)`             |
|            | 削除           | `DELETE /v1/invoices/{id}`                         | `fincode.invoices.delete(id)`                          |
|            | 発行           | `PUT /v1/invoices/{id}/open`                       | `fincode.invoices.open(id, requestBody)`               |
|            | キャンセル     | `PUT /v1/invoices/{id}/cancel`                     | `fincode.invoices.cancel(id)`                          |
|            | 外部支払マーク | `PUT /v1/invoices/{id}/paid_externally`            | `fincode.invoices.markPaidExternally(id, requestBody)` |
|            | 口座再発行     | `PUT /v1/invoices/{id}/virtual_account/refresh`    | `fincode.invoices.refreshVirtualAccount(id)`           |

### Chargeback API (チャージバックAPI)

| API            |                    | URL                                       | 呼び出し方                                       |
| :------------- | :----------------- | :---------------------------------------- | :----------------------------------------------- |
| チャージバック | 一覧取得           | `GET /v1/shop_charge_backs`               | `fincode.chargebacks.retrieveList()`             |
|                | 取得               | `GET /v1/shop_charge_backs/{id}`          | `fincode.chargebacks.retrieve(id)`               |
|                | 回答登録           | `POST /v1/shop_charge_backs/{id}/reply`   | `fincode.chargebacks.reply(id, requestBody)`     |
|                | 反証資料アップロード | `POST /v1/charge_backs/file_upload`     | `fincode.chargebacks.uploadFile(requestBody)`    |

### Platform API (プラットフォームAPI)

| API              |          | URL                      | 呼び出し方                                  |
| :--------------- | :------- | :----------------------- | :------------------------------------------ |
| プラットフォーム | 一覧取得 | `GET /v1/platforms`      | `fincode.platforms.retrieveList()`          |
|                  | 取得     | `GET /v1/platforms/{id}` | `fincode.platforms.retrieve(id)`            |
|                  | 更新     | `PUT /v1/platforms/{id}` | `fincode.platforms.update(id, requestBody)` |

### Platform Account API (プラットフォーム売上API)

| API                          |          | URL                                      | 呼び出し方                                         |
| :--------------------------- | :------- | :--------------------------------------- | :------------------------------------------------- |
| プラットフォーム売上         | 一覧取得 | `GET /v1/platform_accounts`              | `fincode.platformAccounts.retrieveList()`          |
|                              | 取得     | `GET /v1/platform_accounts/{id}`         | `fincode.platformAccounts.retrieve(id)`            |
| プラットフォーム売上サマリー | 一覧取得 | `GET /v1/platform_accounts/{id}/summary` | `fincode.platformAccounts.retrieveSummaryList(id)` |

### Tenant API (テナントAPI)

| API                      |                        | URL                                              | 呼び出し方                                                 |
| :----------------------- | :--------------------- | :----------------------------------------------- | :--------------------------------------------------------- |
| テナント                 | 一覧取得               | `GET /v1/tenants`                                | `fincode.tenants.retrieveList()`                           |
|                          | 取得                   | `GET /v1/tenants/{id}`                           | `fincode.tenants.retrieve(id)`                             |
|                          | 更新                   | `PUT /v1/tenants/{id}`                           | `fincode.tenants.update(id, requestBody)`                  |
|                          | 新規作成(新規ユーザー) | `POST /v1/tenant_entries`                        | `fincode.tenants.createWithNewUser(requestBody)`           |
|                          | 新規作成(既存ユーザー) | `POST /v1/tenant_entries`                        | `fincode.tenants.createWithExistingUser(requestBody)`      |
| テナント本番環境申請情報 | 取得                   | `GET /v1/contracts/examinations_v2/tenants/{id}` | `fincode.tenants.retrieveExaminationInfoV2(id)`            |
|                          | 更新                   | `PUT /v1/contracts/examinations_v2/tenants/{id}` | `fincode.tenants.updateExaminationInfoV2(id, requestBody)` |
| テナント契約情報         | 取得                   | `GET /v1/contracts/{id}`                         | `fincode.tenants.retrieveContract(id)`                     |
| 本番環境                 | 申請                   | `POST /v1/contracts/examinations`                | `fincode.tenants.requestExamination(requestBody)`          |
| 審査ファイル             | アップロード           | `POST /v1/contracts/examinations/tenants/{id}/files` | `fincode.tenants.uploadExaminationFile(id, requestBody)` |
| テナント決済手段追加     | 申請                   | `POST /v1/contracts/examinations/tenants/{id}/providers/reserve` | `fincode.tenants.reserveProvider(id, requestBody)` |

### Change Request API (テナント変更申請API)

| API      |      | URL                                | 呼び出し方                                            |
| :------- | :--- | :--------------------------------- | :---------------------------------------------------- |
| 変更申請 | 登録 | `POST /v1/change_requests`         | `fincode.changeRequests.register(requestBody)`        |
|          | 取得 | `GET /v1/change_requests/{shopId}` | `fincode.changeRequests.retrieve(shopId)`             |

### Company Stamp API (社印API)

| API  |      | URL                          | 呼び出し方                                     |
| :--- | :--- | :--------------------------- | :--------------------------------------------- |
| 社印 | 登録 | `POST /v1/company_stamps`    | `fincode.companyStamps.register(requestBody)`  |
|      | 取得 | `GET /v1/company_stamps`     | `fincode.companyStamps.retrieve()`             |
|      | 削除 | `DELETE /v1/company_stamps`  | `fincode.companyStamps.delete()`               |

### Account API (売上入金API)

| API          |          | URL                            | 呼び出し方                                |
| :----------- | :------- | :----------------------------- | :---------------------------------------- |
| 売上入金     | 一覧取得 | `GET /v1/accounts`             | `fincode.accounts.retrieveList()`         |
|              | 取得     | `GET /v1/accounts/{id}`        | `fincode.accounts.retrieve(id)`           |
| 売上入金詳細 | 取得     | `GET /v1/accounts/{id}/detail` | `fincode.accounts.retrieveDetailList(id)` |

### Webhook Setting API (Webhook設定API)

| API         |          | URL                                | 呼び出し方                                        |
| :---------- | :------- | :--------------------------------- | :------------------------------------------------ |
| Webhook設定 | 登録     | `POST /v1/webhook_settings`        | `fincode.webhookSettings.create(requestBody)`     |
|             | 一覧取得 | `GET /v1/webhook_settings`         | `fincode.webhookSettings.retrieveList()`          |
|             | 取得     | `GET /v1/webhook_settings/{id}`    | `fincode.webhookSettings.retrieve(id)`            |
|             | 更新     | `PUT /v1/webhook_settings/{id}`    | `fincode.webhookSettings.update(id, requestBody)` |
|             | 削除     | `DELETE /v1/webhook_settings/{id}` | `fincode.webhookSettings.delete(id)`              |

## Requirements

このSDKは下記の環境で動作します。

| 環境    | バージョン |
| :------ | :--------- |
| Node.js | >=20.18.1  |