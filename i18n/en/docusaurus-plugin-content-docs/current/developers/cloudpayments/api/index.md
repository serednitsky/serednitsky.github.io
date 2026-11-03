---
title: "API"
keywords:
  - "API"
  - "How it works"
  - "Request authentication"
  - "API idempotency"
---

# API

**API** is the system application programming interface for interacting with merchant platforms.

The interface is available at [api.cloudpayments.ru](https://api.cloudpayments.ru) and supports features for executing payments, canceling payments, issuing refunds, capturing two-stage payments, creating and canceling subscriptions for recurring payments, and sending invoices via email.

## How it works

* Parameters are sent via the POST method either as `key=value` pairs in the request body or in JSON format.
* The API can accept no more than 150,000 fields per single request. API response timeout: 5 minutes.
* In all requests to the API, if you pass a floating-point number into an integer field, the API does not return an error; instead, mathematical rounding will be applied automatically.
* The API limits the maximum number of concurrent requests to 5 for test terminals and to 30 for production terminals. If the number of requests currently processed exceeds the limit, the API returns a 429 HTTP status code (Too Many Requests) until at least one request has finished processing. If you need to revise these limits, contact your account manager.

The choice of parameter transmission format is determined on the client side and controlled through the <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17" target="_blank">Content-Type</a> request header.

* For **key=value** parameters, use Content-Type: *application/x-www-form-urlencoded*.
* For **JSON** parameters, use Content-Type: *application/json*.

The system returns a JSON response containing at least the following two parameters: **Success** and **Message**:

```llvm
{ "Success": false, "Message": "Invalid Amount value" }
```

## Request authentication

To authenticate a request, <a href="https://en.wikipedia.org/wiki/Basic_access_authentication" target="_blank">HTTP Basic Auth</a> is used to send the username and password within the HTTP request header. The **Public ID** is used as the username, and the **API Secret** is used as the password. Both values can be obtained from the dashboard.

<aside class="warning">If the request does not include an authentication header or contains incorrect authentication data, the system returns a 401 HTTP status (Unauthorized).</aside>

<aside class="notice">The API Secret is used for security. It must be stored in a secure location.</aside>

## API idempotency

**Idempotency** is an API property that ensures that a repeated request returns the same result as the initial request without being processed again. This means that you can send multiple requests to a system with the same ID, only one successful request will be processed, and all responses will be identical. This mechanism protects against network errors that could otherwise result in duplicate records or actions.
To enable idempotency, pass the **X-Request-ID** header containing a unique ID in your API request. You generate this request ID. It can be a GUID, a combination of the order number, date, and amount, or any other value at your discretion.
Each new request that requires processing must include a unique **X-Request-ID** value. The processed result is retained in the system for 1 hour.
