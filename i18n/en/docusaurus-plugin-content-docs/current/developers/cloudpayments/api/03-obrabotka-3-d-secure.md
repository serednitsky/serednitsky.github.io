---
title: "Processing 3D Secure"
keywords:
  - "Processing 3D Secure"
  - "Example of the form:"
---

# Processing 3D Secure

To perform [3D Secure authentication](../general-information.md#3d-secure) you must redirect the payer to the address specified in the **AcsUrl** parameter of the [server response](02-oplata-po-kriptogramme.md#sample-3ds-required), passing the following parameters:

* **MD**: `TransactionId` parameters from the server response
* **PaReq**: the parameter of the same name from the server response
* **TermUrl**: the return URL on your website where the payer is redirected after authentication

<aside class="notice">Note that parameter names are case-sensitive.</aside>

## Example of the form

```shell
<form name="downloadForm" action="AcsUrl" method="POST">
    <input type="hidden" name="PaReq" value="eJxVUdtugkAQ/RXDe9mLgo0Z1nhpU9PQasWmPhLYAKksuEChfn13uVR9mGTO7MzZM2dg3qSn0Q+X\nRZIJxyAmNkZcBFmYiMgxDt7zw6MxZ+DFkvP1ngeV5AxcXhR+xEdJ6BhpEZnEYLBdfPAzg56JKSKT\nAhqgGpFB7IuSgR+cl5s3NqFTG2NAPYSUy82aETqeWPYUUAdB+ClnwSmrwtz/TbkoC0BtDYKsEqX8\nZfZkDGgAUMkTi8synyFU17V5N2nKCpBuAHRVs610VijCJgmZu17UXTxhFWP34l7evYPlegsHkO6A\n0C85o5hMsI3piNIZHc+IBaitg59qJYzgdrUOQK7/WNy+3FZAeSqV5cMqAwLe5JlQwpny8T8HdFW8\netFuBqUyahV+Hjf27vWCaSx22fe+KY6kXKZfJLK1x22TZkyUS8QiHaUGgDQN6s+H+tOq7O7kf8hd\nt30=">
    <input type="hidden" name="MD" value="504">
    <input type="hidden" name="TermUrl" value="https://example.com/post3ds?order=1234567">
</form>
<script>
    window.onload = submitForm;
    function submitForm() { downloadForm.submit(); }
</script>
```

<aside class="notice">After authentication, the payer will be redirected to the TermUrl with the <code>MD</code> and <code>PaRes</code> parameters passed by the POST method.</aside>


<br />

To complete the payment, execute the following `Post3ds` method:

**Endpoint:**
https://api.cloudpayments.ru/payments/cards/post3ds

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId | long | Yes | The `MD` parameter value
PaRes | string | Yes | The value of the parameter with the same name

In response to a well-formed request, the server returns information about either a [successful transaction](02-oplata-po-kriptogramme.md#sample-approved) or a [declined transaction](02-oplata-po-kriptogramme.md#sample-declined).
