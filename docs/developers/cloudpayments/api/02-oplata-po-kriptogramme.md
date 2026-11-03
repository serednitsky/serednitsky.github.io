---
title: "Оплата по криптограмме"
keywords:
  - "Оплата по криптограмме"
---

# Оплата по криптограмме

<aside class="notice">
По требованию НСПК, для ТСП, предоставляющих телекоммуникационные услуги (MCC 4814 Telecommunication Services), обязательна передача номера телефона плательщика. При отсутствии номера телефона в запросе, банки-эквайеры будут отклонять проводимые операции.
<br />
<br />
Номер телефона необходимо передавать в объекте Payer в параметре Phone. 
<br />
Формат передачи: только цифры, без разделителей “( )“, “-“ .
<br />
Пример передачи: “+71234567890“
</aside>

Метод для оплаты по криптограмме платежных данных результат алгоритма шифрования. Для формирования криптограммы воспользуйтесь скриптом [Checkout](../checkout.md).

**Адреса метода**:  
https://api.cloudpayments.ru/payments/cards/charge — для [одностадийного платежа](../general-information.md#схемы-проведения-платежа)  
https://api.cloudpayments.ru/payments/cards/auth — для [двухстадийного](../general-information.md#схемы-проведения-платежа)  

**Параметры запроса:** 


Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Amount | Number | Обязательный | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
Currency | String | Необязательный | Валюта: RUB/USD/EUR/GBP ([см. справочник](../handbook.md#список-валют)). Если параметр не передан, то по умолчанию принимает значение RUB
IpAddress | String | Обязательный  |  IP-адрес плательщика
CardCryptogramPacket | String | Обязательный | [Криптограмма платежных данных](../checkout.md)
Name | String | Необязательный | Имя держателя карты латиницей
PaymentUrl | String | Необязательный | Адрес сайта, с которого совершается вызов скрипта checkout
InvoiceId | String | Необязательный | Номер счета или заказа
Description | String | Необязательный | Описание оплаты в свободной форме
CultureName | String | Необязательный |	Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](26-lokalizatsiya.md))
AccountId | String | Необязательный | Обязательный идентификатор пользователя для создания подписки и получения токена
Email | String | Необязательный | E-mail плательщика, на который будет отправлена квитанция об оплате
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике. Используйте следующие параметры: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для [создания подписки](17-sozdanie-podpiski-na-rekurrentnye-platezhi.md) или формирования [онлайн-чека](../online-kassa.md#формат-передачи-данных-для-онлайн-чека) должны обёртываться в объект `cloudpayments`. Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`. 
SaveCard | bool | Необязательный | Признак сохранения карточного токена для проведения оплаты по сохранённой карте (см. [Оплата по токену (рекарринг)](04-oplata-po-tokenu-rekarring.md)). <br />Возможные значения: `true` - после успешной оплаты будет возвращён карточный токен, `false` - токен не будет возвращаться (по-умолчанию) <br />Параметр SaveCard обрабатывается только при включении настройки "Сохранение токена карты" в Личном Кабинете. При включении настройки "Сохранять принудительно", параметр SaveCard будет игнорироваться.

<aside class="notice">Параметр amount не принимает сумму транзакции меньше 0.01.</aside>

*В ответ сервер возвращает JSON с тремя составляющими*:  

* **поле success** — результат запроса;  
* **поле message** — описание ошибки;  
* **объект model** — расширенная информация. 

*Возможные варианты ответа*:

* Некорректно сформирован запрос:  
		**success** — false  
		**message** — описание ошибки  
* Требуется 3-D Secure аутентификация:  
		**success** — false  
		**model** — информация для проведения аутентификации  
* Транзакция отклонена:  
		**success** — false  
		**model** — информация о транзакции и код ошибки  
* Транзакция принята:  
		**success** — true  
		**model** — информация о транзакции  

<aside class="notice">Результат запроса (поле Success) не отражает статус транзакции, а лишь свидетельствует об успешности/неуспешности запроса API. Статус транзакции отражен в дополнительном поле Status, также его можно узнать в результате получения <a href="../notifications.md">уведомлений</a>. Интерпретацию статусов транзакции смотрите в <a href="../handbook.md#статусы-операций">справочнике</a>.</aside>
		
**Пример запроса на оплату по криптограмме:**

```llvm
{
    "Amount":10,
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "IpAddress": "123.123.123.123",
    "Description":"Оплата товаров в example.com",
    "AccountId":"user_x",
    "Name":"CARDHOLDER NAME", // CardCryptogramPacket Обязательный параметр
    "CardCryptogramPacket":"01492500008719030128SMfLeYdKp5dSQVIiO5l6ZCJiPdel4uDjdFTTz1UnXY+3QaZcNOW8lmXg0H670MclS4lI+qLkujKF4pR5Ri+T/E04Ufq3t5ntMUVLuZ998DLm+OVHV7FxIGR7snckpg47A73v7/y88Q5dxxvVZtDVi0qCcJAiZrgKLyLCqypnMfhjsgCEPF6d4OMzkgNQiynZvKysI2q+xc9cL0+CMmQTUPytnxX52k9qLNZ55cnE8kuLvqSK+TOG7Fz03moGcVvbb9XTg1oTDL4pl9rgkG3XvvTJOwol3JDxL1i6x+VpaRxpLJg0Zd9/9xRJOBMGmwAxo8/xyvGuAj85sxLJL6fA=="
    "Payer":
      { 
        "FirstName":"Тест",
        "LastName":"Тестов",
        "MiddleName":"Тестович",
        "Birth":"1955-02-24",
        "Address":"тестовый проезд дом тест",
        "Street":"Lenina",
        "City":"MO",
        "Country":"RU",
        "Phone":"+71234567890",
        "Postcode":"345"
    }
}
        
```

**Пример ответа:** *некорректный запрос:*

```llvm
{"Success":false,"Message":"Amount is required"}
```

<div id="sample-3ds-required"></div>

**Пример ответа:** *требуется 3-D Secure аутентификация:*

```llvm
{
    "Model": {
        "TransactionId": 891463508,
        "PaReq": "+/eyJNZXJjaGFudE5hbWUiOm51bGwsIkZpcnN0U2l4IjoiNDI0MjQyIiwiTGFzdEZvdXIiOiI0MjQyIiwiQW1vdW50IjoxMDAuMCwiQ3VycmVuY3lDb2RlIjoiUlVCIiwiRGF0ZSI6IjIwMjEtMTAtMjVUMDA6MDA6MDArMDM6MDAiLCJDdXN0b21lck5hbWUiOm51bGwsIkN1bHR1cmVOYW1lIjoicnUtUlUifQ==",
        "GoReq": null,
        "AcsUrl": "https://demo.cloudpayments.ru/acs",
        "ThreeDsSessionData": null,
        "IFrameIsAllowed": true,
        "FrameWidth": null,
        "FrameHeight": null,
        "ThreeDsCallbackId": "7be4d37f0a434c0a8a7fc0e328368d7d",
        "EscrowAccumulationId": null
    },
    "Success": false,
    "Message": null
}
```

<div id="sample-declined"></div>

**Пример ответа:** *транзакция отклонена. В поле ReasonCode код ошибки (см. [справочник](../handbook.md#коды-ошибок)):*

```llvm
{
    "Model": {
        "ReasonCode": 5051,
        "PublicId": "pk_**********************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 891583633,
        "Amount": 10,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 10,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "/Date(1635154784619)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-25T09:39:44",
        "AuthDate": null,
        "AuthDateIso": null,
        "ConfirmDate": null,
        "ConfirmDateIso": null,
        "AuthCode": null,
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "123.123.123.123",
        "IpCountry": "CN",
        "IpCity": "Beijing",
        "IpRegion": "Beijing",
        "IpDistrict": "Beijing",
        "IpLatitude": 39.9289,
        "IpLongitude": 116.3883,
        "CardFirstSix": "400005",
        "CardLastFour": "5556",
        "CardExpDate": "12/25",
        "CardType": "Visa",
        "CardProduct": null,
        "CardCategory": null,
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "US",
        "Issuer": "ITS Bank",
        "CardTypeCode": 0,
        "Status": "Declined",
        "StatusCode": 5,
        "CultureName": "ru",
        "Reason": "InsufficientFunds",
        "CardHolderMessage": "Недостаточно средств на карте",
        "Type": 0,
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": "tk_255c42192323f2e09ea17635302c3",
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "VatAboveTotalFee": 0, //Расчетная сумма по НДС, начисленного на комиссию Системы. Значение заполняется для одностадийных платежей. Параметр передается с 29.04.2026
        "ProcessorAndPartnerFee": null, //Сумма вознаграждения Агента ТСП. Параметр передается с 29.04.2026
        "VatWithinProcessorFee": null //Расчетная сумма НДС с вознаграждения платёжного агента. Параметр передается с 29.04.2026
    },
    "Success": false,
    "Message": null
}
```

<div id="sample-approved"></div>

**Пример ответа:** *транзакция принята:*

```llvm
{
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_********************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 891510444,
        "Amount": 10,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 10,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "/Date(1635150224630)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-25T08:23:44",
        "AuthDate": "/Date(1635150224739)/",
        "AuthDateIso": "2021-10-25T08:23:44",
        "ConfirmDate": null,
        "ConfirmDateIso": null,
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "123.123.123.123",
        "IpCountry": "CN",
        "IpCity": "Beijing",
        "IpRegion": "Beijing",
        "IpDistrict": "Beijing",
        "IpLatitude": 39.9289,
        "IpLongitude": 116.3883,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "11/25",
        "CardType": "Visa",
        "CardProduct": "C",
        "CardCategory": "Visa Signature (Signature)",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "CloudPayments",
        "CardTypeCode": 0,
        "Status": "Authorized",
        "StatusCode": 2,
        "CultureName": "ru",
        "Reason": "Approved",
        "CardHolderMessage": "Оплата успешно проведена",
        "Type": 0,
        "Refunded": false,
        "Name": "CARDHOLDER NAME",
        "Token": "0a0afb77-8f41-4de2-9524-1057f9695303",
        "SubscriptionId": null,
        "GatewayName": "Test",
        "AndroidPay": false,
        "WalletType": "",
        "TotalFee": 0,
        "VatAboveTotalFee": 0, //Расчетная сумма по НДС, начисленного на комиссию Системы. Значение заполняется для одностадийных платежей. Параметр передается с 29.04.2026
        "ProcessorAndPartnerFee": null, //Сумма вознаграждения Агента ТСП. Параметр передается с 29.04.2026
        "VatWithinProcessorFee": null //Расчетная сумма НДС с вознаграждения платёжного агента. Параметр передается с 29.04.2026
    },
    "Success": true,
    "Message": null
}
```



<div id="obrabotka-3-d-secure"></div>
