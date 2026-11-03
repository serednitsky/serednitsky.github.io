---
title: "Modify a recurring payment subscription"
keywords:
  - "Modify a recurring payment subscription"
---

# Modify a recurring payment subscription

Method for modifying a previously created subscription.

**Endpoint:**
https://api.cloudpayments.ru/subscriptions/update

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Id | string | Yes | Subscription ID
Description | string | No | Used to modify the payment description
Amount | number | No | Used to modify the payment amount in the specified currency, dot as the decimal separator. Number of decimal places: 2
Currency | string |	No | Used to modify the currency: RUB/USD/EUR/GBP (see [reference](../handbook.md#list-of-currencies))
RequireConfirmation | bool | No | Used to modify the payment method
StartDate |	DateTime | No |	Used to modify the date and time of the initial or next scheduled payment in UTC
Interval | string |	No | Used to modify the interval. Possible values: Day, Week, Month
Period | int | No |	Used to modify the period. Combined with interval, 1 Month is once a month, and 2 Week is once every two weeks
MaxPeriods | int | No |	Used to modify the maximum number of payments within the subscription
CustomerReceipt |	JSON |	No |	Used to modify the [online receipt](../online-kassa.md#data-transmission-format-for-online-receipts) items
CultureName | string | No | Notification language Possible values: "ru-RU", "en-US". ([see reference](26-lokalizatsiya.md))

<aside class="notice">If a subscription is completed or cancelled by the <code>Payer</code> or <code>Partner</code>, modifying any subscription attribute via the API will reactivate it.
If a <code>MaxPeriods</code> value was set for the subscription, the maximum number of payments for the reactivated subscription will be equal to <code>MaxPeriods</code> minus the number of payments already successfully charged prior to the cancellation/completion.</aside><br />

In response to a well-formed request, the system returns a success message and the subscription parameters.

**Request example:**

```llvm
{
   "Id":"sc_3ffc96c001e152b341817341b075a",
   "description":"Recurring payment change",
   "amount":499,
   "currency":"RUB"
}
```

**Example response:**

```llvm
{
    "Model": {
        "Id": "sc_3ffc96c001e152b341817341b075a",
        "AccountId": "user_x",
        "Description": "Recurring payment change",
        "Email": "user@example.com",
        "Amount": 499,
        "CurrencyCode": 0,
        "Currency": "RUB",
        "RequireConfirmation": false,
        "StartDate": "/Date(1635973200000)/",
        "StartDateIso": "2021-11-03T21:00:00",
        "IntervalCode": 2,
        "Interval": "Day",
        "Period": 2,
        "MaxPeriods": null,
        "CultureName": "ru-RU",
        "StatusCode": 0,
        "Status": "Active",
        "SuccessfulTransactionsNumber": 0,
        "FailedTransactionsNumber": 0,
        "LastTransactionDate": null,
        "LastTransactionDateIso": null,
        "NextTransactionDate": "/Date(1635973200000)/",
        "NextTransactionDateIso": "2021-11-03T21:00:00",
        "Receipt": null,
        "FailoverSchemeId": null
    },
    "Success": true,
    "Message": null
}
```
