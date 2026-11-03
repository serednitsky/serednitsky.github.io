---
title: "Payment confirmation"
keywords:
  - "Payment confirmation"
---

# Payment confirmation

For [two-stage payments](../general-information.md#payment-processing-methods), you must confirm the payment either in the dashboard or by calling the API method.

**Endpoint:**
https://api.cloudpayments.ru/payments/confirm

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId | long | Yes | Transaction ID in the system
Amount | number | Yes |The confirmation amount in the transaction currency. Use a dot as the decimal separator. Number of decimal places: 2
JsonData | JSON | No | Any other data associated with the transaction, including instructions for generating an [online receipt](../online-kassa.md#data-transmission-format-for-online-receipts)

**Request example:**

```llvm
{"TransactionId":455,"Amount":65.98}
```

**Example response:**

```llvm
{"Success":true,"Message":null}
```
