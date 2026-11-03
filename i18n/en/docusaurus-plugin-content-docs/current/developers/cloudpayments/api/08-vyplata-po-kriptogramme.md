---
title: "Cryptogram payouts"
keywords:
  - "Cryptogram payouts"
---

# Cryptogram payouts

A cryptogram payout can be executed by calling the API method.

**Endpoint:**
https://api.cloudpayments.ru/payments/cards/topup

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
CardCryptogramPacket | string | Yes | Card details cryptogram
Amount | number | Yes | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
Currency | string | Yes | Currency: RUB
Name | string | No | Cardholder name in Latin characters
AccountId | string | No | User ID
Email | string | No | Payer email for receiving payment confirmation
JsonData | JSON | No | Any other data that will be related to the transaction We have reserved the names of the following parameters and displayed their contents in the transaction register downloaded from the CloudPayments dashboard: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`
InvoiceId | string | No | Order number in your system
Description | string | No | Free-form payment description
Payer | object | No | Optional field used to pass payer details
Receiver | object | No | Optional field used to pass recipient details

<aside class="notice">Payouts to international cards will require the <code>Payer</code> or <code>Receiver</code> parameter, depending on the terminal.</aside><br />

**Request example:**

```llvm
{
    "Name":"CARDHOLDER NAME",
    "CardCryptogramPacket":"01492500008719030128SMfLeYdKp5dSQVIiO5l6ZCJiPdel4uDjdFTTz1UnXY+3QaZcNOW8lmXg0H670MclS4lI+qLkujKF4pR5Ri+T/E04Ufq3t5ntMUVLuZ998DLm+OVHV7FxIGR7snckpg47A73v7/y88Q5dxxvVZtDVi0qCcJAiZrgKLyLCqypnMfhjsgCEPF6d4OMzkgNQiynZvKysI2q+xc9cL0+CMmQTUPytnxX52k9qLNZ55cnE8kuLvqSK+TOG7Fz03moGcVvbb9XTg1oTDL4pl9rgkG3XvvTJOwol3JDxL1i6x+VpaRxpLJg0Zd9/9xRJOBMGmwAxo8/xyvGuAj85sxLJL6fA==",
    "Amount":1,
    "AccountId":"user@example.com",
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Payer":
      // The set of fields is identical for the `Receiver` parameter
      {
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
}
```

**Example response:**

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_*******************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897739551,
        "Amount": 399,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 399,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "user@example.com",
        "Email": null,
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1635564719715)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T03:31:59",
        "AuthDate": "/Date(1635564719858)/",
        "AuthDateIso": "2021-10-30T03:31:59",
        "ConfirmDate": "/Date(1635564719858)/",
        "ConfirmDateIso": "2021-10-30T03:31:59",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "172.18.200.124",
        "IpCountry": "",
        "IpCity": null,
        "IpRegion": null,
        "IpDistrict": null,
        "IpLatitude": null,
        "IpLongitude": null,
        "CardFirstSix": "424242",
        "CardLastFour": "4242",
        "CardExpDate": "12/25",
        "CardType": "Visa",
        "CardProduct": "I",
        "CardCategory": "Visa Infinite (Infinite)",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "CloudPayments",
        "CardTypeCode": 0,
        "Status": "Completed",
        "StatusCode": 3,
        "CultureName": "ru",
        "Reason": "Approved",
        "CardHolderMessage": "Payment successfully processed",
        "Type": 2,
        "TransactionIsInProcess": false,
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": null,
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0
    },
    "Success": true,
    "Message": null
}
```

<aside class="notice">You can use the secure request authentication mechanism for payouts. To do this, provide our support team with a certificate containing your public key. Next, generate a signature based on the request body and include it within the X-Signature header in base64 format. CloudPayments will verify your signature using CryptoService. If the signature is valid, the request processing will proceed; otherwise, the execution will be terminated.</aside><br />

**The following statuses are returned in response to the POST /payments/cards/topup cryptogram payout method:**

| Status | Description |
|---|---|
| Completed | Payout was successful |
| Created | Payout is in a pending status |
| Failed | Payout not made |

If a transaction transitions into a pending status, **the asynchronous payout processing scenario is triggered**, causing the `Model.Status` parameter to be set to "Created" and the `Model.TransactionIsInProcess` flag to become true.

Upon completion of the payout processing, the transaction status will change to a terminal one, and a **webhook notification** containing the final status will be sent:

| Status | Notification type |
|---|---|
| Completed | PAY, [CloudPayments documentation](../notifications.md#pay) |
| Failed | FAIL, [CloudPayments documentation](../notifications.md#fail) |

<aside class="notice">In rare cases, the payout request processing may take up to 60 minutes.</aside>
