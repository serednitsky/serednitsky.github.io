---
title: "Просмотр настроек уведомлений"
keywords:
  - "Просмотр настроек уведомлений"
---

# Просмотр настроек уведомлений

Метод просмотра настроек уведомлений с указанием типа уведомления.  

**Адрес метода:**  
https://api.cloudpayments.ru/site/notifications/{Type}/get   

**Параметры запроса:** 

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
Type | String | Обязательный | Тип уведомления: Check/Pay/Fail и т.д. (см. [справочник](../handbook.md#типы-операций))

**Пример ответа** на запрос для [Pay](../notifications.md#pay)-уведомления на адрес:  
https://api.cloudpayments.ru/site/notifications/pay/get

```llvm
{
    "Model": {
        "IsEnabled": true,
        "Address": "http://example.com",
        "HttpMethod": "POST",
        "Encoding": "UTF8",
        "Format": "CloudPayments"
    },
    "Success": true,
    "Message": null
}
```
