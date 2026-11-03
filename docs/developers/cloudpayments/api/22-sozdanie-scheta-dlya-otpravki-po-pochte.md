---
title: "Создание счета для отправки по почте"
keywords:
  - "Создание счета для отправки по почте"
---

# Создание счета для отправки по почте

Метод формирования ссылки на оплату и последующей отправки уведомления на e-mail адрес плательщика.  

**Адрес метода:**  
https://api.cloudpayments.ru/orders/create  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
Currency | String |	Необязательный | Валюта RUB/USD/EUR/GBP ([см. справочник](../handbook.md#список-валют)). Если параметр не передан, то по умолчанию принимает значение RUB
Description | String | Обязательный | Назначение платежа в свободной форме
Email |	String | Необязательный | E-mail плательщика
RequireConfirmation | Bool | Необязательный | Есть значение true — платеж будет выполнен по двухстадийной схеме
SendEmail | Bool | Необязательный |	Если значение true — плательщик получит письмо со ссылкой на оплату
InvoiceId |	String | Необязательный | Номер заказа в вашей системе
AccountId |	String | Необязательный | Идентификатор пользователя в вашей системе
OfferUri | String | Необязательный | Ссылка на оферту, которая будет показываться на странице заказа
Phone |	String | Необязательный | Номер телефона плательщика в произвольном формате
SendSms | Bool | Необязательный | Если значение true — плательщик получит СМС со ссылкой на оплату
SendViber | Bool | Необязательный |	Если значение true — плательщик получит сообщение в Viber со ссылкой на оплату
CultureName | String | Необязательный |	Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](26-lokalizatsiya.md))
SubscriptionBehavior | String |	Необязательный | Для создания платежа с подпиской. Возможные значения: CreateWeekly, CreateMonthly
SuccessRedirectUrl | String | Необязательный | Адрес страницы для редиректа при успешной оплате
FailRedirectUrl | String | Необязательный | Адрес страницы для редиректа при неуспешной оплате
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для формирования [онлайн-чека] (#format-peredachi-dannyh-dlya-onlayn-cheka) должны обёртываться в объект `cloudpayments`

<aside class="notice">В ответ на корректно сформированный запрос система возвращает параметры запроса и ссылку на оплату.</aside>

**Пример запроса:**

```llvm
{
    "Amount":10.0,
    "Currency":"RUB",
    "Description":"Оплата на сайте example.com",
    "Email":"client@test.local",
    "RequireConfirmation":true,
    "SendEmail":false
}
```

**Пример ответа:**

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
        "Description": "Оплата на сайте example.com",
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

<aside class="notice">Сообщение на телефон плательщика может быть отправлено только одним выбранным способом: СМС или Viber.</aside>
