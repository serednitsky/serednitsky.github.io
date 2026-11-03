---
title: "Выгрузка списка транзакций за произвольный период"
keywords:
  - "Выгрузка списка транзакций за произвольный период"
---

# Выгрузка списка транзакций за произвольный период

Метод выгрузки списка транзакций за произвольный период. 

**Адрес метода:**  
https://api.cloudpayments.ru/v2/payments/list

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
CreatedDateGte | Date | Обязательный | Начальная дата создания операций
CreatedDateLte | Date | Обязательный | Конечная дата создания операций
PageNumber | Number | Обязательный | порядковый номер страницы, должно быть больше или равно 1
TimeZone | String | Необязательный | Код временной зоны, по умолчанию — UTC
Statuses | String Array | Необязательный | Статус операция. Может иметь значения [ "Authorized", "Completed", "Cancelled", "Declined" ]. По умолчанию выбраны все

В выгрузку транзакций попадают все операции, зарегистрированные за указанный день. Результат сортируется по CreatedDate, от старых к новым с лимитом - 100 на одну страницу. 
 Для удобства учета вы можете указать код временной зоны ([см. справочник](../handbook.md#коды-временных-зон)).

**Пример запроса:**

```llvm
{
    "PageNumber": 1,
    "CreatedDateGte":"2021-03-09T00:00:00+03:00", 
    "CreatedDateLte":"2021-03-10T00:00:00+03:00",
    "TimeZone": "MSK",
    "Statuses": [
        "Authorized", 
        "Completed", 
        "Cancelled", 
        "Declined"
    ]
    }
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
         "AndroidPay":false,
         "MasterPass":false,
         "TotalFee":0,
         "EscrowAccumulationId":null,
         "ReasonCode":5096,
         "VatAboveTotalFee": 0, //Расчетная сумма по НДС, начисленного на комиссию Системы. Параметр передается с 29.04.2026
         "ProcessorAndPartnerFee": 0, //Сумма вознаграждения Агента ТСП. Значение заполняется для СБП. Параметр передается с 29.04.2026
         "VatWithinProcessorFee": 0 //Расчетная сумма НДС с вознаграждения платёжного агента. Значение заполняется для СБП. Параметр передается с 29.04.2026
      }
   ],
   "Success":true,
   "Message":null
}
```
