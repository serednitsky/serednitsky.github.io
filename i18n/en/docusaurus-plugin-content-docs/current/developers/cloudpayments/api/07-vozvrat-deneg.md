---
title: "Refund"
keywords:
  - "Refund"
---

# Refund

Refund can be performed either via the dashboard or by calling the API method.

**Endpoint:**
https://api.cloudpayments.ru/payments/refund

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId | long |  	Yes | Payment transaction ID
Amount | number | Yes | The refund amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
JsonData | JSON | No | Any other data associated with the transaction, including instructions for generating an [online receipt](../online-kassa.md#data-transmission-format-for-online-receipts)

**Request example:**

```llvm
{"TransactionId":455, "Amount": 100}
```

**Example response:**

```llvm
{
    "Model": {
        "TransactionId": 568
    },
    "Success": true,
    "Message": null
}
```

<aside class="notice">Refunds are not processed for transactions older than one year.</aside>
