---
title: "Изменение настроек уведомлений"
keywords:
  - "Изменение настроек уведомлений"
---

# Изменение настроек уведомлений

Метод изменения настроек уведомлений.

**Адрес метода:**  
https://api.cloudpayments.ru/site/notifications/{Type}/update

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Type | String | Обязательный | Тип уведомления: Pay/Fail и т.д., кроме Check-уведомления (см. [справочник](../handbook.md#типы-операций))
IsEnabled |	Bool |	Необязательный | Если значение true — то уведомление включено. Значение по умолчанию — false
Address | String |	Необязательный, если `IsEnabled=false`, в противном случае обязательный |	Адрес для отправки уведомлений (для HTTPS-схемы необходим валидный SSL-сертификат)
HttpMethod | String | Необязательный | HTTP-метод для отправки уведомлений. Возможные значения: GET, POST. Значение по умолчанию — GET
Encoding | String | Необязательный | Кодировка уведомлений. Возможные значения: UTF8, Windows1251. Значение по умолчанию — UTF8
Format | String | Необязательный | Формат уведомлений. Возможные значения: CloudPayments, QIWI, RT. Значение по умолчанию — CloudPayments

**Пример запроса** для [Pay](../notifications.md#pay)-уведомления на адрес:  
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
