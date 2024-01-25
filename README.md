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
        proxy: new HttpsProxyAgent("http://url.to.proxy:8080")
    }
)

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
    const executedPayment = await fincode.payment.execute(
        payment.id,
        {
            pay_type: createdPayment.pay_type,
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

| API  |            | URL                             | 呼び出し方                                            |
| :--- | :--------- | :------------------------------ | :---------------------------------------------------- |
| 決済 | 登録       | `POST /v1/payments`             | `fincode.payments.create(requestBody)`                |
|      | 実行       | `PUT /v1/payments/{id}`         | `fincode.payments.execute(id, requestBody)`           |
|      | 一覧取得   | `GET /v1/payments`              | `fincode.payments.retrieveList({ pay_type: payType})` |
|      | 取得       | `GET /v1/payments/{id}`         | `fincode.payments.retrieve(id, { pay_type: payType})` |
|      | 売上確定   | `PUT /v1/payments/{id}/capture` | `fincode.payments.capture(id, requestBody)`           |
|      | キャンセル | `PUT /v1/payments/{id}/cancel`  | `fincode.payments.cancel(id, requestBody)`            |
|      | 再オーソリ | `PUT /v1/payments/{id}/auth`    | `fincode.payments.reauthorize(id, requestBody)`       |
|      | 金額変更   | `PUT /v1/payments/{id}/change`  | `fincode.payments.changeAmount(id, requestBody)`      |

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

## Requirements

このSDKは下記の環境で動作します。

| 環境    | バージョン |
| :------ | :--------- |
| Node.js | >=12.0.0   |