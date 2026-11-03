---
title: "Запрос информации о подписке"
keywords:
  - "Запрос информации о подписке"
---

# Запрос информации о подписке

Метод получения информации о статусе подписки.

**Адрес метода:**    
https://api.cloudpayments.ru/subscriptions/get  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Id | String | Обязательный | Идентификатор подписки

**Пример запроса:**

```llvm
{"Id":"sc_8cf8a9338fb8ebf7202b08d09c938"}
```

**Пример ответа:**

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
