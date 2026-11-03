---
title: "Изменение подписки на рекуррентные платежи"
keywords:
  - "Изменение подписки на рекуррентные платежи"
---

# Изменение подписки на рекуррентные платежи

Метод изменения ранее созданной подписки.  

**Адрес метода:**   
https://api.cloudpayments.ru/subscriptions/update  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Id | String | Обязательный | Идентификатор подписки
Description | String | Необязательный | Для изменения назначения платежа
Amount | Number | Необязательный | Для изменения суммы платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2.
Currency | String |	Необязательный | Для изменения валюты: RUB/USD/EUR/GBP ([см. справочник](../handbook.md#список-валют))
RequireConfirmation | Bool | Необязательный | Для изменения схемы проведения платежей
StartDate |	DateTime | Необязательный |	Для изменения даты и времени первого или следующего платежа во временной зоне UTC
Interval | String |	Необязательный | Для изменения интервала. Возможные значения: Day, Week, Month
Period | Int | Необязательный |	Для изменения периода. В комбинации с интервалом, 1 Month значит раз в месяц, а 2 Week — раз в две недели
MaxPeriods | Int | Необязательный |	Для изменения максимального количества платежей в подписке
CustomerReceipt |	json |	Необязательный |	Для изменения состава [онлайн-чека](../online-kassa.md#формат-передачи-данных-для-онлайн-чека)
CultureName | String | Необязательный | Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](26-lokalizatsiya.md))

<aside class="notice">В случае завершения подписки или её отмены Плательщиком или Партнёром, при изменении любого атрибута подписки через API, подписка вновь активируется!
В случае, если у подписки был задан MaxPeriods, то у вновь активированной подписки максимальное количество платежей в подписке будет равно MaxPeriods - количество платежей, которое уже было списано до момента отмены/завершения подписки.</aside>

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции и параметры подписки.

**Пример запроса:**

```llvm
{  
   "Id":"sc_3ffc96c001e152b341817341b075a",
   "description":"изменение рекуррента",
   "amount":499,
   "currency":"RUB"
}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "Id": "sc_3ffc96c001e152b341817341b075a",
        "AccountId": "user_x",
        "Description": "изменение рекуррента",
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
