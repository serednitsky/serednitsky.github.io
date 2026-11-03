---
title: "Export transaction list for an arbitrary period"
keywords:
  - "Export transaction list for an arbitrary period"
---

# Export transaction list for an arbitrary period

Method for exporting the transaction list for an arbitrary period.

**Endpoint:**
https://api.cloudpayments.ru/v2/payments/list

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
CreatedDateGte | date| Yes | Transaction creation start date
CreatedDateLte | date| Yes | Transaction creation end date
PageNumber | number | Yes | Page number, must be greater than or equal to 1
TimeZone | string | No | Time zone code, UTC by default
Statuses | string array | No | Operation status Can take the following values: \[ "Authorized", "Completed", "Cancelled", "Declined" ]. All selected by default

The exported transaction list includes all operations recorded for the specified day. Results are sorted by `CreatedDate`, from the oldest to the newest, with a limit of 100 items per page.
 For accounting convenience, you can specify a time zone code ([see reference](../handbook.md#time-zone-codes)).

**Request example:**

```llvm
{
    "PageNumber": 1,
    "CreatedDateGte":"2021-03-09T00:00:00+03:00",
    "CreatedDateLte":"2021-03-10T00:00:00+03:00",
    "TimeZone": "MSK",
    "Statuses": [
        "Authorized",
        "Completed",
        "Cancelled",
        "Declined"
    ]
    }
```

**Example response:**

```llvm
{
   "Model":[
      {
         "PublicId":"test_api_00000000000000000000001",
         "TerminalUrl":"https://cloudpayments.ru",
         "TransactionId":54,
         "Amount":12.34,
         "Currency":"RUB",
         "CurrencyCode":0,
         "PaymentAmount":12.34,
         "PaymentCurrency":"RUB",
         "PaymentCurrencyCode":0,
         "InvoiceId":"1234567",
         "AccountId":"User@Example.com",
         "Email":null,
         "Description":"Payment for goods at example.com",
         "JsonData":"{\"some\": \"value\"}",
         "CreatedDate":"\/Date(1615288374632)\/",
         "PayoutDate":null,
         "PayoutDateIso":null,
         "PayoutAmount":null,
         "CreatedDateIso":"2021-03-09T11:12:54",
         "AuthDate":null,
         "AuthDateIso":null,
         "ConfirmDate":null,
         "ConfirmDateIso":null,
         "AuthCode":null,
         "TestMode":true,
         "Rrn":null,
         "OriginalTransactionId":null,
         "FallBackScenarioDeclinedTransactionId":null,
         "IpAddress":"127.0.0.1",
         "IpCountry":"",
         "IpCity":null,
         "IpRegion":null,
         "IpDistrict":null,
         "IpLatitude":null,
         "IpLongitude":null,
         "CardFirstSix":"424242",
         "CardLastFour":"4242",
         "CardExpDate":"05/22",
         "CardType":"Visa",
         "CardProduct":null,
         "CardCategory":null,
         "IssuerBankCountry":"FF",
         "Issuer":null,
         "CardTypeCode":0,
         "Status":"Declined",
         "StatusCode":5,
         "CultureName":"ru",
         "Reason":"SystemError",
         "CardHolderMessage":"Try again later",
         "Type":0,
         "Refunded":false,
         "Name":"CARD HOLDER",
         "Token":null,
         "SubscriptionId":null,
         "IsLocalOrder":false,
         "HideInvoiceId":false,
         "Gateway":0,
         "GatewayName":"Test",
         "AndroidPay":false,
         "MasterPass":false,
         "TotalFee":0,
         "EscrowAccumulationId":null,
         "ReasonCode":5096,
         "VatAboveTotalFee": 0, // The calculated VAT amount charged on the System fee. The parameter is passed starting 29.04.2026
         "ProcessorAndPartnerFee": 0, // The merchant agent fee amount. The value is specified for SBP. The parameter is passed starting 29.04.2026
         "VatWithinProcessorFee": 0 // The calculated VAT amount included in the payment agent fee. The value is specified for SBP. The parameter is passed starting 29.04.2026
      }
   ],
   "Success":true,
   "Message":null
}
```
