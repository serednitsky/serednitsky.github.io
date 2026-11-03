---
title: "Выплата по СБП"
keywords:
  - "Выплата по СБП"
---

# Выплата по СБП

Выплату по СБП можно осуществить через вызов метода API.

**Адрес метода:**  
https://api.cloudpayments.ru/payments/alt/topup  

**Параметры запроса:**

|Параметр | Формат | Применение | Описание|
|--- | --- | --- | ---|
|MemberId | String | Необязательный | Идентификатор банка получателя НПСК для СБП<br />Если в запросе поле `Receiver.Phone` заполнено, то `MemberId` обязательное<br />Допустимые значения для `MemberId` можно найти по [ссылке](https://qr.nspk.ru/proxyapp/c2bmembers.json). Значение из поля `schema` в поле `MemberId` надо передать только цифровое значение из поля `schema`<br />Например, для `schema:bank100000000111` передать `MemberId:100000000111`|
|Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2|
|Currency | String | Обязательный | Валюта: RUB|
|AccountId | String | Необязательный | Идентификатор пользователя|
|Email | String | Необязательный | E-mail плательщика, на который будет отправлена квитанция об оплате|
|CultureName | String | Необязательный | Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](26-lokalizatsiya.md))|
|InvoiceId | String | Необязательный | Номер заказа в вашей системе|
|Description | String | Необязательный | Описание оплаты в свободной форме|
|Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике. Используйте следующие параметры: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`|
|Receiver | Object | Обязательный | Доп. поле, куда передается информация о получателе|
|Receiver.Phone | String | Обязательный | Для выплаты по СБП необходимо указать номер получателя средств|

**Пример запроса:**

```llvm
{
    "Amount":1,
    "AccountId":"user@example.com",
    "MemberId":"12456",
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Receiver":
      { 
        "Phone":"+71234567890"
    }
}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "test_api_00000000000000000000002",
        "TerminalUrl": "https://demo-preprod.cloudpayments.ru",
        "TransactionId": 2200976211,
        "Amount": 50,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 50,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "a.kadyrova@cloudpayments.ru",
        "Email": "a.kadyrova@cloudpayments.ru",
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1717514966896)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2024-06-04T15:29:26",
        "AuthDate": "/Date(1717514967037)/",
        "AuthDateIso": "2024-06-04T15:29:27",
        "ConfirmDate": "/Date(1717514967037)/",
        "ConfirmDateIso": "2024-06-04T15:29:27",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "172.18.200.35",
        "IpCountry": "",
        "IpCity": null,
        "IpRegion": null,
        "IpDistrict": null,
        "IpLatitude": null,
        "IpLongitude": null,
        "CardFirstSix": "424242",
        "CardLastFour": "4242",
        "CardExpDate": "01/77",
        "CardType": "Visa",
        "CardProduct": "",
        "CardCategory": "Не определен ()",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "TINKOFF",
        "CardTypeCode": 0,
        "Status": "Completed",
        "StatusCode": 3,
        "CultureName": "ru",
        "Reason": "Approved",
        "CardHolderMessage": "Оплата успешно проведена",
        "Type": 2,
        "Refunded": false,
        "Name": "SERGEY",
        "Token": null,
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "IsLocalOrder": false,
        "Gateway": 0,
        "MasterPass": false,
        "InfoShopData": null,
        "Receiver":{ 
          "FirstName":"Тест",
          "LastName":"Тестов",
          "MiddleName":"Тестович",
          "Address":"тестовый проезд дом тест",
          "Birth":"1955-02-24",
          "City":"MO",
          "Street":"Ленина",
          "Country":"RU",
          "Phone":"+71234567890",
          "Postcode":"345"
         }
    },
    "Success": true,
    "Message": null,
    "ErrorCode": null
}
```
