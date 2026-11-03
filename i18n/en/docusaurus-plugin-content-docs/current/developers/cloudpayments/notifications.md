---
title: "Notifications"
keywords:
  - "Notifications"
  - "Check"
  - "Pay"
  - "Fail"
  - "Confirm"
  - "Refund"
  - "Recurrent"
  - "Cancel"
  - "Verify notifications"
---

# Notifications

A notification is an HTTP request from the system to your website. Such requests are also called **callback** or **webhook**. The system supports several types of notifications: for checking whether a payment can be processed, for informing about successful and failed payments, for notifying about changes to recurring payment subscriptions, and for informing about issued receipts.

<aside class="warning">Activation and deactivation of notifications, as well as adjustment of addresses and formats of notifications are carried out in the dashboard.</aside>
<aside class="notice">If you are using notifications to verify and change order status in your system, we recommend checking the amount, order number, and account ID of the payer.</aside>
<aside class="notice">The following rule applies to notifications (Pay, Fail, Recurrent, Cancel, Confirm, Refund): if the system cannot connect to the merchant's server, or receives an incorrect response, or a response with a code other than zero, it will make 100 attempts to deliver the message. The intervals between retries, in minutes, are as follows: 1, 2, 5, 10, 30. Response timeout: 30 seconds. In less than 1% of cases, the delay may reach 2 minutes. In other cases, it is less than a second.</aside>

## Check

Sent after the holder fills out the payment form and presses the Pay button.

