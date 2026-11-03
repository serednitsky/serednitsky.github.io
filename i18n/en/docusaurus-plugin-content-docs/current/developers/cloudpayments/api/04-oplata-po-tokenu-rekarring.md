---
title: "Token payment (recurring)"
keywords:
  - "Token payment (recurring)"
  - "Possible options"
---

# Token payment (recurring)

<aside class="notice">
According to the NSPK requirements, merchant platforms providing telecommunication services (MCC 4814 Telecommunication Services), must provide the payer's phone number. If the phone number is missing from the request, acquiring banks will decline the transactions.
<br />
<br />
The phone number must be passed in the <code>Phone</code> parameter within the <code>Payer</code> object.
<br />
Format: digits only, without delimiters such as hyphens, or parentheses.
<br />
Example: "+71234567890"
</aside>

Method for token payments using a token generated during a [cryptogram payment](02-oplata-po-kriptogramme.md) or via a [Pay](../notifications.md#pay) notification.

<aside class="notice">
A token payment can only be processed on the terminal (<code>publicId</code>) where the token was originally generated. If you need to share tokens across multiple terminals, send a free-form request to [assistant@cp.ru](mailto:assistant@cp.ru).
</aside>

<aside class="notice">
The final status of an SBP token payment (Completed/Declined) can be obtained via the <a href="../notifications.md#pay">Pay</a> and <a href="../notifications.md#fail">Fail</a> notifications after the transaction has been created, rather than in the payment request response.
</aside><br />

**Endpoint**:
`https://api.cloudpayments.ru/payments/tokens/charge` for [single-stage](../general-information.md#payment-processing-methods) payment
`https://api.cloudpayments.ru/payments/tokens/auth` for [two-stage](../general-information.md#payment-processing-methods) payment

**Request parameters:**

Parameter | Format | Required     | Description
--------- |-------|----------------| -----------
Amount | number | Yes   | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
Currency | string | No | Currency: RUB/USD/EUR/GBP (see [reference](../handbook.md#list-of-currencies)). If the parameter is omitted, the default value is RUB
AccountId | string | Yes   | User ID
TrInitiatorCode | int   | Yes   | Indicates which party initiated the transaction.<br />Possible values:<br />0: the transaction is initiated by the merchant and based on previously stored credentials<br />1: the transaction is initiated by the cardholder (customer) and based on previously stored credentials<br />**IMPORTANT!** If the transaction is initiated by the merchant, you must additionally specify the `PaymentScheduled` parameter with a valid value in the request.
PaymentScheduled | int   | No   | The flag of a scheduled payment based on previously stored credentials<br />Possible values:<br />0: unscheduled<br />1: scheduled<br />**IMPORTANT!** If this parameter is not specified in the request, the default value is 0.
Token | string | Yes   | Token
InvoiceId | string | No | Invoice number or order number
Description | string | No | Payment description (free-form)
IpAddress | string | No | Payer IP address
Email | string | No |  	Payer email for receiving payment confirmation
Payer | object | No | Additional field used to pass payer information Use the following fields: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`
JsonData | JSON  | No | Any other data associated with the transaction, including instructions for [creating a subscription](17-sozdanie-podpiski-na-rekurrentnye-platezhi.md) or generating an[online receipt](../online-kassa.md#data-transmission-format-for-online-receipts), must be wrapped in the `cloudpayments` object. We have reserved the names of the following parameters and displayed their contents in the transaction register downloaded from the CloudPayments dashboard: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`

The server returns a JSON file with three components: the **success** field (the result of the request), the **message** field (a description of the error), and the **model** object (extended information).

## Possible options

* Malformed request:
	**Success**: false
	**Message**: error description
* Transaction declined:
	**Success**: false
	**Model**: transaction information and an error code
* Transactions accepted:
	**Success**: true
	**Model**: transaction information


<aside class="notice">The request result (the `Success` field) does not reflect the transaction status; it only indicates the success or failure of the API request. The transaction status is reflected in the additional `Status` field, and can also be obtained via received <a href="../notifications.md">notifications</a>. For the interpretation of transaction statuses, see <a href="../handbook.md#transaction-statuses">reference</a>.</aside>

**Request example for a token payment**:

```llvm
{
    "Amount":59,
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Description":"Payment for goods at example.com",
    "AccountId":"user_x",
    "TrInitiatorCode": 0,
    "PaymentScheduled": 1,
    "Token":"success_1111a3e0-2428-48fb-a530-12815d90d0e8",
    "Payer":
      {
        "FirstName":"Test",
        "LastName":"Testov",
        "MiddleName":"Testovich",
        "Birth":"1955-02-24",
        "Address":"test drive test home",
        "Street":"Lenina",
        "City":"MO",
        "Country":"RU",
        "Phone":"+71234567890",
        "Postcode":"345"
    }
}
```

**Response example:** *malformed request*

```llvm
{"Success":false,"Message":"Amount is required"}
```

**Response example:** *transaction declined*. The `ReasonCode` field specifies the error code (see [reference](../handbook.md#error-codes))

```llvm
{
    "Model": {
        "ReasonCode": 5051,
        "PublicId": "pk_**********************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 891583633,
        "Amount": 100,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 100,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "TrInitiatorCode": 0,
        "Email": null,
        "Description": "Payment for goods at example.com",
        "JsonData": null,
        "CreatedDate": "/Date(1635154784619)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-25T09:39:44",
        "AuthDate": null,
        "AuthDateIso": null,
        "ConfirmDate": null,
        "ConfirmDateIso": null,
        "AuthCode": null,
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "123.123.123.123",
        "IpCountry": "CN",
        "IpCity": "Beijing",
        "IpRegion": "Beijing",
        "IpDistrict": "Beijing",
        "IpLatitude": 39.9289,
        "IpLongitude": 116.3883,
        "CardFirstSix": "400005",
        "CardLastFour": "5556",
        "CardExpDate": "12/25",
        "CardType": "Visa",
        "CardProduct": null,
        "CardCategory": null,
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "US",
        "Issuer": "ITS Bank",
        "CardTypeCode": 0,
        "Status": "Declined",
        "StatusCode": 5,
        "CultureName": "ru",
        "Reason": "InsufficientFunds",
        "CardHolderMessage": "Insufficient funds",
        "Type": 0,
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": "tk_255c42192323f2e09ea17635302c3",
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "VatAboveTotalFee": 0, // The calculated VAT amount charged on the System fee. This value is populated for single-stage payments. The parameter is passed starting 29.04.2026
        "ProcessorAndPartnerFee": null, // The merchant agent fee amount. The parameter is passed starting 29.04.2026
        "VatWithinProcessorFee": null // The calculated VAT amount included in the payment agent fee. The parameter is passed starting 29.04.2026
    },
    "Success": false,
    "Message": null
}
```

**Response example:** *transaction accepted*

```llvm
 {
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_**************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897728064,
        "Amount": 59,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 59,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": 1234567,
        "AccountId": "user_x",
        "TrInitiatorCode": 0,
        "Email": null,
        "Description": "Payment for goods at example.com",
        "JsonData": null,
        "CreatedDate": "/Date(1635562705992)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T02:58:25",
        "AuthDate": "/Date(1635562706070)/",
        "AuthDateIso": "2021-10-30T02:58:26",
        "ConfirmDate": "/Date(1635562706070)/",
        "ConfirmDateIso": "2021-10-30T02:58:26",
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
        "CardCategory": "Visa Infinite Infinite",
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
        "Name": "SER",
        "Token": "success_1111a3e0-2428-48fb-a530-12815d90d0e8",
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "VatAboveTotalFee": 0, // The calculated VAT amount charged on the System fee. This value is populated for single-stage payments. The parameter is passed starting 29.04.2026
        "ProcessorAndPartnerFee": null, // The merchant agent fee amount. The parameter is passed starting 29.04.2026
        "VatWithinProcessorFee": null // The calculated VAT amount included in the payment agent fee. The parameter is passed starting 29.04.2026
    },
    "Success": true,
    "Message": null
}
```
