---
title: "Create a recurring payment subscription"
keywords:
  - "Create a recurring payment subscription"
---

# Create a recurring payment subscription

Method for creating a recurring payment subscription

<aside class="notice">
A token payment can only be processed on the terminal (<code>publicId</code>) where the token was originally generated. If you need to share tokens across multiple terminals, send a free-form request to [assistant@cp.ru](mailto:assistant@cp.ru).
</aside><br />

**Endpoint:**
https://api.cloudpayments.ru/subscriptions/create

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Token |	string | Yes |	The card token issued by the system after the initial payment
AccountId |	string | Yes | User ID
Description | string | Yes | Payment description (free-form)
Email |	string | No |	Payer email
Amount | number | Yes | The payment amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
Currency | string |	Yes | Currency: RUB/USD/EUR/GBP (see [reference](../handbook.md#list-of-currencies))
RequireConfirmation | bool | Yes | If `true`, the payment will be processed using the two-stage payment method
StartDate |	DateTime | Yes | The date and time of the initial scheduled payment in UTC. The value must be in the future
Interval | string |	Yes | Interval. Possible values: Day, Week, Month
Period | int | Yes | Period. Combined with interval, 1 Month is once a month, and 2 Week is once every two weeks. Must be greater than 0
MaxPeriods | int | No |	Maximum number of payments in subscription. If specified, it must be greater than 0
CustomerReceipt | JSON |	No |	Used to modify the [online receipt](../online-kassa.md#data-transmission-format-for-online-receipts) items

In response to a well-formed request, the system returns a success message ad the subscription ID.

**Request example:**

```llvm
{
   "token": "477BBA133C182267FE5F086924ABDC5DB71F77BFC27F01F2843F2CDC69D89F05",
   "accountId": "user_x",
   "description": "Monthly subscription to example.com",
   "email": "user@example.com",
   "amount": 399,
   "currency": "RUB",
   "requireConfirmation": false,
   "startDate": "2021-11-02T21:00:00",
   "interval": "Day",
   "period": 5
}
```

**Example response:**

```llvm
 {
    "Model": {
        "Id": "sc_221da6421dc44dbd2cc3464f6f083",
        "AccountId": "user_x",
        "Description": "Monthly subscription to example.com",
        "Email": "user@example.com",
        "Amount": 399,
        "CurrencyCode": 0,
        "Currency": "RUB",
        "RequireConfirmation": false,
        "StartDate": "/Date(1635886800000)/",
        "StartDateIso": "2021-11-02T21:00:00",
        "IntervalCode": 2,
        "Interval": "Day",
        "Period": 5,
        "MaxPeriods": null,
        "CultureName": "ru-RU",
        "StatusCode": 0,
        "Status": "Active",
        "SuccessfulTransactionsNumber": 0,
        "FailedTransactionsNumber": 0,
        "LastTransactionDate": null,
        "LastTransactionDateIso": null,
        "NextTransactionDate": "/Date(1635886800000)/",
        "NextTransactionDateIso": "2021-11-02T21:00:00",
        "Receipt": null,
        "FailoverSchemeId": null
    },
    "Success": true,
    "Message": null
}
```
