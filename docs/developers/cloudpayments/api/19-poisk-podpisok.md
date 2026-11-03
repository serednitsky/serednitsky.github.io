---
title: "Поиск подписок"
keywords:
  - "Поиск подписок"
---

# Поиск подписок

Метод получения списка подписок для определенного аккаунта.    

**Адрес метода:**  
https://api.cloudpayments.ru/subscriptions/find

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
accountId | String | Обязательный | Идентификатор пользователя

**Пример запроса:**

```llvm
{"accountId":"user@example.com"}
```

**Пример ответа:**

```llvm
{
    "Model": [
{
            "Id": "sc_221da6421dc44dbd2cc3464f6f083",
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
        {
            "Id": "sc_3ffc96c001e152b341817341b075a",
            "AccountId": "user_x",
            "Description": null,
            "Email": "user@example.com",
            "Amount": 999,
            "CurrencyCode": 0,
            "Currency": "RUB",
            "RequireConfirmation": false,
            "StartDate": "/Date(1635973200000)/",
            "StartDateIso": "2021-11-03T21:00:00",
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
            "NextTransactionDate": "/Date(1635973200000)/",
            "NextTransactionDateIso": "2021-11-03T21:00:00",
            "Receipt": null,
            "FailoverSchemeId": null
        }
    ],
    "Success": true,
    "Message": null
}
```
