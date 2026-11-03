---
title: "Check payment status"
keywords:
  - "Check payment status"
---

# Check payment status

Method for finding a payment and checking its status (see [reference](../handbook.md#transaction-statuses)).

**Legacy method endpoint:**
https://api.cloudpayments.ru/payments/find

**New method endpoint:**
https://api.cloudpayments.ru/v2/payments/find

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
InvoiceId | string | Yes | Order number

If a payment with the specified order number is found, the system will display information about either the [successful transaction](02-oplata-po-kriptogramme.md#sample-approved) or the [declined one](02-oplata-po-kriptogramme.md#sample-declined). If multiple payments are found with the specified order number, the system will return details only for the latest operation. The key difference in the new method is that it searches across all transactions, including refunds and card payouts.

**Request example:**

```llvm
{"InvoiceId":"123456789"}
```

**Example response:**

```llvm
{"Success":false,"Message":"Not found"}
```

<aside class="notice">Checking payment status is redundant and only necessary in case of data loss due to a system disruption.</aside>
