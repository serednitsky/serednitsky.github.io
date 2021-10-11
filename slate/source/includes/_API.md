# API

**API** — программный интерфейс системы для взаимодействия с системами ТСП.

Интерфейс работает по адресу [api.cloudpayments.ru](https://api.cloudpayments.ru) и поддерживает функции для выполнения платежа, отмены оплаты, возврата денег, завершения платежей, выполненных по двухстадийной схеме, создания и отмены подписок на рекуррентные платежи, а также отправки счетов по почте.
  
## Принцип работы

* Параметры передаются методом POST в теле запроса в формате «ключ=значение» либо в JSON.
* API может принимать не больше 150 000 полей в одном запросе. Тайм-аут на получение ответа от API — 5 минут.
* Во всех запросах к API если передать число с дробной частью в целочисленное поле, то ошибки не будет, зато произойдёт математическое округление.
* API ограничивает максимальное количество одновременных запросов для тестовых терминалов до 5, для боевых до 30. Если количество обрабатываемых в данный момент запросов к сайту больше ограничения - API будет возвращать ответ с HTTP кодом 429 (Too many Requests) до момента пока не будет завершена обработка хотя бы одного запроса. При необходимости пересмотра ограничений - обратитесь к персональному менеджеру.

Выбор формата передачи параметров определяется на стороне клиента и управляется через заголовок запроса <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17" target="_blank"> Content-Type</a>. 

* Для параметров **«ключ=значение»** Content-Type: *application/x-www-form-urlencoded*;   
* Для параметров **JSON Content-Type**: *application/json*; 

Ответ система выдает в JSON-формате, который как минимум включает в себя два параметра: **Success** и **Message**:

```llvm
{ "Success": false, "Message": "Invalid Amount value" }
```

## Аутентификация запросов

Для аутентификации запроса используется <a href="https://en.wikipedia.org/wiki/Basic_access_authentication" target="_blank">HTTP Basic Auth</a> — отправка логина и пароля в заголовке HTTP-запроса. В качестве логина используется **Public ID**, в качестве пароля — **API Secret**. Оба этих значения можно получить в личном кабинете.

<aside class="warning">Если в запросе не передан заголовок с данными аутентификации или переданы неверные данные, система вернет HTTP-статус 401 – Unauthorized.</aside>

<aside class="notice">API secret используется для обеспечения безопасности. Он должен храниться в защищенном месте.</aside>

## Идемпотентность API

**Идемпотентность** — свойство API при повторном запросе выдавать тот же результат, что на первичный запрос без повторной обработки. Это значит, что вы можете отправить несколько запросов к системе с одинаковым идентификатором, при этом обработан будет только один запрос, а все ответы будут идентичными. Таким образом реализуется защита от сетевых ошибок, которые приводят к созданию дублированных записей и действий.  
Для включения идемпотентности необходимо в запросе к API передавать заголовок с ключом **X-Request-ID**, содержащий уникальный идентификатор. Формирование идентификатора запроса остается на вашей стороне — это может быть guid, комбинация из номера заказа, даты и суммы или любое другое значение на ваше усмотрение.  
Каждый новый запрос, который необходимо обработать, должен включать новое значение **X-Request-ID**. Обработанный результат хранится в системе в течение 1 часа.  


## Тестовый метод

Для проверки взаимодействия с API можно вызвать тестовый метод.  

**Адрес метода:**  
https://api.cloudpayments.ru/test

**Параметры запроса:**  
Отсутствуют.  
 


**Пример ответа:**  
В ответ метод возвращает статус запроса.

```llvm
{"Success":true,"Message":"bd6353c3-0ed6-4a65-946f-083664bf8dbd"}
```

## Оплата по криптограмме

Метод для оплаты по криптограмме платежных данных результат алгоритма шифрования. Для формирования криптограммы воспользуйтесь скриптом [Checkout](#skript-checkout), [Apple Pay](#apple-pay) или [Google Pay](#google-pay).

**Адреса метода**:  
https://api.cloudpayments.ru/payments/cards/charge — для [одностадийного платежа](#shemy-provedeniya-platezha)  
https://api.cloudpayments.ru/payments/cards/auth — для [двухстадийного](#shemy-provedeniya-platezha)  

**Параметры запроса:** 


Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Amount | Numeric | Обязательный | Сумма платежа 
Currency | String | Необязательный | Валюта: RUB/USD/EUR/GBP ([см. справочник](#spisok-valyut)). Если параметр не передан, то по умолчанию принимает значение RUB
IpAddress | String | Обязательный  |  IP-адрес плательщика
Name | String | Обязательный для всех платежей, кроме Apple Pay и Google Pay | Имя держателя карты латиницей
CardCryptogramPacket | String | Обязательный | [Криптограмма платежных данных](#skript-checkout)
PaymentUrl | String | Необязательный | Адрес сайта, с которого совершается вызов скрипта checkout
InvoiceId | String | Необязательный | Номер счета или заказа
Description | String | Необязательный | Описание оплаты в свободной форме
CultureName | String | Необязательный |	Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](#lokalizatsiya))
AccountId | String | Необязательный | Обязательный идентификатор пользователя для создания подписки и получения токена
Email | String | Необязательный | E-mail плательщика, на который будет отправлена квитанция об оплате
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике. Используйте следующие параметры: `FirstName`, `LastName`, `MiddleName`, `Birth`, `Street`, `Address`, `City`, `Country`, `Phone`, `Postcode`
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для [создания подписки](#rekurrentnye-platezhi-podpiska) или формирования [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka). Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`.

<aside class="notice">Параметр amount не принимает сумму транзакции меньше 0.01.</aside>

*В ответ сервер возвращает JSON с тремя составляющими*:  

* **поле success** — результат запроса;  
* **поле message** — описание ошибки;  
* **объект model** — расширенная информация. 

*Возможные варианты ответа*:

* Некорректно сформирован запрос:  
		**success** — false  
		**message** — описание ошибки  
* Требуется 3-D Secure аутентификация (неприменимо для Apple Pay):  
		**success** — false  
		**model** — информация для проведения аутентификации  
* Транзакция отклонена:  
		**success** — false  
		**model** — информация о транзакции и код ошибки  
* Транзакция принята:  
		**success** — true  
		**model** — информация о транзакции  
		
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
        "Phone":"123",
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
        "TransactionId": 504,
        "PaReq": "eJxVUdtugkAQ/RXDe9mLgo0Z1nhpU9PQasWmPhLYAKksuEChfn13uVR9mGTO7MzZM2dg3qSn0Q+X\nRZIJxyAmNkZcBFmYiMgxDt7zw6MxZ+DFkvP1ngeV5AxcXhR+xEdJ6BhpEZnEYLBdfPAzg56JKSKT\nAhqgGpFB7IuSgR+cl5s3NqFTG2NAPYSUy82aETqeWPYUUAdB+ClnwSmrwtz/TbkoC0BtDYKsEqX8\nZfZkDGgAUMkTi8synyFU17V5N2nKCpBuAHRVs610VijCJgmZu17UXTxhFWP34l7evYPlegsHkO6A\n0C85o5hMsI3piNIZHc+IBaitg59qJYzgdrUOQK7/WNy+3FZAeSqV5cMqAwLe5JlQwpny8T8HdFW8\netFuBqUyahV+Hjf27vWCaSx22fe+KY6kXKZfJLK1x22TZkyUS8QiHaUGgDQN6s+H+tOq7O7kf8hd\nt30=",
        "AcsUrl": "https://test.paymentgate.ru/acs/auth/start.do"
    },
    "Success": false,
    "Message": null
}
```

<div id="sample-declined"></div>

**Пример ответа:** *транзакция отклонена. В поле ReasonCode код ошибки (см. [справочник](#kody-oshibok)):*

```llvm
{
    "Model": {
        "TransactionId": 504,
        "Amount": 10.00000,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "PaymentAmount": 10.00000,
        "PaymentCurrency": "RUB",
        "PaymentCurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "\/Date(1401718880000)\/",
        "CreatedDateIso":"2014-08-09T11:49:41", //все даты в UTC
        "TestMode": true,
        "IpAddress": "195.91.194.13",
        "IpCountry": "RU",
        "IpCity": "Уфа",
        "IpRegion": "Республика Башкортостан",
        "IpDistrict": "Приволжский федеральный округ",
        "IpLatitude": 54.7355,
        "IpLongitude": 55.991982,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "05/19",
        "CardType": "Visa",
        "CardTypeCode": 0,
        "Issuer": "Sberbank of Russia",
        "IssuerBankCountry": "RU",
        "Status": "Declined",
        "StatusCode": 5,
        "Reason": "InsufficientFunds", // причина отказа
        "ReasonCode": 5051, //код отказа
        "CardHolderMessage":"Недостаточно средств на карте", //сообщение для покупателя
        "Name": "CARDHOLDER NAME",
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
        "TransactionId": 504,
        "Amount": 10.00000,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "\/Date(1401718880000)\/",
        "CreatedDateIso":"2014-08-09T11:49:41", //все даты в UTC
        "AuthDate": "\/Date(1401733880523)\/",
        "AuthDateIso":"2014-08-09T11:49:42",
        "ConfirmDate": "\/Date(1401733880523)\/",
        "ConfirmDateIso":"2014-08-09T11:49:42",
        "AuthCode": "123456",
        "TestMode": true,
        "IpAddress": "195.91.194.13",
        "IpCountry": "RU",
        "IpCity": "Уфа",
        "IpRegion": "Республика Башкортостан",
        "IpDistrict": "Приволжский федеральный округ",
        "IpLatitude": 54.7355,
        "IpLongitude": 55.991982,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "05/19",
        "CardType": "Visa",
        "CardTypeCode": 0,
        "Issuer": "Sberbank of Russia",
        "IssuerBankCountry": "RU",
        "Status": "Completed",
        "StatusCode": 3,
        "Reason": "Approved",
        "ReasonCode": 0,
        "CardHolderMessage":"Оплата успешно проведена", //сообщение для покупателя
        "Name": "CARDHOLDER NAME",
        "Token": "a4e67841-abb0-42de-a364-d1d8f9f4b3c0"
    },
    "Success": true,
    "Message": null
}
```



<div id="obrabotka-3-d-secure"></div>

## Обработка 3-D Secure

Для проведения [3-D Secure аутентификации](#3-d-secure) нужно отправить плательщика на адрес, указанный в параметре **AcsUrl** [ответа сервера](#sample-3ds-required) с передачей следующих параметров:

* **MD** — параметр TransactionId из ответа сервера;
* **PaReq** — одноименный параметр из ответа сервера;
* **TermUrl** — адрес на вашем сайте для возврата плательщика после аутентификации.

<aside class="notice">Регистр букв в названии параметров имеет значение.</aside>

### Пример формы:

```shell
<form name="downloadForm" action="AcsUrl" method="POST">
    <input type="hidden" name="PaReq" value="eJxVUdtugkAQ/RXDe9mLgo0Z1nhpU9PQasWmPhLYAKksuEChfn13uVR9mGTO7MzZM2dg3qSn0Q+X\nRZIJxyAmNkZcBFmYiMgxDt7zw6MxZ+DFkvP1ngeV5AxcXhR+xEdJ6BhpEZnEYLBdfPAzg56JKSKT\nAhqgGpFB7IuSgR+cl5s3NqFTG2NAPYSUy82aETqeWPYUUAdB+ClnwSmrwtz/TbkoC0BtDYKsEqX8\nZfZkDGgAUMkTi8synyFU17V5N2nKCpBuAHRVs610VijCJgmZu17UXTxhFWP34l7evYPlegsHkO6A\n0C85o5hMsI3piNIZHc+IBaitg59qJYzgdrUOQK7/WNy+3FZAeSqV5cMqAwLe5JlQwpny8T8HdFW8\netFuBqUyahV+Hjf27vWCaSx22fe+KY6kXKZfJLK1x22TZkyUS8QiHaUGgDQN6s+H+tOq7O7kf8hd\nt30=">
    <input type="hidden" name="MD" value="504">
    <input type="hidden" name="TermUrl" value="https://example.com/post3ds?order=1234567">
</form>
<script>
    window.onload = submitForm;
    function submitForm() { downloadForm.submit(); }
</script>
```

<aside class="notice">После аутентификации плательщик будет возвращен на TermUrl с параметрами MD и PaRes, переданными методом POST.</aside>


</br>

Для завершения оплаты выполните следующий метод Post3ds.

**Адрес метода:**   
https://api.cloudpayments.ru/payments/cards/post3ds  

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Int | Обязательный | Значение параметра MD
PaRes | String | Обязательный | Значение одноименного параметра

В ответ на корректно сформированный запрос сервер вернет либо информацию об [успешной транзакции](#sample-approved), либо — [об отклоненной](#sample-declined).

## Оплата по токену (рекарринг)
Метод для оплаты по токену, полученному при [оплате по криптограмме](#oplata-po-kriptogramme), либо через [Pay](#pay)-уведомление.

**Адреса метода**:  
https://api.cloudpayments.ru/payments/tokens/charge — для [одностадийного платежа](#shemy-provedeniya-platezha)  
https://api.cloudpayments.ru/payments/tokens/auth — для [двухстадийного](#shemy-provedeniya-platezha)

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Amount | Numeric | Обязательный | Сумма платежа
Currency | String | Необязательный | Валюта: RUB/USD/EUR/GBP (см. [справочник](#spisok-valyut)). Если параметр не передан, то по умолчанию принимает значение RUB
AccountId | String | Обязательный | Идентификатор пользователя
Token | String | Обязательный | Токен
InvoiceId | String | Необязательный | Номер счета или заказа
Description | String | Необязательный | Назначение платежа в свободной форме
IpAddress | String | Необязательный | IP-адрес плательщика
Email | String | Необязательный |  	E-mail плательщика, на который будет отправлена квитанция об оплате
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для [создания подписки](#rekurrentnye-platezhi-podpiska) или формирования [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka). Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`.

В ответ сервер возвращает JSON с тремя составляющими: поле **success** — результат запроса, поле **message** — описание ошибки, объект **model** — расширенная информация.

### Возможные варианты

* Некорректно сформирован запрос:  
	**success** — false  
	**message** — описание ошибки
* Транзакции отклонена:  
	**success** — false  
	**model** — информация о транзакции и код ошибки
* Транзакции принята:  
	**success** — true  
	**model** — информация о транзакции

**Пример запроса на оплату по токену**:

```llvm
{
    "Amount":10,
    "Currency":"RUB",
    "InvoiceId":"1234567",
    "Description":"Оплата товаров в example.com",
    "AccountId":"user_x",
    "Token":"a4e67841-abb0-42de-a364-d1d8f9f4b3c0"
}
```

**Пример ответа:** *некорректный запрос*

```llvm
{"Success":false,"Message":"Amount is required"}
```

**Пример ответа:** *транзакция отклонена*. В поле ReasonCode код ошибки (см. [справочник](#kody-oshibok))

```llvm
{
    "Model": {
        "TransactionId": 504,
        "Amount": 10.00000,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "\/Date(1401718880000)\/",
        "CreatedDateIso":"2014-08-09T11:49:41", //все даты в UTC
        "TestMode": true,
        "IpAddress": "195.91.194.13",
        "IpCountry": "RU",
        "IpCity": "Уфа",
        "IpRegion": "Республика Башкортостан",
        "IpDistrict": "Приволжский федеральный округ",
        "IpLatitude": 54.7355,
        "IpLongitude": 55.991982,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardType": "Visa",
        "CardTypeCode": 0,
        "Issuer": "Sberbank of Russia",
        "IssuerBankCountry": "RU",
        "Status": "Declined",
        "StatusCode": 5,
        "Reason": "InsufficientFunds", //причина отказа
        "ReasonCode": 5051,
        "CardHolderMessage":"Недостаточно средств на карте", //сообщение для покупателя
        "Name": "CARDHOLDER NAME",
    },
    "Success": false,
    "Message": null
}
```

**Пример ответа:** *транзакция принята*

```llvm
{
    "Model": {
        "TransactionId": 504,
        "Amount": 10.00000,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "\/Date(1401718880000)\/",
        "CreatedDateIso":"2014-08-09T11:49:41",  //все даты в UTC
        "AuthDate": "\/Date(1401733880523)\/",
        "AuthDateIso":"2014-08-09T11:49:42",
        "ConfirmDate": "\/Date(1401733880523)\/",
        "ConfirmDateIso":"2014-08-09T11:49:42",
        "AuthCode": "123456",
        "TestMode": true,
        "IpAddress": "195.91.194.13",
        "IpCountry": "RU",
        "IpCity": "Уфа",
        "IpRegion": "Республика Башкортостан",
        "IpDistrict": "Приволжский федеральный округ",
        "IpLatitude": 54.7355,
        "IpLongitude": 55.991982,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardType": "Visa",
        "CardTypeCode": 0,
        "Issuer": "Sberbank of Russia",
        "IssuerBankCountry": "RU",
        "Status": "Completed",
        "StatusCode": 3,
        "Reason": "Approved",
        "ReasonCode": 0,
        "CardHolderMessage":"Оплата успешно проведена", //сообщение для покупателя
        "Name": "CARDHOLDER NAME",
        "Token": "a4e67841-abb0-42de-a364-d1d8f9f4b3c0"
    },
    "Success": true,
    "Message": null
}
```

## Подтверждение оплаты

Для платежей, проведенных по [двухстадийной схеме](#shemy-provedeniya-platezha), необходимо подтверждение оплаты, которое можно выполнить через личный кабинет, либо через вызов метода API.

**Адрес метода:**   
https://api.cloudpayments.ru/payments/confirm

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Int | Обязательный | Номер транзакции в системе
Amount | Numeric | Обязательный | Сумма подтверждения в валюте транзакции
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для формирования [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka)

**Пример запроса:**

```llvm
{"TransactionId":455,"Amount":65.98}
```

**Пример ответа:**

```llvm
{"Success":true,"Message":null}
```

## Отмена оплаты

Отмену оплаты можно выполнить через личный кабинет либо через вызов метода API.  

**Адрес метода:**    
https://api.cloudpayments.ru/payments/void  

**Параметры запроса:**

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Int |  	Обязательный | Номер транзакции в системе

**Пример запроса:**

```llvm
{"TransactionId":455}
```

**Пример ответа:**

```llvm
{"Success":true,"Message":null}
```

В случае, если был использован метод отмены (void) до истечения 24 часов с момента совершения операции авторизации на сумму 10 рублей или меньше, система автоматически сообщит об ошибке.

**Пример ответа:**

```llvm
{"Success":false, "Message": "Должно пройти больше 24 часов для отмены транзакции на 10 рублей либо меньше."}
```
## Возврат денег

Возврат денег можно выполнить через личный кабинет или через вызов метода API.   
 
**Адрес метода:**    
https://api.cloudpayments.ru/payments/refund  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Int |  	Обязательный | Номер транзакции оплаты
Amount | Numeric | Обязательный | Сумма возврата в валюте транзакции
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для формирования [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka)

**Пример запроса:**

```llvm
{"TransactionId":455, "Amount": 100}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "TransactionId": 568
    },
    "Success": true,
    "Message": null
}
```

<aside class="notice">Возвраты по транзакциям старше года не проводятся.</aside>

## Выплата по криптограмме

Выплату по криптограмме можно осуществить через вызов метода API.  
  
**Адрес метода:**  
https://api.cloudpayments.ru/payments/cards/topup

**Параметры запроса:**

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Name | String | Обязательный | Имя держателя карты латиницей
CardCryptogramPacket | String | Обязательный | Криптограмма платежных данных
Amount | Numeric | Обязательный | Сумма платежа
AccountId | String | Обязательный | Идентификатор пользователя
Email | String | Необязательный | E-mail плательщика, на который будет отправлена квитанция об оплате
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией. Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: `name`, `firstName`, `middleName`, `lastName`, `nick`, `phone`, `address`, `comment`, `birthDate`.
Currency | String | Обязательный | Валюта: RUB
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
        "Phone":"123",
        "Postcode":"345"
    }
}
```

**Пример ответа:**

```llvm
{
   "Model":{
      "PublicId":"pk_b9b86395c99782f0d16386d83e5d8",
      "TransactionId":100551,
      "Amount":1,
      "Currency":"RUB",
      "PaymentAmount":1,
      "PaymentCurrency":"RUB",
      "AccountId":"user@example.com",
      "Email":null,
      "Description":null,
      "JsonData":null,
      "CreatedDate":"/Date(1517943890884)/",
      "PayoutDate":"/Date(1517950800000)/",
      "PayoutDateIso":"2018-02-07T00:00:00",
      "PayoutAmount":1,
      "CreatedDateIso":"2018-02-06T19:04:50",
      "AuthDate":"/Date(1517943899268)/",
      "AuthDateIso":"2018-02-06T19:04:59",
      "ConfirmDate":"/Date(1517943899268)/",
      "ConfirmDateIso":"2018-02-06T19:04:59",
      "AuthCode":"031365",
      "TestMode":false,
      "Rrn":"568879820",
      "OriginalTransactionId":null,
      "IpAddress":"185.8.6.164",
      "IpCountry":"RU",
      "IpCity":"Москва",
      "IpRegion":null,
      "IpDistrict":"Москва",
      "IpLatitude":55.75222,
      "IpLongitude":37.61556,
      "CardFirstSix":"411111",
      "CardLastFour":"1111",
      "CardExpDate":"12/22",
      "CardType":"Visa",
      "CardTypeCode":0,
      "Status":"Completed",
      "StatusCode":3,
      "CultureName":"ru",
      "Reason":"Approved",
      "ReasonCode":0,
      "CardHolderMessage":"Оплата успешно проведена",
      "Type":2,
      "Refunded":false,
      "Name":"WQER",
      "SubscriptionId":null,
      "GatewayName":"Tinkoff Payout"
   },
   "Success":true,
   "Message":null
}
```

<aside class="notice">Можно воспользоваться механизмом надежной аутентификации запроса на выплату. Для этого передайте в нашу поддержку сертификат с публичной частью ключа. Далее сгенерируйте подпись на основе тела запроса и разместите ее в заголовке X-Signature в base64 формате. CloudPayments проверит вашу подпись, используя CryptoService. Если подпись валидна, то обработка запроса продолжится, если нет — обработка прекратится.</aside>

##  Выплата по токену

Выплату по токену можно осуществить через вызов метода API.

**Адрес метода:**  
https://api.cloudpayments.ru/payments/token/topup  

**Параметры запроса:**

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Token | String | Обязательный |	Токен карты, выданный системой после первого платежа
Amount | Numeric | Обязательный | Сумма платежа
AccountId |	String | Обязательный | Идентификатор пользователя
Currency | String |	Обязательный | Валюта: RUB
InvoiceId |	String | Необязательный | Номер заказа в вашей системе
Payer | Object | Необязательный | Доп. поле, куда передается информация о плательщике
Receiver | Object | Необязательный | Доп. поле, куда передается информация о получателе

<aside class="notice">Для выплат на иностранные карты понадобится параметр Payer или Receiver в зависимости от терминала.</aside>

**Пример запроса:**

```llvm
{
    "Token":"a4e67841-abb0-42de-a364-d1d8f9f4b3c0",
    "Amount":1,
    "AccountId":"user@example.com",
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
        "Phone":"123",
        "Postcode":"345"
    }
}
```

**Пример ответа:**

```llvm
{
   "Model":{
      "PublicId":"pk_b9b86395c99782f0d16386d83e5d8",
      "TransactionId":100551,
      "Amount":1,
      "Currency":"RUB",
      "PaymentAmount":1,
      "PaymentCurrency":"RUB",
      "AccountId":"user@example.com",
      "Email":null,
      "Description":null,
      "JsonData":null,
      "CreatedDate":"/Date(1517943890884)/",
      "PayoutDate":"/Date(1517950800000)/",
      "PayoutDateIso":"2018-02-07T00:00:00",
      "PayoutAmount":1,
      "CreatedDateIso":"2018-02-06T19:04:50",
      "AuthDate":"/Date(1517943899268)/",
      "AuthDateIso":"2018-02-06T19:04:59",
      "ConfirmDate":"/Date(1517943899268)/",
      "ConfirmDateIso":"2018-02-06T19:04:59",
      "AuthCode":"031365",
      "TestMode":false,
      "Rrn":"568879820",
      "OriginalTransactionId":null,
      "IpAddress":"185.8.6.164",
      "IpCountry":"RU",
      "IpCity":"Москва",
      "IpRegion":null,
      "IpDistrict":"Москва",
      "IpLatitude":55.75222,
      "IpLongitude":37.61556,
      "CardFirstSix":"411111",
      "CardLastFour":"1111",
      "CardExpDate":"12/22",
      "CardType":"Visa",
      "CardTypeCode":0,
      "Status":"Completed",
      "StatusCode":3,
      "CultureName":"ru",
      "Reason":"Approved",
      "ReasonCode":0,
      "CardHolderMessage":"Оплата успешно проведена",
      "Type":2,
      "Refunded":false,
      "Name":"WQER",
      "SubscriptionId":null,
      "GatewayName":"Tinkoff Payout"
   },
   "Success":true,
   "Message":null
}
```

<aside class="notice">Можно воспользоваться механизмом надежной аутентификации запроса на выплату. Для этого передайте в нашу поддержку сертификат с публичной частью ключа. Далее сгенерируйте подпись на основе тела запроса и разместите ее в заголовке X-Signature в base64 формате. CloudPayments проверит вашу подпись, используя CryptoService. Если подпись валидна, то обработка запроса продолжится, если нет — обработка прекратится.</aside>

## Просмотр транзакции

Метод получения детализации по транзакции.

**Адрес метода:**  
https://api.cloudpayments.ru/payments/get

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Int | Обязательный | Номер транзакции

Если транзакция с указанным номером была найдена, система отобразит информацию о ней.

**Пример запроса:**

```llvm
{"TransactionId":504}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "TransactionId": 504,
        "Amount": 10.00000,
        "Currency": "RUB",
        "CurrencyCode": 0,
        "InvoiceId": "1234567",
        "AccountId": "user_x",
        "Email": null,
        "Description": "Оплата товаров в example.com",
        "JsonData": null,
        "CreatedDate": "\/Date(1401718880000)\/",
        "CreatedDateIso":"2014-08-09T11:49:41", //все даты в указанной временной зоне
        "AuthDate": "\/Date(1401733880523)\/",
        "AuthDateIso":"2014-08-09T11:49:42",
        "ConfirmDate": "\/Date(1401733880523)\/",
        "ConfirmDateIso":"2014-08-09T11:49:42",
        "PayoutDate": "\/Date(1401733880523)\/", //дата возмещения
        "PayoutDateIso":"2014-08-09T11:49:42",
        "PayoutAmount": 99.61, //сумма возмещения
        "TestMode": true,
        "IpAddress": "195.91.194.13",
        "IpCountry": "RU",
        "IpCity": "Уфа",
        "IpRegion": "Республика Башкортостан",
        "IpDistrict": "Приволжский федеральный округ",
        "IpLatitude": 54.7355,
        "IpLongitude": 55.991982,
        "CardFirstSix": "411111",
        "CardLastFour": "1111",
        "CardExpDate": "05/19",
        "CardType": "Visa",
        "CardTypeCode": 0,
        "Issuer": "Sberbank of Russia",
        "IssuerBankCountry": "RU",
        "Status": "Completed",
        "StatusCode": 3,
        "Reason": "Approved",
        "ReasonCode": 0,
        "CardHolderMessage":"Оплата успешно проведена", //сообщение для покупателя
        "Name": "CARDHOLDER NAME",
    },
    "Success": true,
    "Message": null
}
```

## Проверка статуса платежа

Метод поиска платежа и проверки статуса (см. [справочник](#statusy-operatsiy)).  

**Адрес старого метода:**  
https://api.cloudpayments.ru/payments/find

**Адрес нового метода:**  
https://api.cloudpayments.ru/v2/payments/find

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
InvoiceId | String | Обязательный | Номер заказа

Если платеж по указанному номеру заказа был найден, система отобразит либо информацию об [успешной транзакции](#sample-approved), либо — [об отклоненной](#sample-declined). Если будет найдено несколько платежей с указанным номером заказа, то система вернет информацию только о последней операции. Отличие нового метода в том, что он ищет по всем платежам, включая возвраты и выплаты на карту.

**Пример запроса:**

```llvm
{"InvoiceId":"123456789"}
```

**Пример ответа:**

```llvm
{"Success":false,"Message":"Not found"}
```

<aside class="notice">Проверка статуса платежа является избыточной и имеет смысл только в случае, если при проведении оплаты возник сбой, который привел к потере информации.</aside>

## Выгрузка списка транзакций

Метод выгрузки списка транзакций за день. 

**Адрес метода:**  
https://api.cloudpayments.ru/payments/list

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Date | Date | Обязательный | Дата создания операций
TimeZone | String | Необязательный | Код временной зоны, по умолчанию — UTC

В выгрузку транзакций попадают все операции, зарегистрированные за указанный день. Для удобства учета вы можете указать код временной зоны ([см. справочник](#kody-vremennyh-zon)).

**Пример запроса:**

```llvm
{"Date":"2014-08-09", "TimeZone": "MSK"}
```

**Пример ответа:**

```llvm
{
   "Model":[
      {
         "PublicId":"test_api_00000000000000000000001",
         "TerminalUrl":"https://cloudpayments.ru",
         "TransactionId":54,
         "Amount":12.34,
         "Currency":"RUB",
         "CurrencyCode":0,
         "PaymentAmount":12.34,
         "PaymentCurrency":"RUB",
         "PaymentCurrencyCode":0,
         "InvoiceId":"1234567",
         "AccountId":"User@Example.com",
         "Email":null,
         "Description":"Оплата товаров в example.com",
         "JsonData":"{\"some\": \"value\"}",
         "CreatedDate":"\/Date(1615288374632)\/",
         "PayoutDate":null,
         "PayoutDateIso":null,
         "PayoutAmount":null,
         "CreatedDateIso":"2021-03-09T11:12:54",
         "AuthDate":null,
         "AuthDateIso":null,
         "ConfirmDate":null,
         "ConfirmDateIso":null,
         "AuthCode":null,
         "TestMode":true,
         "Rrn":null,
         "OriginalTransactionId":null,
         "FallBackScenarioDeclinedTransactionId":null,
         "IpAddress":"127.0.0.1",
         "IpCountry":"",
         "IpCity":null,
         "IpRegion":null,
         "IpDistrict":null,
         "IpLatitude":null,
         "IpLongitude":null,
         "CardFirstSix":"424242",
         "CardLastFour":"4242",
         "CardExpDate":"05/22",
         "CardType":"Visa",
         "CardProduct":null,
         "CardCategory":null,
         "IssuerBankCountry":"FF",
         "Issuer":null,
         "CardTypeCode":0,
         "Status":"Declined",
         "StatusCode":5,
         "CultureName":"ru",
         "Reason":"SystemError",
         "CardHolderMessage":"Повторите попытку позже",
         "Type":0,
         "Refunded":false,
         "Name":"CARD HOLDER",
         "Token":null,
         "SubscriptionId":null,
         "IsLocalOrder":false,
         "HideInvoiceId":false,
         "Gateway":0,
         "GatewayName":"Test",
         "ApplePay":false,
         "AndroidPay":false,
         "MasterPass":false,
         "TotalFee":0,
         "EscrowAccumulationId":null,
         "ReasonCode":5096
      }
   ],
   "Success":true,
   "Message":null
}
```

## Выгрузка токенов

Метод выгрузки списка всех платежных токенов CloudPayments. 
 
**Адрес метода:**  
https://api.cloudpayments.ru/payments/tokens/list

**Параметры запроса:**  
Отсутствуют.  
 

**Пример ответа:**

```llvm
{
    "Model": [
        {
            "Token": "tk_020a924486aa4df254331afa33f2a",
            "AccountId": "user_x",
            "CardMask": "4242 42****** 4242",
            "ExpirationDateMonth": 12,
            "ExpirationDateYear": 2020
        },
        {
            "Token": "tk_1a9f2f10253a30a7c5692a3fc4c17",
            "AccountId": "user_x",
            "CardMask": "5555 55****** 4444",
            "ExpirationDateMonth": 12,
            "ExpirationDateYear": 2021
        },
        {
            "Token": "tk_b91062f0f2875909233ab66d0fc7b",
            "AccountId": "user_x",
            "CardMask": "4012 88****** 1881",
            "ExpirationDateMonth": 12,
            "ExpirationDateYear": 2022
        }
    ],
    "Success": true,
    "Message": null
}
```

## Создание подписки на рекуррентные платежи

Метод создания подписки  на рекуррентные платежи.  

**Адрес метода:**  
https://api.cloudpayments.ru/subscriptions/create   
 
**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Token |	String | Обязательный |	Токен карты, выданный системой после первого платежа
AccountId |	String | Обязательный | Идентификатор пользователя
Description | String | Обязательный | Назначение платежа в свободной форме
Email |	String | Обязательный |	E-mail плательщика
Amount | Numeric | Обязательный | Сумма платежа. Должен быть больше 0
Currency | String |	Обязательный | Валюта: RUB/USD/EUR/GBP (см. [справочник](#spisok-valyut))
RequireConfirmation | Bool | Обязательный | Если значение true — платежи будут выполняться по двухстадийной схеме
StartDate |	DateTime | Обязательный | Дата и время первого платежа по плану во временной зоне UTC. Значение должно быть в будущем
Interval | String |	Обязательный | Интервал. Возможные значения: Day, Week, Month
Period | Int | Обязательный | Период. В комбинации с интервалом, 1 Month значит раз в месяц, а 2 Week — раз в две недели. Должен быть больше 0
MaxPeriods | Int | Необязательный |	Максимальное количество платежей в подписке. Если указан, должен быть больше 0
CustomerReceipt |	json |	Необязательный |	Для изменения состава [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka) 

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции и идентификатор подписки.

**Пример запроса:**

```llvm
{  
   "token":"477BBA133C182267FE5F086924ABDC5DB71F77BFC27F01F2843F2CDC69D89F05",
   "accountId":"user@example.com",
   "description":"Ежемесячная подписка на сервис example.com",
   "email":"user@example.com",
   "amount":1.02,
   "currency":"RUB",
   "requireConfirmation":false,
   "startDate":"2014-08-06T16:46:29.5377246Z",
   "interval":"Month",
   "period":1
}
```

**Пример ответа:**

```llvm
{
   "Model":{
      "Id":"sc_8cf8a9338fb8ebf7202b08d09c938", //идентификатор подписки
      "AccountId":"user@example.com",
      "Description":"Ежемесячная подписка на сервис example.com",
      "Email":"user@example.com",
      "Amount":1.02,
      "CurrencyCode":0,
      "Currency":"RUB",
      "RequireConfirmation":false, //true для двухстадийных платежей
      "StartDate":"\/Date(1407343589537)\/",
      "StartDateIso":"2014-08-09T11:49:41", //все даты в UTC
      "IntervalCode":1,
      "Interval":"Month",
      "Period":1,
      "MaxPeriods":null,
      "StatusCode":0,
      "Status":"Active",
      "SuccessfulTransactionsNumber":0,
      "FailedTransactionsNumber":0,
      "LastTransactionDate":null,
      "LastTransactionDateIso":null, 
      "NextTransactionDate":"\/Date(1407343589537)\/"
      "NextTransactionDateIso":"2014-08-09T11:49:41"
   },
   "Success":true
}
```

## Запрос информации о подписке

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
   "Model":{
      "Id":"sc_8cf8a9338fb8ebf7202b08d09c938", //идентификатор подписки
      "AccountId":"user@example.com",
      "Description":"Ежемесячная подписка на сервис example.com",
      "Email":"user@example.com",
      "Amount":1.02,
      "CurrencyCode":0,
      "Currency":"RUB",
      "RequireConfirmation":false, //true для двухстадийных платежей
      "StartDate":"\/Date(1407343589537)\/",
      "StartDateIso":"2014-08-09T11:49:41", //все даты в UTC
      "IntervalCode":1,
      "Interval":"Month",
      "Period":1,
      "MaxPeriods":null,
      "StatusCode":0,
      "Status":"Active",
      "SuccessfulTransactionsNumber":0,
      "FailedTransactionsNumber":0,
      "LastTransactionDate":null,
      "LastTransactionDateIso":null, 
      "NextTransactionDate":"\/Date(1407343589537)\/"
      "NextTransactionDateIso":"2014-08-09T11:49:41"
   },
   "Success":true
}
```

## Поиск подписок

Метод получения списка подписок для определенного аккаунта.    

**Адрес метода:**  
https://api.cloudpayments.ru/subscriptions/find

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
accountId | String | Обязательный | Идентификатор подписки

**Пример запроса:**

```llvm
{"accountId":"user@example.com"}
```

**Пример ответа:**

```llvm
{
  "Model": [
    {
      "Id": "sc_4bae8f5823bb8cdc966ccd1590a3b",
      "AccountId": "user@example.com",
      "Description": "Подписка на сервис",
      "Email": "user@example.com",
      "Amount": 1.02,
      "CurrencyCode": 0,
      "Currency": "RUB",
      "RequireConfirmation": false,
      "StartDate": "/Date(1473665268000)/",
      "StartDateIso": "2016-09-12T15:27:48",
      "IntervalCode": 1,
      "Interval": "Month",
      "Period": 1,
      "MaxPeriods": null,
      "CultureName": "ru",
      "StatusCode": 0,
      "Status": "Active",
      "SuccessfulTransactionsNumber": 0,
      "FailedTransactionsNumber": 0,
      "LastTransactionDate": null,
      "LastTransactionDateIso": null,
      "NextTransactionDate": "/Date(1473665268000)/",
      "NextTransactionDateIso": "2016-09-12T15:27:48"
    },
    {
      "Id": "sc_b4bdedba0e2bdf279be2e0bab9c99",
      "AccountId": "user@example.com",
      "Description": "Подписка на сервис",
      "Email": "user@example.com",
      "Amount": 3.04,
      "CurrencyCode": 0,
      "Currency": "RUB",
      "RequireConfirmation": false,
      "StartDate": "/Date(1473665268000)/",
      "StartDateIso": "2016-09-12T15:27:48",
      "IntervalCode": 0,
      "Interval": "Week",
      "Period": 2,
      "MaxPeriods": null,
      "CultureName": "ru",
      "StatusCode": 0,
      "Status": "Active",
      "SuccessfulTransactionsNumber": 0,
      "FailedTransactionsNumber": 0,
      "LastTransactionDate": null,
      "LastTransactionDateIso": null,
      "NextTransactionDate": "/Date(1473665268000)/",
      "NextTransactionDateIso": "2016-09-12T15:27:48"
    }
  ],
  "Success": true,
  "Message": null
}
```

## Изменение подписки на рекуррентные платежи

Метод изменения ранее созданной подписки.  

**Адрес метода:**   
https://api.cloudpayments.ru/subscriptions/update  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Id | String | Обязательный | Идентификатор подписки
Description | String | Необязательный | Для изменения назначения платежа
Amount | Numeric | Необязательный |	Для изменения суммы платежа
Currency | String |	Необязательный | Для изменения валюты: RUB/USD/EUR/GBP ([см. справочник](#spisok-valyut))
RequireConfirmation | Bool | Необязательный | Для изменения схемы проведения платежей
StartDate |	DateTime | Необязательный |	Для изменения даты и времени первого или следующего платежа во временной зоне UTC
Interval | String |	Необязательный | Для изменения интервала. Возможные значения: Week, Month
Period | Int | Необязательный |	Для изменения периода. В комбинации с интервалом, 1 Month значит раз в месяц, а 2 Week — раз в две недели
MaxPeriods | Int | Необязательный |	Для изменения максимального количества платежей в подписке
CustomerReceipt |	json |	Необязательный |	Для изменения состава [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka)
CultureName | String | Необязательный | Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](#lokalizatsiya))

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции и параметры подписки.

**Пример запроса:**

```llvm
{  
   "Id":"sc_8cf8a9338fb8ebf7202b08d09c938",
   "description":"Тариф №5",
   "amount":1200,
   "currency":"RUB"
}
```

**Пример ответа:**

```llvm
{
   "Model":{
      "Id":"sc_8cf8a9338fb8ebf7202b08d09c938", //идентификатор подписки
      "AccountId":"user@example.com",
      "Description":"Тариф №5",
      "Email":"user@example.com",
      "Amount":1200,
      "CurrencyCode":0,
      "Currency":"RUB",
      "RequireConfirmation":false, //true для двухстадийных платежей
      "StartDate":"\/Date(1407343589537)\/",
      "StartDateIso":"2014-08-09T11:49:41", //все даты в UTC
      "IntervalCode":1,
      "Interval":"Month",
      "Period":1,
      "MaxPeriods":null,
      "StatusCode":0,
      "Status":"Active",
      "SuccessfulTransactionsNumber":0,
      "FailedTransactionsNumber":0,
      "LastTransactionDate":null,
      "LastTransactionDateIso":null, 
      "NextTransactionDate":"\/Date(1407343589537)\/"
      "NextTransactionDateIso":"2014-08-09T11:49:41"
   },
   "Success":true
}
```

## Отмена подписки на рекуррентные платежи

Метод отмены подписки на рекуррентные платежи.  

**Адрес метода:** 

https://api.cloudpayments.ru/subscriptions/cancel  
**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Id | String | Обязательный | Идентификатор подписки

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции.

**Пример запроса:**

```llvm
{"Id":"sc_cc673fdc50b3577e60eee9081e440"}
```

**Пример ответа:**

```llvm
{"Success":true,"Message":null}
```

Вы также можете предоставить покупателю ссылку на сайт системы — **https://my.cloudpayments.ru/unsubscribe**, где он самостоятельно сможет найти и отменить свои регулярные платежи. 

## Создание счета для отправки по почте

Метод формирования ссылки на оплату и последующей отправки уведомления на e-mail адрес плательщика.  

**Адрес метода:**  
https://api.cloudpayments.ru/orders/create  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Amount | Numeric | Обязательный | Сумма платежа
Currency | String |	Необязательный | Валюта RUB/USD/EUR/GBP ([см. справочник](#spisok-valyut)). Если параметр не передан, то по умолчанию принимает значение RUB
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
CultureName | String | Необязательный |	Язык уведомлений. Возможные значения: "ru-RU", "en-US". ([см. справочник](#lokalizatsiya))
SubscriptionBehavior | String |	Необязательный | Для создания платежа с подпиской. Возможные значения: CreateWeekly, CreateMonthly
SuccessRedirectUrl | String | Необязательный | Адрес страницы для редиректа при успешной оплате
FailRedirectUrl | String | Необязательный | Адрес страницы для редиректа при неуспешной оплате
JsonData | Json | Необязательный | Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для формирования [онлайн-чека](#format-peredachi-dannyh-dlya-onlayn-cheka) 

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
    "Model":{
        "Id":"f2K8LV6reGE9WBFn",
        "Number":61,
        "Amount":10.0,
        "Currency":"RUB",
        "CurrencyCode":0,
        "Email":"client@test.local",
        "Description":"Оплата на сайте example.com",
        "RequireConfirmation":true,
        "Url":"https://orders.cloudpayments.ru/d/f2K8LV6reGE9WBFn",
    },
    "Success":true,
}
```

<aside class="notice">Сообщение на телефон плательщика может быть отправлено только одним выбранным способом: СМС или Viber.</aside>

## Отмена созданного счета

Метод отмены созданного счета: 

**Адрес метода:**  
https://api.cloudpayments.ru/orders/cancel  

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Id | String | Обязательный | Идентификатор счета

В ответ на корректно сформированный запрос система возвращает сообщение об успешно выполненной операции.

**Пример запроса:**

```llvm
{"Id":"f2K8LV6reGE9WBFn"}
```

**Пример ответа:**

```llvm
{"Success":true,"Message":null}
```

## Просмотр настроек уведомлений

Метод просмотра настроек уведомлений с указанием типа уведомления.  

**Адрес метода:**  
https://api.cloudpayments.ru/site/notifications/{Type}/get   

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Type | String | Обязательный | Тип уведомления: Check/Pay/Fail и т.д. (см. [справочник](#tipy-operatsiy))

**Пример ответа** на запрос для [Pay](#pay)-уведомления на адрес:  
https://api.cloudpayments.ru/site/notifications/pay/get

```llvm
{
    "Model": {
        "IsEnabled": true,
        "Address": "http://example.com",
        "HttpMethod": "GET",
        "Encoding": "UTF8",
        "Format": "CloudPayments"
    },
    "Success": true,
    "Message": null
}
```

## Изменение настроек уведомлений

Метод изменения настроек уведомлений.

**Адрес метода:**  
https://api.cloudpayments.ru/site/notifications/{Type}/update

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Type | String | Обязательный | Тип уведомления: Pay/Fail и т.д., кроме Check-уведомления (см. [справочник](#tipy-operatsiy))
IsEnabled |	Bool |	Необязательный | Если значение true — то уведомление включено. Значение по умолчанию — false
Address | String |	Необязательный, если `IsEnabled=false`, в противном случае обязательный |	Адрес для отправки уведомлений (для HTTPS-схемы необходим валидный SSL-сертификат)
HttpMethod | String | Необязательный | HTTP-метод для отправки уведомлений. Возможные значения: GET, POST. Значение по умолчанию — GET
Encoding | String | Необязательный | Кодировка уведомлений. Возможные значения: UTF8, Windows1251. Значение по умолчанию — UTF8
Format | String | Необязательный | Формат уведомлений. Возможные значения: CloudPayments, QIWI, RT. Значение по умолчанию — CloudPayments

**Пример запроса** для [Pay](#pay)-уведомления на адрес:  
https://api.cloudpayments.ru/site/notifications/pay/update:

```llvm
{
    "IsEnabled": true,
    "Address": "http://example.com",
    "HttpMethod": "GET",
    "Encoding": "UTF8",
    "Format": "CloudPayments"
}
```

**Пример ответа:**

```llvm
{"Success":true,"Message":null}
```

## Запуск сессии для оплаты через Apple Pay

Запуск сессии необходим для приема платежей [Apple Pay](#apple-pay) на сайтах. Для оплаты в мобильных приложениях его использование не требуется.  

**Адрес метода:**  
https://api.cloudpayments.ru/applepay/startsession

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
ValidationUrl |	Строка | Обязательный | Адрес, полученный из Apple JS
paymentUrl  |	Строка | Необязательный | Адрес для старта сессии в Apple

В ответ на корректно сформированный запрос система возвращает ответ, где в объекте Model содержится сессия для оплаты Apple Pay в формате JSON.

**Пример запроса:**

```llvm
{"ValidationUrl":"https://apple-pay-gateway.apple.com/paymentservices/startSession"}
```

**Пример ответа:**

```llvm
{
    "Model": {
        "epochTimestamp": 1545111111153,
        "expiresAt": 1545111111153,
        "merchantSessionIdentifier": "SSH6FE83F9B853E00F7BD17260001DCF910_0001B0D00068F71D5887F2726CFD997A28E0ED57ABDACDA64934730A24A31583",
        "nonce": "d6358e06",
        "merchantIdentifier": "41B8000198128F7CC4295E03092BE5E287738FD77EC3238789846AC8EF73FCD8",
        "domainName": "demo.cloudpayments.ru",
        "displayName": "demo.cloudpayments.ru",
        "signature": "308006092a864886f70d010702a0803080020101310f300d06096086480165030402010500308006092a864886f70d0107010000a080308203e230820388a00307650202082443f2a8069df577300a06082a8648ce3d040302307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3134303932353232303631315a170d3139303932343232303631315a305f3125302306035504030c1c6563632d736d702d62726f6b65722d7369676e5f5543342d50524f4431143012060355040b0c0b694f532053797374656d7331133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004c21577edebd6c7b2218f68dd7090a1218dc7b0bd6f2c283d846095d94af4a5411b83420ed811f3407e83331f1c54c3f7eb3220d6bad5d4eff49289893e7c0f13a38202113082020d304506082b0601050507010104393037303506082b060105050730018629687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c6561696361333031301d0603551d0e041604149457db6fd57481868989762f7e578507e79b5824300c0603551d130101ff04023000301f0603551d2304183016801423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b3082011d0603551d2004820114308201103082010c06092a864886f7636405013081fe3081c306082b060105050702023081b60c81b352656c69616e6365206f6e207468697320636572746966696361746520627920616e7920706172747920617373756d657320616363657074616e6365206f6620746865207468656e206170706c696361626c65207374616e64617264207465726d7320616e6420636f6e646974696f6e73206f66207573652c20636572746966696361746520706f6c69637920616e642063657274696669636174696f6e2070726163746963652073746174656d656e74732e303606082b06010505070201162a687474703a2f2f7777772e6170706c652e636f6d2f6365727469666963617465617574686f726974792f30340603551d1f042d302b3029a027a0258623687474703a2f2f63726c2e6170706c652e636f6d2f6170706c6561696361332e63726c300e0603551d0f0101ff040403020780300f06092a864886f76364061d04020500300a06082a8648ce3d04030203480030450220728a9f0f92a32ab999742bd55eb67340572a9687a1d62ef5359710f5163e96e902210091379c7d6ebe5b9974af40037f34c23ead98b5b4b7f70d355c86b2a81372f1b1308202ee30820275a0030201020208496d2fbf3a98da97300a06082a8648ce3d0403023067311b301906035504030c124170706c6520526f6f74204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b3009060355040613025553301e170d3134303530363233343633305a170d3239303530363233343633305a307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b30090603550406130255533059301306072a8648ce3d020106082a8648ce3d03010703420004f017118419d76485d51a5e25810776e880a2efde7bae4de08dfc4b93e13356d5665b35ae22d097760d224e7bba08fd7617ce88cb76bb6670bec8e82984ff5445a381f73081f4304606082b06010505070101043a3038303606082b06010505073001862a687474703a2f2f6f6373702e6170706c652e636f6d2f6f63737030342d6170706c65726f6f7463616733301d0603551d0e0416041423f249c44f93e4ef27e6c4f6286c3fa2bbfd2e4b300f0603551d130101ff040530030101ff301f0603551d23041830168014bbb0dea15833889aa48a99debebdebafdacb24ab30370603551d1f0430302e302ca02aa0288626687474703a2f2f63726c2e6170706c652e636f6d2f6170706c65726f6f74636167332e63726c300e0603551d0f0101ff0404030201063010060a2a864886f7636406020e04020500300a06082a8648ce3d040302036700306402303acf7283511699b186fb35c356ca62bff417edd90f754da28ebef19c815e42b789f898f79b599f98d5410d8f9de9c2fe0230322dd54421b0a305776c5df3383b9067fd177c2c216d964fc6726982126f54f87a7d1b99cb9b0989216106990f09921d00003182018d30820189020123458186307a312e302c06035504030c254170706c65204170706c69636174696f6e20496e746567726174696f6e204341202d20473331263024060355040b0c1d4170706c652043657274696669636174696f6e20417574686f7269747931133011060355040a0c0a4170706c6520496e632e310b300906035504061302555302082443f2a8069df577300d06096086480165030402010500a08195301806092a864886f70d010903310b06092a864886f70d010701301c06092a864886f70d010905310f170d3138313232303134323633395a302a06092a864886f70d010934311d301b300d06096086480165030402010500a10a06082a8648ce3d040302302f06092a864886f70d0109043122042066adfefd6fbe307934525c52b926dcf0734a2e8011a9c8558d7043d983960af3300a06082a8648ce3d04030204483046022100fc6436b2c9bde03c4691d2e3b0e23aca06e44ce0c05c7ff4fb34550f4079dd36022100d1c91be8ed57321fb1c7264f1a617311ed678609a75fed3be31cc0d5cea16cfe000000000000"
    },
    "Success": true,
    "Message": null
}
```

## Локализация

По умолчанию API выдает сообщения для пользователей на русском языке. Для получения ответов, локализованных для других языков, передайте в параметрах запроса **CultureName**.

**Список поддерживаемых языков:**

Язык | Часовой пояс  | Код
--------- | ------- | ----------- 
Русский | MSK | ru-RU
Английский | CET | en-US
Латышский |	CET | lv
Азербайджанский | AZT |	az
Русский | ALMT | kk
Украинский | EET | uk
Польский | CET | pl
Вьетнамский | ICT | vi
Турецкий | TRT | tr


## Длинная запись

Длинная запись для авиа (**airline addendum**) — расширенная информация о маршрутной квитанции, которая передается вместе с транзакцией на обработку в платежную систему. Использование длинной записи позволяет сократить риски мошеннических операций и снизить стоимость обработки платежа.

Длинная запись состоит из информации о маршрутной квитанции, информации о сегментах, то есть перелетах и информации о пассажирах.

Информация о маршрутной квитанции включает в себя:

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
BookingRef |	String |	Обязательный, если не указан номер билета |	Номер брони
TicketNumber |	String |	Обязательный, если не указан номер брони |	Номер билета

Под сегментом понимается один авиаперелет: взлет и посадка. Необходимо указать все сегменты маршрута с перечнем следующих параметров:

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
FlightNumber |	String |	Обязательный |	Номер рейса
DepartureDateTime |	DateTime |	Обязательный |	Дата и время отправления
ArrivalDateTime |	DateTime |	Обязательный |	Дата и время прибытия
OriginatingCountry |	String |	Обязательный |	Страна вылета на русском или английском языке
OriginatingCity |	String |	Обязательный |	Город вылета на русском или английском языке
OriginatingAirportCode |	String(3) |	Обязательный |	Код аэропорта вылета — 3 буквы по классификации IATA
DestinationCountry |	String |	Обязательный |	Страна прилета на русском или английском языке
DestinationCity |	String |	Обязательный |	Город прилета на русском или английском языке
DestinationAirportCode |	String(3) |	Обязательный |	Код аэропорта прилета — 3 буквы по классификации IATA

Для передачи информации о пассажирах, необходимо по каждому указать имя и фамилию латиницей:

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
FirstName |	String |	Обязательный |	Имя пассажира
LastName |	String |	Обязательный |	Фамилия пассажира

Длинную запись можно передать в систему в параметре **AirlineAddendum** при вызове метода оплаты через [API](#api) или в ответе на [запрос проверки платежа](#check).

**Пример формирования длинной записи:**

```llvm
{
   "TicketNumber":"390 5241025377",
   "BookingRef":null,
   "Legs":[
      {
         "FlightNumber":"A3 971",
         "DepartureDateTime":"2014-05-26T05:15:00",
         "ArrivalDateTime":"2014-05-26T07:30:00",
         "OriginatingCountry":"Россия",
         "OriginatingCity":"Москва",
         "OriginatingAirportCode":"DME",
         "DestinationCountry":"Греция",
         "DestinationCity":"Афины",
         "DestinationAirportCode":"ATH"
      },
      {
         "FlightNumber":"A3 204",
         "DepartureDateTime":"2014-05-26T09:45:00",
         "ArrivalDateTime":"2014-05-26T10:50:00",
         "OriginatingCountry":"Греция",
         "OriginatingCity":"Афины",
         "OriginatingAirportCode":"ATH",
         "DestinationCountry":"Греция",
         "DestinationCity":"Родос",
         "DestinationAirportCode":"RHO"
      },
      {
         "FlightNumber":"A3 980",
         "DepartureDateTime":"2014-06-06T09:00:00",
         "ArrivalDateTime":"2014-06-06T13:45:00",
         "OriginatingCountry":"Греция",
         "OriginatingCity":"Родос",
         "OriginatingAirportCode":"RHO",
         "DestinationCountry":"Россия",
         "DestinationCity":"Москва",
         "DestinationAirportCode":"DME"
      }
   ],
   "Passengers":[
      {
         "FirstName":"KONSTANTIN",
         "LastName":"IVANOV"
      },
      {
         "FirstName":"JULIA",
         "LastName":"IVANOVA"
      }
   ]
}
```
