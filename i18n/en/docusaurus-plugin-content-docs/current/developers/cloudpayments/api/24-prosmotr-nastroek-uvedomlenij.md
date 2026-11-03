---
title: "View notification settings"
keywords:
  - "View notification settings"
---

# View notification settings

Method for viewing notification settings, with the notification type specified.

**Endpoint:**
https://api.cloudpayments.ru/site/notifications/{Type}/get

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Type | string | Yes | Notification type: Check/Pay/Fail and so on (see [reference](../handbook.md#operation-types))

**Response example** for the [Pay](../notifications.md#pay) notification request sent to:
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
