---
title: "Change notification settings"
keywords:
  - "Change notification settings"
---

# Change notification settings

Method for changing the notification settings.

**Endpoint:**
https://api.cloudpayments.ru/site/notifications/{Type}/update

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Type | string | Yes | Notification type: Pay/Fail etc., except for the Check-notification (see [reference](../handbook.md#operation-types))
IsEnabled |	bool |	No | If `true`, the notification is enabled. Default value: false
Address | string |	Not required if `IsEnabled=false`; otherwise, required |	URL to send notifications (a valid SSL certificate is required for the HTTPS scheme)
HttpMethod | string | No | HTTP method used to send notifications. Possible values: GET, POST. Default value: GET
Encoding | string | No | Notification encoding. Possible values: UTF8, Windows1251. Default value: UTF8
Format | string | No | Notification format. Possible values: CloudPayments, QIWI, RT. The default value: CloudPayments

**Request example** for the [Pay](../notifications.md#pay) notification request sent to address:
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

**Example response:**

```llvm
{"Success":true,"Message":null}
```
