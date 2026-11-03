---
title: "Create an invoice for email delivery"
keywords:
  - "Create an invoice for email delivery"
---

# Create an invoice for email delivery

Method for generating a payment link and sending an email notification to the payer.

**Endpoint:**
https://api.cloudpayments.ru/orders/create

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Amount | number | Yes | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
Currency | string |	No | The currency is RUB/USD/EUR/GBP (see [reference](../handbook.md#list-of-currencies)). If the parameter is omitted, the default value is RUB
Description | string | Yes | Payment description (free-form)
Email |	string | No | Payer email
RequireConfirmation | bool | No | If `true`, the payment  will be processed using the two-stage payment method
SendEmail | bool | No |	If `true`, the payer receives an email with a link for payment
InvoiceId |	string | No | Order number in your system
AccountId |	string | No | User ID in your system
OfferUri | string | No | Link to the offer that will be displayed on the order page
Phone |	string | No | Payer's phone number in any format
SendSms | bool | No | If `true`, the payer will receive an SMS containing the link for payment
SendViber | bool | No |	If `true`, the payer will receive a Viber message containing the link for payment
CultureName | string | No |	Notification language Possible values: "ru-RU", "en-US" ([see reference](26-lokalizatsiya.md))
SubscriptionBehavior | string |	No | Used to create a subscription payment. Possible values: CreateWeekly, CreateMonthly
SuccessRedirectUrl | string | No | Redirect URL for a successful payment
FailRedirectUrl | string | No | Redirect URL for a failed payment
JsonData | JSON | No | Any other data associated with the transaction, including instructions for generating an \[online receipt\](../online-kassa.md#data-transmission-format-for-online-receipts), must be wrapped in the `cloudpayments` object

<aside class="notice">In response to a well-formed request, the system returns the request parameters and payment links.</aside><br />

**Request example:**

```llvm
{
    "Amount":10.0,
    "Currency":"RUB",
    "Description":"Payment for goods at example.com",
    "Email":"client@test.local",
    "RequireConfirmation":true,
    "SendEmail":false
}
```

**Example response:**

```llvm
{
    "Model": {
        "Id": "gASGZVgUN21hcpPF",
        "Number": 2130,
        "Amount": 10.0,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "Email": "client@test.local",
        "Phone": "+71234567890",
        "Description": "Payment at example.com",
        "RequireConfirmation": true,
        "Url": "https://orders.cloudpayments.ru/d/gASGZVgUN21hcpPF",
        "CultureName": "ru-RU",
        "CreatedDate": "/Date(1635835930555)/",
        "CreatedDateIso": "2021-11-02T09:52:10",
        "PaymentDate": null,
        "PaymentDateIso": null,
        "StatusCode": 0,
        "Status": "Created",
        "InternalId": 12272915
    },
    "Success": true,
    "Message": null
}
```

<aside class="notice">The message to the payer's phone can be sent using only one selected method: SMS or Viber.</aside>
