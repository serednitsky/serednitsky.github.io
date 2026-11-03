---
title: "Выплата по токену"
keywords:
  - "Выплата по токену"
---

# Выплата по токену

Выплату по токену можно осуществить через вызов метода API. 

Выплаты по токену можно сделать только по токену, который получили при оплате по карте.

Токены TPay, Sbp и другие токены, полученные на иных способах оплаты, не подходят для выплат по токену.

**Адрес метода:**  
https://api.cloudpayments.ru/payments/token/topup  

**Параметры запроса:**

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Token | String | Обязательный |	Токен карты, выданный системой после первого платежа
Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
AccountId |	String | Обязательный | Идентификатор пользователя
Currency | String |	Обязательный | Валюта: RUB
InvoiceId |	String | Необязательный | Номер заказа в вашей системе
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике
Receiver | Object | Необязательный | Доп. поле, куда передается информация о получателе

<aside class="notice">Для выплат на иностранные карты понадобится параметр Payer или Receiver в зависимости от терминала.</aside>

**Пример запроса:**

```llvm
{
    "Token":"0a0afb77-8f41-4de2-9524-1057f9695303",
    "Amount":59,
    "AccountId":"user_x",
    "Currency":"RUB",
    "Payer":
    //Набор полей аналогичен и для параметра Receiver
      { 
        "FirstName":"Тест",
        "LastName":"Тестов",
        "MiddleName":"Тестович",
        "Address":"тестовый проезд дом тест",
        "Birth":"1955-02-24",
        "City":"MO",
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
        "PublicId": "pk_******************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897747761,
        "Amount": 59,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 59,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": null,
        "AccountId": "user_x",
        "Email": null,
        "Description": null,
        "JsonData": null,
        "CreatedDate": "/Date(1635566071122)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T03:54:31",
        "AuthDate": "/Date(1635566071232)/",
        "AuthDateIso": "2021-10-30T03:54:31",
        "ConfirmDate": "/Date(1635566071232)/",
        "ConfirmDateIso": "2021-10-30T03:54:31",
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
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "11/25",
        "CardType": "Visa",
        "CardProduct": "C",
        "CardCategory": "Visa Signature Signature",
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
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": "0a0afb77-8f41-4de2-9524-1057f9695303",
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
