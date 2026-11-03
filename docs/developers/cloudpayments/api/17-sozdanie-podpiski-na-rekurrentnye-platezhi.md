---
title: "Создание подписки на рекуррентные платежи"
keywords:
  - "Создание подписки на рекуррентные платежи"
---

# Создание подписки на рекуррентные платежи

Метод создания подписки  на рекуррентные платежи.  

<aside class="notice">
Оплата по токену проходит только на том терминале (<code>publicId</code>), на котором был получен токен. Если необходимо использовать токены на других терминалах, обратитесь в свободной форме на почту [assistant@cp.ru](mailto:assistant@cp.ru)
</aside>

**Адрес метода:**  
https://api.cloudpayments.ru/subscriptions/create   
 
**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Token |	String | Обязательный |	Токен карты, выданный системой после первого платежа
AccountId |	String | Обязательный | Идентификатор пользователя
Description | String | Обязательный | Назначение платежа в свободной форме
Email |	String | Необязательный |	E-mail плательщика
Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
Currency | String |	Обязательный | Валюта: RUB/USD/EUR/GBP (см. [справочник](../handbook.md#список-валют))
RequireConfirmation | Bool | Обязательный | Если значение true — платежи будут выполняться по двухстадийной схеме
StartDate |	DateTime | Обязательный | Дата и время первого платежа по плану во временной зоне UTC. Значение должно быть в будущем
Interval | String |	Обязательный | Интервал. Возможные значения: Day, Week, Month
Period | Int | Обязательный | Период. В комбинации с интервалом, 1 Month значит раз в месяц, а 2 Week — раз в две недели. Должен быть больше 0
MaxPeriods | Int | Необязательный |	Максимальное количество платежей в подписке. Если указан, должен быть больше 0
CustomerReceipt |	json |	Необязательный |	Для изменения состава [онлайн-чека](../online-kassa.md#формат-передачи-данных-для-онлайн-чека) 

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции и идентификатор подписки.

**Пример запроса:**

```llvm
{  
   "token": "477BBA133C182267FE5F086924ABDC5DB71F77BFC27F01F2843F2CDC69D89F05",
   "accountId": "user_x",
   "description": "Ежемесячная подписка на сервис example.com",
   "email": "user@example.com",
   "amount": 399,
   "currency": "RUB",
   "requireConfirmation": false,
   "startDate": "2021-11-02T21:00:00",
   "interval": "Day",
   "period": 5
}
```

**Пример ответа:**

```llvm
 {
    "Model": {
        "Id": "sc_221da6421dc44dbd2cc3464f6f083",
        "AccountId": "user_x",
        "Description": "Ежемесячная подписка на сервис example.com",
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
