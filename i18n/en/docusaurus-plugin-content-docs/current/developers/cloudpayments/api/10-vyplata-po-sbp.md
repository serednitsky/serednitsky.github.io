---
title: "SBP payout"
keywords:
  - "SBP payout"
---

# SBP payout

To make an SBP payout, call the API method.

**Endpoint:**
https://api.cloudpayments.ru/payments/alt/topup

**Request parameters:**

|Parameter | Format | Required | Description|
|--- | --- | --- | ---|
|MemberId | string | No | The NSPK recipient bank ID for SBP<br />If the `Receiver.Phone` field is filled in, then `MemberId` becomes required.<br />Valid values for `MemberId` can be found via this [link](https://qr.nspk.ru/proxyapp/c2bmembers.json). You are required to pass only numeric portion from the ``schema`` field into the `MemberId` field.<br />For example, if `schema` field value is `bank100000000111`, you are required to pass `100000000111` into `MemberId` parameter: `MemberId:100000000111`|
|Amount | number | Yes | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2|
|Currency | string | Yes | Currency: RUB|
|AccountId | string | No | User ID|
|Email | string | No | Payer email for receiving payment confirmation|
|CultureName | string | No | Notification language Possible values: "ru-RU", "en-US". ([see reference](26-lokalizatsiya.md))|
|InvoiceId | string | No | Order number in your system|
|Description | string | No | Free-form payment description|
|Payer | object | No | Additional field used to pass payer information Use the following fields: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`|
|Receiver | object | Yes | Optional field used to pass recipient details|
|Receiver.Phone | string | Yes | For SBP payouts, the recipient's phone number is required|

**Request example:**

```llvm
{
    "Amount":1,
    "AccountId":"user@example.com",
    "MemberId":"12456",
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Receiver":
      {
        "Phone":"+71234567890"
    }
}
```

**Example response:**

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "test_api_00000000000000000000002",
        "TerminalUrl": "https://demo-preprod.cloudpayments.ru",
        "TransactionId": 2200976211,
        "Amount": 50,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 50,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "a.kadyrova@cloudpayments.ru",
        "Email": "a.kadyrova@cloudpayments.ru",
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1717514966896)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2024-06-04T15:29:26",
        "AuthDate": "/Date(1717514967037)/",
        "AuthDateIso": "2024-06-04T15:29:27",
        "ConfirmDate": "/Date(1717514967037)/",
        "ConfirmDateIso": "2024-06-04T15:29:27",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "172.18.200.35",
        "IpCountry": "",
        "IpCity": null,
        "IpRegion": null,
        "IpDistrict": null,
        "IpLatitude": null,
        "IpLongitude": null,
        "CardFirstSix": "424242",
        "CardLastFour": "4242",
        "CardExpDate": "01/77",
        "CardType": "Visa",
        "CardProduct": "",
        "CardCategory": "Not defined () ",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "TINKOFF",
        "CardTypeCode": 0,
        "Status": "Completed",
        "StatusCode": 3,
        "CultureName": "ru",
        "Reason": "Approved",
        "CardHolderMessage": "Payment successfully processed",
        "Type": 2,
        "Refunded": false,
        "Name": "SERGEY",
        "Token": null,
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "IsLocalOrder": false,
        "Gateway": 0,
        "MasterPass": false,
        "InfoShopData": null,
        "Receiver":{
          "FirstName":"Test",
          "LastName":"Testov",
          "MiddleName":"Testovich",
          "Address":"test drive test home",
          "Birth":"1955-02-24",
          "City":"MO",
          "Street":"Lenina",
          "Country":"RU",
          "Phone":"+71234567890",
          "Postcode":"345"
         }
    },
    "Success": true,
    "Message": null,
    "ErrorCode": null
}
```
