---
title: "Выгрузка токенов"
keywords:
  - "Выгрузка токенов"
---

# Выгрузка токенов

Метод выгрузки списка всех платежных токенов CloudPayments. 
 
**Адрес метода:**  
https://api.cloudpayments.ru/payments/tokens/list

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | -----------
PageNumber | Int | Обязательный | Порядковый номер страницы, должно быть больше или равно 1
 
**Пример запроса:**

```llvm
{
    "PageNumber": 1
}
```

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
