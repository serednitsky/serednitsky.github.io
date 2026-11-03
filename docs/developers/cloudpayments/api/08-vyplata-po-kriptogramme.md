---
title: "Выплата по криптограмме"
keywords:
  - "Выплата по криптограмме"
---

# Выплата по криптограмме

Выплату по криптограмме можно осуществить через вызов метода API.  
  
**Адрес метода:**  
https://api.cloudpayments.ru/payments/cards/topup

**Параметры запроса:**

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
CardCryptogramPacket | String | Обязательный | Криптограмма платежных данных
Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
Currency | String | Обязательный | Валюта: RUB
Name | String | Необязательный | Имя держателя карты латиницей
AccountId | String | Необязательный | Идентификатор пользователя
Email | String | Необязательный | E-mail плательщика, на который будет отправлена квитанция об оплате
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией. Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`.
InvoiceId | String | Необязательный | Номер заказа в вашей системе
Description | String | Необязательный | Описание оплаты в свободной форме
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике
Receiver | Object | Необязательный | Доп. поле, куда передается информация о получателе

<aside class="notice">Для выплат на иностранные карты понадобится параметр Payer или Receiver в зависимости от терминала.</aside>

**Пример запроса:**

```llvm
{
    "Name":"CARDHOLDER NAME",
    "CardCryptogramPacket":"01492500008719030128SMfLeYdKp5dSQVIiO5l6ZCJiPdel4uDjdFTTz1UnXY+3QaZcNOW8lmXg0H670MclS4lI+qLkujKF4pR5Ri+T/E04Ufq3t5ntMUVLuZ998DLm+OVHV7FxIGR7snckpg47A73v7/y88Q5dxxvVZtDVi0qCcJAiZrgKLyLCqypnMfhjsgCEPF6d4OMzkgNQiynZvKysI2q+xc9cL0+CMmQTUPytnxX52k9qLNZ55cnE8kuLvqSK+TOG7Fz03moGcVvbb9XTg1oTDL4pl9rgkG3XvvTJOwol3JDxL1i6x+VpaRxpLJg0Zd9/9xRJOBMGmwAxo8/xyvGuAj85sxLJL6fA==",
    "Amount":1,
    "AccountId":"user@example.com",
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Payer":
      //Набор полей аналогичен и для параметра Receiver
      { 
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
}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_*******************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897739551,
        "Amount": 399,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 399,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "user@example.com",
        "Email": null,
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1635564719715)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T03:31:59",
        "AuthDate": "/Date(1635564719858)/",
        "AuthDateIso": "2021-10-30T03:31:59",
        "ConfirmDate": "/Date(1635564719858)/",
        "ConfirmDateIso": "2021-10-30T03:31:59",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "172.18.200.124",
        "IpCountry": "",
        "IpCity": null,
        "IpRegion": null,
        "IpDistrict": null,
        "IpLatitude": null,
        "IpLongitude": null,
        "CardFirstSix": "424242",
        "CardLastFour": "4242",
        "CardExpDate": "12/25",
        "CardType": "Visa",
        "CardProduct": "I",
        "CardCategory": "Visa Infinite (Infinite)",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "CloudPayments",
        "CardTypeCode": 0,
        "Status": "Completed",
        "StatusCode": 3,
        "CultureName": "ru",
        "Reason": "Approved",
        "CardHolderMessage": "Оплата успешно проведена",
        "Type": 2,
        "TransactionIsInProcess": false,
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": null,
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0
    },
    "Success": true,
    "Message": null
}
```

<aside class="notice">Можно воспользоваться механизмом надежной аутентификации запроса на выплату. Для этого передайте в нашу поддержку сертификат с публичной частью ключа. Далее сгенерируйте подпись на основе тела запроса и разместите ее в заголовке X-Signature в base64 формате. CloudPayments проверит вашу подпись, используя CryptoService. Если подпись валидна, то обработка запроса продолжится, если нет — обработка прекратится.</aside>

**В ответе метода выплаты по криптограмме POST /payments/cards/topup возвращаются следующие статусы:**

| Статус | Описание |
|---|---|
| Completed | Выплата выполнена успешно |
| Created | Выплата в промежуточном статусе |
| Failed | Выплата не выполнена |

В случае перехода транзакции в промежуточный статус **срабатывает сценарий асинхронной обработки выплаты**, в результате выполнения которого параметр Model.Status принимает значение “Created”, а флаг Model.TransactionIsInProcess становится равен true. 

При завершении обработки выплаты статус транзакции будет изменен на терминальный и отправлено **webhook-уведомление** с финальным статусом: 

| Статус | Тип уведомления |
|---|---|
| Completed | PAY, [Документация CloudPayments](../notifications.md#pay) |
| Failed | FAIL, [Документация CloudPayments](../notifications.md#fail) |

<aside class="notice">В редких случаях процесс обработки запроса на выплату может занимать до 60 минут</aside>
