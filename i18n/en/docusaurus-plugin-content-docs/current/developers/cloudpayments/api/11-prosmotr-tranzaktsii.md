---
title: "View transaction details"
keywords:
  - "View transaction details"
---

# View transaction details

The method for retrieving transaction details.

**Endpoint:**
https://api.cloudpayments.ru/payments/get

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId | long | Yes | Transaction ID

If a transaction with the specified ID is found, the system will return its details.

**Request example:**

```llvm
{"TransactionId":897749645}
```

**Example response:**

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_*****************************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897749645,
        "Amount": 159,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 159,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "12345",
        "AccountId": "usex_x",
        "Email": null,
        "Description": "test",
        "JsonData": "",
        "CreatedDate": "/Date(1635566398686)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T03:59:58",
        "AuthDate": "/Date(1635566402780)/",
        "AuthDateIso": "2021-10-30T04:00:02",
        "ConfirmDate": "/Date(1635566406382)/",
        "ConfirmDateIso": "2021-10-30T04:00:06",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "87.251.91.164",
        "IpCountry": "RU",
        "IpCity": "Novosibirsk",
        "IpRegion": "Novo-Siberian region",
        "IpDistrict": "Siberian Federal District",
        "IpLatitude": 55.03923,
        "IpLongitude": 82.927818,
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
        "CultureName": "ru-RU",
        "Reason": "Approved",
        "CardHolderMessage": "Payment successfully processed",
        "Type": 0,
        "Refunded": false,
        "Name": "TEST",
        "Token": "success_eb250528-bd9e-4de7-bb49-9e0b546351d3",
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "VatAboveTotalFee": 0, // The calculated VAT amount charged on the System fee. The parameter is passed starting 29.04.2026
        "ProcessorAndPartnerFee": 0, // The merchant agent fee amount. The value is specified for SBP. The parameter is passed starting 29.04.2026
        "VatWithinProcessorFee": 0 // The calculated VAT amount included in the payment agent fee. The value is specified for SBP. The parameter is passed starting 29.04.2026
    },
    "Success": true,
    "Message": null
}
```