Used to monitor payment processing: the system sends a request with payment information to the merchant website, which must confirm or decline whether it can accept payment.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Transaction ID in the system
Amount |	number. Point as divider, two digits after point | Yes |	Amount from payment parameters
Currency | string|	Yes |	Currency: RUB/USD/EUR/GBP from the payment parameters (see [reference](handbook.md#list-of-currencies))
PaymentAmount | string|	Yes | Charge amount
PaymentCurrency | string|	Yes | Charge currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Date/time the payment was created, in UTC
CardId | string| No | Unique card ID in CloudPayments
CardFirstSix |	string(6) |	Yes | First 6 digits of the card number
CardLastFour |	string(4) |	Yes | The last 4 digits of the card number
CardType |	string|	Yes |	Card payment system: Visa, Mastercard, Maestro or Mir
CardExpDate |	string|	Yes |	Card expiration date in MM/YY format
TestMode |	bit (1 or 0) |	Yes |	Test mode flag
Status |	string|	Yes |	Status of payment in case of successful completion:<br />`Completed` for [single-stage payments](general-information.md#payment-processing-methods),<br />`Authorized` for [two-stage payments](general-information.md#payment-processing-methods)
OperationType |	string|	Yes |	Type Payment/Refund/CardPayout (see [directory](handbook.md#operation-types))
InvoiceId |	string|	No |	Order number from the payment parameters
AccountId |	string|	No |	User ID from payment parameters
SubscriptionId |	string|	No |	Subscription ID (for recurring payments)
TokenRecipient |	string|	No |	Payment recipient token
Name |	string| No |	Cardholder Name
Email |	string|	No |	Payer's email
IpAddress |	string|	No |	Payer IP address
IpCountry | string(2) |	No |	Two-letter code of the country where the payer is located by <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
IpCity |	string|	No |	Payer's city
IpRegion |	string|	No |	Payer's location region
IpDistrict |	string|	No |	Payer's region
IpLatitude |	string|	No | Payer's latitude
IpLongitude  |	string|	No | Payer's longitude
Issuer |	string|	No |	Name of the card issuing bank
IssuerBankCountry |	string(2) |	No |	Two-letter country code of the card issuer, per <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
Description |	string|	No |	Payment purpose from the payment parameters
CardProduct |	string|	No |	Card type
PaymentMethod |	string|	No |	Payment method (for example, T‑Pay)
Data |	JSON |	No |	Arbitrary set of parameters passed with the transaction

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

The code determines the result of the check on whether the payment can be processed, and can take the following values:

Code |	Value |	Result
---- | ------- | -----------
0 |	The payment can be processed |	The system will authorize the payment
10 |	Incorrect order ID |	The payment will be declined
11 |	Incorrect AccountId |	The payment will be declined
12 |	Incorrect amount |	The payment will be declined
13 |	The payment cannot be accepted |	The payment will be declined
20 |	The payment is overdue |	The payment will be declined, and the payer will receive the corresponding notification

<aside class="notice">If the system fails to connect to the merchant server or receives an incorrect response, the payment will be declined.</aside>


## Pay

Sent after the payment has been successfully processed and authorization has been received from the issuer.

The system sends a request to merchant with payment information, and the website must record the fact of the payment.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Transaction ID in the system
Amount | number. Point as divider, two digits after point |	Yes | Amount from payment parameters
Currency |	string|	Yes |	Currency: RUB/USD/EUR/GBP from the payment parameters (see [reference](handbook.md#list-of-currencies))
PaymentAmount | string|	Yes | Charge amount
PaymentCurrency | string|	Yes | Charge currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Date/time the payment was created, in UTC
CardId | string| No | Unique card ID in CloudPayments
CardFirstSix |	string(6) |	Yes |	First 6 digits of the card number
CardLastFour |	string(4) |	Yes |	The last 4 digits of the card number
CardType |	string|	Yes |	Card payment system: Visa, Mastercard, Maestro or Mir
CardExpDate |	string|	Yes |	Card expiration date in MM/YY format
TestMode |	bit (1 or 0) |	Yes |	Test mode flag
Status |	string|	Yes | Status of payment after authorization:<br />`Completed` for single-stage payments,<br />`Authorized` for two-stage payments
OperationType |	string|	Yes |	Type Payment/CardPayout (see [reference](handbook.md#operation-types))
GatewayName |	string|	Yes |	Acquiring bank ID
InvoiceId |	string|	No |	Order number from the payment parameters
AccountId |	string|	No |	User ID from payment parameters
SubscriptionId |	string|	No |	Subscription ID (for recurring payments)
Name |	string|	No |	Cardholder Name
Email |	string|	No |	Payer's email
IpAddress | string|	No |	Payer IP address
IpCountry |	string(2) |	No |	Two-letter code of the country where the payer is located by <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
IpCity |	string|	No |	Payer's city
IpRegion |	string|	No |	Payer's location region
IpDistrict |	string|	No |	Payer's region
IpLatitude |	string|	No | Payer's latitude
IpLongitude  |	string|	No | Payer's longitude
Issuer |	string|	No |	Name of the card issuing bank
IssuerBankCountry |	string(2) |	No |	Two-letter country code of the card issuer, per <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
Description |	string|	No |	Payment purpose from the payment parameters
AuthCode |	string|	No | Authorization code
Data |	JSON |	No |	Arbitrary set of parameters passed with the transaction
Token |	string|	No 	|	Card token for repeat payments without entering card details
TotalFee |	decimal |	No |	Value of the total fee
CardProduct |	string|	No |	Card type
PaymentMethod |	string|	No |	Payment method (for example, T‑Pay)
FallBackScenarioDeclinedTransactionId | long | No | Number of the first failed transaction
Rrn | string| No | Unique bank transaction number assigned by the servicing bank
CustomFields | array | No | Custom fields passed by the merchant in the payment request
VatAboveTotalFee | decimal | No | Calculated VAT amount charged on the System's fee. The parameter is passed starting 29.04.2026
ProcessorAndPartnerFee | decimal | No | Amount of the merchant agent's fee. The value is filled in for SBP payments. The parameter is passed starting 29.04.2026
VatWithinProcessorFee | decimal | No | Calculated VAT amount on the payment agent's fee. The value is filled in for SBP payments. The parameter is passed starting 29.04.2026

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

The code determines the result of the merchant server processing the payment notification, and can only take a single value:

Code |	Value
---- | -------
0 |	The payment has been registered


## Fail

Sent in case the payment was declined, and is used to analyze the number and reasons for declines.

It should be noted that a payment decline is not final, the user may complete the payment on the second attempt.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Transaction ID in the system
Amount |	number. Point as divider, two digits after point |	Yes |	Amount from payment parameters
Currency |	string|	Yes |	Currency: RUB/USD/EUR/GBP from the payment parameters (see [reference](handbook.md#list-of-currencies))
PaymentAmount | string|	Yes | Charge amount
PaymentCurrency | string|	Yes | Charge currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Date/time the payment was created, in UTC
CardId | string| No | Unique card ID in CloudPayments
CardFirstSix |	string(6) |	Yes |	First 6 digits of the card number
CardLastFour |	string(4) |	Yes |	The last 4 digits of the card number
CardType |	string|	Yes |	Card payment system: Visa, Mastercard, Maestro or Mir
CardExpDate |	string|	Yes |	Card expiration date in MM/YY format
TestMode |	bit (1 or 0) |	Yes |	Test mode flag
Reason |	string|	Yes |	Decline reason
ReasonCode |	int |	Yes |	Error code (see [reference](handbook.md#error-codes))
OperationType |	string|	Yes |	Type Payment/Refund/CardPayout (see [directory](handbook.md#operation-types))
InvoiceId |	string|	No |	Order number from the payment parameters
AccountId |	string|	No |	User ID from payment parameters
SubscriptionId |	string|	No |	Subscription ID (for recurring payments)
Name |	string|	No |	Cardholder Name
Email |	string|	No |	Payer's email
IpAddress |	string|	No |	Payer IP address
IpCountry |	string(2) |	No |	Two-letter code of the country where the payer is located by <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
IpCity |	string|	No |	Payer's city
IpRegion |	string|	No |	Payer's location region
IpDistrict |	string|	No |	Payer's region
IpLatitude |	string|	No | Payer's latitude
IpLongitude  |	string|	No | Payer's longitude
Issuer |	string|	No |	Name of the card issuing bank
IssuerBankCountry |	string(2) |	No |	Two-letter country code of the card issuer, per <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
Description |	string|	No |	Payment purpose from the payment parameters
Data |	JSON |	No |	Arbitrary set of parameters passed with the transaction
Token |		string|	No 	|	Card token for repeat payments without entering card details
PaymentMethod | 	string|	No |	Payment method (for example, T‑Pay)
FallBackScenarioDeclinedTransactionId | long | No | Number of the first failed transaction
Rrn | string| No | Unique bank transaction number assigned by the servicing bank
CustomFields | array | No | Custom fields passed by the merchant in the payment request
RetryAfter | yyyy-MM-dd HH:mm:ss | No | The date and time when the charge attempt can be retried. The parameter is passed starting from 27.05.2026
ProviderMessage | string| No | Details of the error that occurred during the charge attempt. The parameter is passed starting from 27.05.2026

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

This code determines how the merchant's server processed the declined payment notification and can take only a single value

Code |	Value
---- | -------
0 |	Attempt has been registered

<aside class="notice">We support the integration of a backup acquirer to increase payment conversion rates. If a backup acquirer is integrated, a payment decline at the primary acquirer due to specific reasons (technical error, timeout, or fraud) will trigger a payment authorization attempt at the backup acquirer.</aside>


## Confirm

Sent after a payment processed using the [two-stage](general-information.md#payment-processing-methods) scheme is confirmed.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Transaction ID in the system
Amount |	number. Point as divider, two digits after point |	Yes |	Amount from payment parameters
Currency |	string|	Yes |	Currency: RUB/USD/EUR/GBP from the payment parameters (see [reference](handbook.md#list-of-currencies))
PaymentAmount | string|	Yes | Charge amount
PaymentCurrency | string|	Yes | Charge currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Date/time the payment was created, in UTC
CardFirstSix |	string(6) |	Yes |	First 6 digits of the card number
CardLastFour |	string(4) |	Yes |	The last 4 digits of the card number
CardType |	string|	Yes |	Card payment system: Visa, Mastercard, Maestro or Mir
CardExpDate |	string|	Yes |	Card expiration date in MM/YY format
TestMode |	bit (1 or 0) |	Yes |	Test mode flag
Status |	string|	Yes |	Status of payment after authorization: Completed
InvoiceId |	string|	No | Order number from the payment parameters
AccountId |	string|	No |	User ID from payment parameters
SubscriptionId |	string|	No |	Subscription ID (for recurring payments)
Name |	string|	No |	Cardholder Name
Email |	string|	No |	Payer's email
IpAddress |	string|	No |	Payer IP address
IpCountry |	string(2) |	No |	Two-letter code of the country where the payer is located by <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
IpCity |	string|	No |	Payer's city
IpRegion |	string|	No |	Payer's location region
IpDistrict |	string|	No |	Payer's region
IpLatitude |	string|	No | Payer's latitude
IpLongitude  |	string|	No | Payer's longitude
Issuer |	string|	No |	Name of the card issuing bank
IssuerBankCountry |	string(2) |	No |	Two-letter country code of the card issuer, per <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO3166-1</a>
Description |	string|	No |	Payment purpose from the payment parameters
AuthCode |	string|	No | Authorization code
Data |	JSON |	No |	Arbitrary set of parameters passed with the transaction
Token |	string|	No |	Card token for repeat payments without entering card details
PaymentMethod |	string|No |	Payment method (for example, T‑Pay)
Rrn | string| No | Unique bank transaction number assigned by the servicing bank

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

The code determines the result of the merchant server processing the payment notification, and can only take a single value:

Code |	Value
---- | -------
0 |	The payment has been registered


## Refund

It is executed if the payment has been returned (in whole or in part) on your own initiative via the [API](api/07-vozvrat-deneg.md) or dashboard.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Refund transaction ID within the system
PaymentTransactionId |	long |	Yes |	Original payment transaction ID within the system
Amount |	number. Point as divider, two digits after point |	Yes |	Refund amount in the payment currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Refund date and time in UTC
OperationType |	string|	Yes |	Type Refund/CardPayout (see [reference](handbook.md#operation-types))
InvoiceId |	string|	No |	Order number of the original transaction
AccountId |	string|	No |	User ID of the original transaction
Email |	string|	No |	Payer's email
Data |	JSON | No |	Arbitrary set of parameters passed with the transaction
Rrn | string| No | Unique bank transaction number assigned by the servicing bank
CustomFields | array | No | Custom fields passed by the merchant in the payment request

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

The code determines the result of the merchant server processing the payment notification, and can only take a single value:

Code |	Value
---- | -------
0 |	Refund has been registered


## Recurrent

Executed if the recurring payment subscription status is modified.

<aside class="notice">When executing the "Modify a recurring payment subscription" <a href="api/20-izmenenie-podpiski-na-rekurrentnye-platezhi.md">request</a>, the Recurrent notification is not sent.</aside>

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
Id |	string |	Yes |	Subscription ID
AccountId |	string|	Yes |	User ID
Description |	string|	Yes |	Payment description (free-form)
Email |	string|	Yes |	Payer's email
Amount |	number |	Yes |	Payment amount
Currency |	string|	Yes |	Currency: RUB/USD/EUR/GBP from the payment parameters (see [reference](handbook.md#list-of-currencies))
RequireConfirmation |	Bool |	Yes |	If `true`, the payment will be processed using the [two-stage payment method](general-information.md#payment-processing-methods)
StartDate |	DateTime |	Yes |	Date and time of the initial scheduled payment in UTC.
Interval |	string|	Yes |	Interval. Possible values: Week, Month
Period |	int |	Yes |	Period. Combined with interval, 1 Month is once a month, and 2 Week is once every two weeks
Status |	string|	Yes |	[Subscription statuses](handbook.md#subscription-statuses-recurring)
SuccessfulTransactionsNumber |	int |	Yes |	Number of successful payments
FailedTransactionsNumber |	int |	Yes |	Number of failed payments (the value resets after each successful payment)
MaxPeriods |	int |	No |	Maximum number of payments in subscription
LastTransactionDate |	yyyy-MM-dd HH:mm:ss |	No |	Date and time of the last successful payment in UTC
NextTransactionDate |	yyyy-MM-dd HH:mm:ss |	No |	Date and time of the next payment in UTC

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

This code determines how the merchant's server processed the subscription modification notification and can take only a single value:

Code |	Value
---- | -------
0 |	Changes have been registered


## Cancel

Triggered if the payment was canceled at your initiative through the [API](api/index.md) or the dashboard.

The parameters are passed in the request body, listed in the following table:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
TransactionId |	long |	Yes |	Canceled transaction ID within the system
Amount |	number. Point as divider, two digits after point |	Yes |	Canceled transaction amount in the payment currency
DateTime |	yyyy-MM-dd HH:mm:ss |	Yes |	Cancelation date and time in UTC
InvoiceId |	string|	No |	Order number of the canceled transaction
AccountId |	string|	No |	User ID of the canceled transaction
Email |	string|	No |	Payer's email
Data |	JSON |	No |	Arbitrary set of parameters passed with the transaction
Rrn | string| No | Unique bank transaction number assigned by the servicing bank

In response to a request, the system expects to receive a response in JSON format with the required code parameter:

```js
{"code":0}
```

This code determines how the merchant's server processed the notification and can take only a single value:

Code |	Value
---- | -------
0 |	Refund has been registered


## Verify notifications

All notification types ([Check](#check), [Pay](#pay), [Fail](#fail), [Confirm](#confirm), [Cancel](#cancel), [Refund](#refund), and [Recurrent](#recurrent)) include two HTTP headers: **X-Content-HMAC** and **Content-HMAC**. These headers contain a request verification value calculated using the <a href="https://ru.wikipedia.org/wiki/HMAC" target="_blank">HMAC</a> algorithm. The only difference between them is that the first one is generated from URL-decoded (or non-encoded) parameters, and the second one is generated from the URL-encoded parameters, which can sometimes cause processing issues. If you need to verify the authenticity and integrity of your notifications, you can calculate the verification value on your side and compare it with the value received in the request. A match confirms that the notification was sent by us and arrived in its original form.

When implementing message verification, please consider the following details:

* For notifications sent via the **POST** method, the message is the request body. For **GET** requests, the message is the query string
* The **UTF8** encoding must be used when calculating the HMAC
* The hash is calculated using the **SHA256** function
* The API Secret (available in the dashboard) must be used as the key
* The calculated value is passed in **base64** encoding

<a href="https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/" target="_blank">Examples of calculating HMAC</a> in different programming languages.

The IP addresses from which the system sends notifications are **185.98.81.0/28**, **87.251.91.160/27**, **46.46.175.96/27**, **46.46.168.160/27**, **162.55.174.97/32**, and **91.216.178.243/32**.

<aside class="warning">In accordance with global security trends and identified vulnerabilities, support for the SSL 3.0 protocol has been discontinued. Support ended on June 8, 2020.</aside>

For you, this means the following:

* If you do not use Pay, Check, Fail, Confirm, Refund, Recurrent, or Cancel notifications, no action is required.
* If you use at least one of these notifications, you must check which HTTPS encryption protocols your server supports. If your server only supports SSL 3.0, you must upgrade it to at least TLS 1.1. Upgrading to TLS 1.3 is highly recommended. As a last resort, you can switch your notifications to the HTTP protocol.

For more details, see [How to disable SSL 3.0](https://www.ssl.com/ru/%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE/%D0%BE%D1%82%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C-tls-1-0-%D0%B8-1-1-apache-nginx/).
After June 8, HTTPS notifications to servers that support only SSL 3.0 may fail to deliver.

<br />
<br />
<br />
