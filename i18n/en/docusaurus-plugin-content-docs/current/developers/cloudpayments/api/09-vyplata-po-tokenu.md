---
title: "Token payout"
keywords:
  - "Token payout"
---

# Token payout

To make a token payout, call the API method.

Token payouts can only be processed using a token generated during a card payment transaction.

TPay, SBP and other tokens obtained via alternative payment methods are not eligible for token payouts.

**Endpoint:**
https://api.cloudpayments.ru/payments/token/topup

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Token | string | Yes |	The card token issued by the system after the initial payment
Amount | number | Yes | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
AccountId |	string | Yes | User ID
Currency | string |	Yes | Currency: RUB
InvoiceId |	string | No | Order number in your system
Payer | object | No | Optional field used to pass payer details
Receiver | object | No | Optional field used to pass recipient details

<aside class="notice">Payouts to international cards will require the <code>Payer</code> or <code>Receiver</code> parameter, depending on the terminal.</aside><br />

**Request example:**

```llvm
{
    "Token":"0a0afb77-8f41-4de2-9524-1057f9695303",
    "Amount":59,
    "AccountId":"user_x",
    "Currency":"RUB",
    "Payer":
    // The set of fields is identical for the `Receiver` parameter
      {
        "FirstName":"Test",
        "LastName":"Testov",
        "MiddleName":"Testovich",
        "Address":"test drive test home",
        "Birth":"1955-02-24",
        "City":"MO",
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
        "PublicId": "pk_******************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897747761,
        "Amount": 59,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 59,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "user_x",
        "Email": null,
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1635566071122)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T03:54:31",
        "AuthDate": "/Date(1635566071232)/",
        "AuthDateIso": "2021-10-30T03:54:31",
        "ConfirmDate": "/Date(1635566071232)/",
        "ConfirmDateIso": "2021-10-30T03:54:31",
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
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "11/25",
        "CardType": "Visa",
        "CardProduct": "C",
        "CardCategory": "Visa Signature Signature",
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
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": "0a0afb77-8f41-4de2-9524-1057f9695303",
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

<aside class="notice">You can use the secure request authentication mechanism for payouts. To do this, provide our support team with a certificate containing your public key. Next, generate a signature based on the request body and include it within the X-Signature header in base64 format. CloudPayments will verify your signature using CryptoService. If the signature is valid, the request processing will proceed; otherwise, the execution will be terminated.</aside>
