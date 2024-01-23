# Node.js SDK library for fincode byGMO

fincode for Node.jsはJavaScript/TypeScriptプロジェクトにおけるfincode APIの呼び出しを支援するAPIラッパーライブラリです。APIの呼び出しを支援するヘルパー関数とTypeScriptの型定義を提供し、型安全性を保ちつつ可読性の高いfincodeの組み込みを可能にします。

このライブラリはサーバーサイドNode.jsプロジェクトでの利用を想定しています。ブラウザ上で動作するアプリケーションにおいてfincodeを使用したい場合は[fincode for ES Module]()を利用できます。

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

const fincode = createFincode(
    "m_****_**********", // Secret key
    "test", // fincode Environment
    
    // Optional,
    {   
        // API Version
        version: "20211101",
        // Timeout
        timeout: 10000,
        // Proxy
        proxy: "http://url.to.proxy:8080"
    }
)

(async () => {
    
    // Register a payment with idempotent key
    const createdPayment = await fincode.payments.create({
        pay_type: "Paypay",
        job_code: "CAPTURE",
        amount: "3000"
    }, {
        idempotentKey: "{{idempotent key}}"
    })
    // Execute a payment
    const executedPayment = await fincode.payment.execute(
        payment.id,
        {
            pay_type: createdPayment.pay_type,
            access_id: createdPayment.access_id,
            redirect_url: "{{URL to redirect from PayPay payment page}}"
        }
    )
    // Retrieve a payment
    const payment = await fincode.payments.retrieve(executedPayment.id, { pay_type : "Paypay" })

    // Retrieve a list of payments
    const payments = await fincode.payments.retrieveList({
        pay_type: "Paypay",
        limit: 10,
        page: 1,
        total_amount_min: 1000,
        total_amount_max: 10000,
    })
})()

