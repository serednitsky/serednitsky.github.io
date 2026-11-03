---
title: "Export token list"
keywords:
  - "Export token list"
---

# Export token list

Method for retrieving the list of all CloudPayments payment tokens.

**Endpoint:**
https://api.cloudpayments.ru/payments/tokens/list

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
PageNumber | int | Yes | Page number, must be greater than or equal to 1

**Request example:**

```llvm
{
    "PageNumber": 1
}
```

**Example response:**

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
