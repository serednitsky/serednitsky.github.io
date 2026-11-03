---
title: "Request subscription information"
keywords:
  - "Request subscription information"
---

# Request subscription information

Method for retrieving subscription details

**Endpoint:**
https://api.cloudpayments.ru/subscriptions/get

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Id | string | Yes | Subscription ID

**Request example:**

```llvm
{"Id":"sc_8cf8a9338fb8ebf7202b08d09c938"}
```

**Example response:**

```llvm
{
    "Model": {
        "Id": "sc_8cf8a9338fb8ebf7202b08d09c938",
        "AccountId": "user_x",
        "Description": null,
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
        "StatusCode": 3,
        "Status": "Cancelled",
        "SuccessfulTransactionsNumber": 0,
        "FailedTransactionsNumber": 0,
        "LastTransactionDate": null,
        "LastTransactionDateIso": null,
        "NextTransactionDate": null,
        "NextTransactionDateIso": null,
        "Receipt": null,
        "FailoverSchemeId": null
    },
    "Success": true,
    "Message": null
}
```
