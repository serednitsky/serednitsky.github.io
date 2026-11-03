---
title: "Оплата по токену (рекарринг)"
keywords:
  - "Оплата по токену (рекарринг)"
  - "Возможные варианты"
---

# Оплата по токену (рекарринг)

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

Метод для оплаты по токену, полученному при [оплате по криптограмме](02-oplata-po-kriptogramme.md), либо через [Pay](../notifications.md#pay)-уведомление.

<aside class="notice">
Оплата по токену проходит только на том терминале (<code>publicId</code>), на котором был получен токен. Если необходимо использовать токены на других терминалах, обратитесь в свободной форме на почту [assistant@cp.ru](mailto:assistant@cp.ru)
</aside>

<aside class="notice">
Финальный статус оплаты по токену СБП (“Завершена”/“Отклонена”) можно получить через <a href="../notifications.md#pay">Pay</a> и <a href="../notifications.md#fail">Fail</a>-уведомления уже после создания транзакции, а не в ответе на сам запрос оплаты по токену.
</aside>

**Адреса метода**:  
https://api.cloudpayments.ru/payments/tokens/charge — для [одностадийного платежа](../general-information.md#схемы-проведения-платежа)  
https://api.cloudpayments.ru/payments/tokens/auth — для [двухстадийного](../general-information.md#схемы-проведения-платежа)

**Параметры запроса:** 

Параметр | Формат | Применение     | Описание
--------- |-------|----------------| ----------- 
Amount | Number | Обязательный   | Cумма платежа в валюте, разделитель точка. Количество не нулевых знаков после точки – 2
Currency | String | Необязательный | Валюта: RUB/USD/EUR/GBP (см. [справочник](../handbook.md#список-валют)). Если параметр не передан, то по умолчанию принимает значение RUB
AccountId | String | Обязательный   | Идентификатор пользователя
TrInitiatorCode | Int   | Обязательный   | Признак инициатора списания денежных средств.<br />Возможные значения:<br />0 - транзакция инициирована ТСП на основе ранее сохраненных учетных данных;<br />1 - транзакция инициирована держателем карты (клиентом) на основе ранее сохраненных учетных данных.<br />**ВАЖНО!** В случае, если транзакция инициирована ТСП, необходимо дополнительно в запросе указать параметр PaymentScheduled с корректным значением.
PaymentScheduled | Int   | Необязательный   | Признак оплаты по расписанию на основе ранее сохраненных учетных данных.<br />Возможные значения:<br />0 - без расписания;<br />1 - по расписанию.<br />**ВАЖНО!** В случае, если при запросе данный параметр не указан, по умолчанию будет использоваться значение 0.
Token | String | Обязательный   | Токен
InvoiceId | String | Необязательный | Номер счета или заказа
Description | String | Необязательный | Назначение платежа в свободной форме
IpAddress | String | Необязательный | IP-адрес плательщика
Email | String | Необязательный |  	E-mail плательщика, на который будет отправлена квитанция об оплате
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике. Используйте следующие параметры: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`
JsonData | Json  | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для [создания подписки](17-sozdanie-podpiski-na-rekurrentnye-platezhi.md) или формирования [онлайн-чека](../online-kassa.md#формат-передачи-данных-для-онлайн-чека) должны обёртываться в объект `cloudpayments`. Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`. 

В ответ сервер возвращает JSON с тремя составляющими: поле **success** — результат запроса, поле **message** — описание ошибки, объект **model** — расширенная информация.

## Возможные варианты

* Некорректно сформирован запрос:  
	**success** — false  
	**message** — описание ошибки
* Транзакции отклонена:  
	**success** — false  
	**model** — информация о транзакции и код ошибки
* Транзакции принята:  
	**success** — true  
	**model** — информация о транзакции  


<aside class="notice">Результат запроса (поле Success) не отражает статус транзакции, а лишь свидетельствует об успешности/неуспешности запроса API. Статус транзакции отражен в дополнительном поле Status, также его можно узнать в результате получения <a href="../notifications.md">уведомлений</a>. Интерпретацию статусов транзакции смотрите в <a href="../handbook.md#статусы-операций">справочнике</a>.</aside>    

**Пример запроса на оплату по токену**:

```llvm
{
    "Amount":59,
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Description":"Оплата товаров в example.com",
    "AccountId":"user_x",
    "TrInitiatorCode": 0,
    "PaymentScheduled": 1,
    "Token":"success_1111a3e0-2428-48fb-a530-12815d90d0e8",
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

**Пример ответа:** *некорректный запрос*

```llvm
{"Success":false,"Message":"Amount is required"}
```

**Пример ответа:** *транзакция отклонена*. В поле ReasonCode код ошибки (см. [справочник](../handbook.md#коды-ошибок))

```llvm
{
    "Model": {
        "ReasonCode": 5051,
        "PublicId": "pk_**********************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 891583633,
        "Amount": 100,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 100,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "TrInitiatorCode": 0,
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

**Пример ответа:** *транзакция принята*

```llvm
 {
    "Model": {
        "ReasonCode": 0,
        "PublicId": "pk_**************************",
        "TerminalUrl": "http://test.test",
        "TransactionId": 897728064,
        "Amount": 59,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 59,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": 1234567,
        "AccountId": "user_x",
        "TrInitiatorCode": 0,
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "/Date(1635562705992)/",
        "PayoutDate": null,
        "PayoutDateIso": null,
        "PayoutAmount": null,
        "CreatedDateIso": "2021-10-30T02:58:25",
        "AuthDate": "/Date(1635562706070)/",
        "AuthDateIso": "2021-10-30T02:58:26",
        "ConfirmDate": "/Date(1635562706070)/",
        "ConfirmDateIso": "2021-10-30T02:58:26",
        "AuthCode": "A1B2C3",
        "TestMode": true,
        "Rrn": null,
        "OriginalTransactionId": null,
        "FallBackScenarioDeclinedTransactionId": null,
        "IpAddress": "87.251.91.164",
        "IpCountry": "RU",
        "IpCity": "Новосибирск",
        "IpRegion": "Новосибирская область",
        "IpDistrict": "Сибирский федеральный округ",
        "IpLatitude": 55.03923,
        "IpLongitude": 82.927818,
        "CardFirstSix": "424242",
        "CardLastFour": "4242",
        "CardExpDate": "12/25",
        "CardType": "Visa",
        "CardProduct": "I",
        "CardCategory": "Visa Infinite Infinite",
        "EscrowAccumulationId": null,
        "IssuerBankCountry": "RU",
        "Issuer": "CloudPayments",
        "CardTypeCode": 0,
        "Status": "Completed",
        "StatusCode": 3,
        "CultureName": "ru-RU",
        "Reason": "Approved",
        "CardHolderMessage": "Оплата успешно проведена",
        "Type": 0,
        "Refunded": false,
        "Name": "SER",
        "Token": "success_1111a3e0-2428-48fb-a530-12815d90d0e8",
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