```

## How to call fincode API

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
|      | 一覧取得                                  | `GET /v1/payments`              | `fincode.payments.retrieveList()`                                 |
|      | 取得                                      | `GET /v1/payments/{id}`         | `fincode.payments.retrieve(id)`                                   |
|      | 売上確定                                  | `PUT /v1/payments/{id}/capture` | `fincode.payments.capture(id, requestBody)`                       |
|      | キャンセル                                | `PUT /v1/payments/{id}/cancel`  | `fincode.payments.cancel(id, requestBody)`                        |
|      | 再オーソリ                                | `PUT /v1/payments/{id}/auth`    | `fincode.payments.reauthorize(id, requestBody)`                   |
|      | 金額変更                                  | `PUT /v1/payments/{id}/change`  | `fincode.payments.changeAmount(id, requestBody)`                  |
|      | 3Dセキュア2.0認証実行(カード決済)         | `PUT /v1/secure/{access_id}`    | `fincode.payments.execute3DSecureAuth(access_id, requestBody)`    |
|      | 3Dセキュア2.0認証実行結果取得(カード決済) | `GET /v1/secure/{access_id}`    | `fincode.payments.retrieve3DSecureAuthResult(access_id)`          |
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

| API    |          | URL                     | 呼び出し方                              |
| :----- | :------- | :---------------------- | :-------------------------------------- |
| カード | 登録     | `POST /v1/cards`        | `fincode.cards.create(requestBody)`     |
|        | 更新     | `PUT /v1/cards/{id}`    | `fincode.cards.update(id, requestBody)` |
|        | 一覧取得 | `GET /v1/cards`         | `fincode.cards.retrieveList()`          |
|        | 取得     | `GET /v1/cards/{id}`    | `fincode.cards.retrieve(id)`            |
|        | 削除     | `DELETE /v1/cards/{id}` | `fincode.cards.delete(id)`              |

### Plan API （プランAPI）

| API    |          | URL                     | 呼び出し方                              |
| :----- | :------- | :---------------------- | :-------------------------------------- |
| プラン | 登録     | `POST /v1/plans`        | `fincode.plans.create(requestBody)`     |
|        | 更新     | `PUT /v1/plans/{id}`    | `fincode.plans.update(id, requestBody)` |
|        | 一覧取得 | `GET /v1/plans`         | `fincode.plans.retrieveList()`          |
|        | 取得     | `GET /v1/plans/{id}`    | `fincode.plans.retrieve(id)`            |
|        | 削除     | `DELETE /v1/plans/{id}` | `fincode.plans.delete(id)`              |

### Subscription API （サブスクリプションAPI）

| API                    |          | URL                                 | 呼び出し方                                      |
| :--------------------- | :------- | :---------------------------------- | :---------------------------------------------- |
| サブスクリプション     | 登録     | `POST /v1/subscriptions`            | `fincode.subscriptions.create(requestBody)`     |
|                        | 更新     | `PUT /v1/subscriptions/{id}`        | `fincode.subscriptions.update(id, requestBody)` |
|                        | 一覧取得 | `GET /v1/subscriptions`             | `fincode.subscriptions.retrieveList()`          |
|                        | 取得     | `GET /v1/subscriptions/{id}`        | `fincode.subscriptions.retrieve(id)`            |
|                        | 解約     | `DELETE /v1/subscriptions/{id}`     | `fincode.subscriptions.cancel(id)`              |
| サブスクリプション結果 | 一覧取得 | `GET /v1/subscriptions/{id}/result` | `fincode.subscriptions.retrieveResultList(id)`  |

### Session API （リダイレクト型API）

| API           |      | URL                      | 呼び出し方                                             |
| :------------ | :--- | :----------------------- | :----------------------------------------------------- |
| 決済URL       | 作成 | `POST /v1/sessions`      | `fincode.paymentSessions.create(requestBody)`          |
| カード登録URL | 作成 | `POST /v1/card_sessions` | `fincode.cardRegistrationSessions.create(requestBody)` |

### Payment Bulk API （一括決済API）

| API              |          | URL                             | 呼び出し方                                                                  |
| :--------------- | :------- | :------------------------------ | :-------------------------------------------------------------------------- |
| 一括決済         | 登録     | `POST /v1/payments/bulk`        | `fincode.bulkPayments.create(pay_type, process_plan_date, file, file_name)` |
|                  | 一覧取得 | `GET /v1/payments/bulk`         | `fincode.bulkPayments.retrieveList()`                                       |
|                  | 削除     | `DELETE /v1/payments/bulk/{id}` | `fincode.bulkPayments.delete(id)`                                           |
| 一括決済詳細情報 | 一覧取得 | `GET /v1/payments/bulk/{id}`    | `fincode.bulkPayments.retrieveDetailList(id)`                               |

### Platform API （プラットフォームAPI）

| API              |          | URL                      | 呼び出し方                                  |
| :--------------- | :------- | :----------------------- | :------------------------------------------ |
| プラットフォーム | 一覧取得 | `GET /v1/platforms`      | `fincode.platforms.retrieveList()`          |
|                  | 取得     | `GET /v1/platforms/{id}` | `fincode.platforms.retrieve(id)`            |
|                  | 更新     | `PUT /v1/platforms/{id}` | `fincode.platforms.update(id, requestBody)` |

### Platform Account API （プラットフォーム売上API）

| API                          |          | URL                                      | 呼び出し方                                         |
| :--------------------------- | :------- | :--------------------------------------- | :------------------------------------------------- |
| プラットフォーム売上         | 一覧取得 | `GET /v1/platform_accounts`              | `fincode.platformAccounts.retrieveList()`          |
|                              | 取得     | `GET /v1/platform_accounts/{id}`         | `fincode.platformAccounts.retrieve(id)`            |
| プラットフォーム売上サマリー | 一覧取得 | `GET /v1/platform_accounts/{id}/summary` | `fincode.platformAccounts.retrieveSummaryList(id)` |

### Tenant API （テナントAPI）

| API                      |                        | URL                                              | 呼び出し方                                                 |
| :----------------------- | :--------------------- | :----------------------------------------------- | :--------------------------------------------------------- |
| テナント                 | 一覧取得               | `GET /v1/tenants`                                | `fincode.tenants.retrieveList()`                           |
|                          | 取得                   | `GET /v1/tenants/{id}`                           | `fincode.tenants.retrieve(id)`                             |
|                          | 新規作成(新規ユーザー) | `POST /v1/tenant_entries`                        | `fincode.tenants.createWithNewUser(requestBody)`           |
|                          | 新規作成(既存ユーザー) | `POST /v1/tenant_entries`                        | `fincode.tenants.createWithExistingUser(requestBody)`      |
| テナント本番環境申請情報 | 取得                   | `GET /v1/contracts/examinations_v2/tenants/{id}` | `fincode.tenants.retrieveExaminationInfoV2(id)`            |
|                          | 更新                   | `PUT /v1/contracts/examinations_v2/tenants/{id}` | `fincode.tenants.updateExaminationInfoV2(id, requestBody)` |
| テナント契約情報         | 取得                   | `GET /v1/contracts/{id}`                         | `fincode.tenants.retrieveContract(id)`                     |
| 本番環境                 | 申請                   | `POST /v1/contracts/examinations`                | `fincode.tenants.requestExamination(requestBody)`          |
| 審査ファイル             | アップロード           |                                                  |                                                            |
| テナント決済手段追加     | 申請                   |                                                  |                                                            |

### Account API （売上入金API）

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