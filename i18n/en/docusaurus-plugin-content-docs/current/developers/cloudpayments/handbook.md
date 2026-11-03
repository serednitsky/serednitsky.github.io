---
title: "Reference data"
keywords:
  - "Reference data"
  - "Error codes"
  - "Codes for handling responses to the Check notification"
  - "Operation types"
  - "Transaction statuses"
  - "Subscription statuses (recurring)"
  - "List of currencies"
  - "Fiscal data operators"
  - "Time zone codes"
  - "Notification types"
---

# Reference data

## Languages

|Language | Timezone | Code|
|--- | --- | ---|
|Russian | MSK | ru-RU|
|English | CET | en-US|
|Kazakh | ALMT | kk-KZ|

## Error codes

Below are the error codes that determine the reason for the refusal to make a payment.

<aside class="notice">The code is returned in the Fail notification and during payment via the API.</aside>

The widget displays the message to the payer. In the API, the **CardHolderMessage** parameter contains this message.

| Code | Name                                                    | Reason                                                                                                                                                                                                                                                                         | Message for the payer                                                       |
|:----|:------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|
| 5001| 	Refer To Card Issuer                                       | 	The issuer refused to process the online transaction                                                                                                                                                                                                                                       | 	Contact your bank or use a different card                      |
| 5003| Invalid Merchant                                            | 	The issuer refused to process the online transaction                                                                                                                                                                                                                                       | 	Contact your bank or use a different card                      |
| 5004| Pick Up Card                                                | 	The card is lost                                                                                                                                                                                                                                                                 | Contact your bank or use a different card                       |
| 5005| 	Do Not Honor                                               | 	The issuer declined the transaction without explanation  <br />`- Incorrect CVV code for Mastercard cards` <br />`- Internal restrictions from the card issuing bank` <br />`- The card is blocked or not yet activated` <br />`- Online payments are not enabled on the card, or 3DS is not connected` | 	Contact your bank or use a different card                      |
| 5006| 	Error                                                      | 	The network declined the transaction, or the CVV code is incorrect                                                                                                                                                                                                                         | 	Check that the card details are correct, or use a different card |
| 5007| Pick Up Card Special Conditions                             | 	The card is lost                                                                                                                                                                                                                                                                 | Contact your bank or use a different card                       |
| 5012| 	Invalid Transaction                                        | 	The card cannot be used for online payments                                                                                                                                                                                                                                     | 	Use another card or contact the card issuing bank         |
| 5013| 	Amount Error                                               | 	The transaction amount is too small or too large                                                                                                                                                                                                                           | 	Check that the amount is correct                                                   |
| 5014| 	Invalid Card Number                                        | 	The card number is incorrect                                                                                                                                                                                                                                                       | 	Check that the card details are correct, or use a different card |
| 5015| 	No Such Issuer                                             | 	The issuer was not found                                                                                                                                                                                                                                                              | 	Check that the card details are correct, or use a different card |
| 5017| Customer Cancellation                                       | Declined at the cardholder's request                                                                                                                                                                                                                                                | Use a different card                                                    |
| 5019| 	Transaction Error                                          | 	The issuer declined the transaction without explanation  <br />`- Incorrect CVV code for Mastercard cards` <br />`- Internal restrictions from the card issuing bank` <br />`- The card is blocked or not yet activated` <br />`- Online payments are not enabled on the card, or 3DS is not connected` | 	Contact your bank or use a different card                      |
| 5030| 	Format Error                                               | 	An error occurred on the acquirer's side. The transaction was malformed                                                                                                                                                                                                                   | 	Try again later                                                        |
| 5031| 	Bank Not Supported By Switch                               | 	The card issuer is unknown                                                                                                                                                                                                                                                      | 	Use a different card                                                   |
| 5033| 	Expired Card Pickup                                        | 	The card's expiration period has passed                                                                                                                                                                                                                                                         | 	Contact your bank or use a different card                      |
| 5034| 	Suspected Fraud                                            | 	The issuer declined the transaction due to suspected fraud                                                                                                                                                                                                                                   | 	Contact your bank or use a different card                      |
| 5036| 	Restricted Card                                            | 	The card cannot be used for payments                                                                                                                                                                                                                                            | 	Payments are not allowed for this card. Try a different card                      |
| 5041| 	Lost Card                                                  | 	The card is lost                                                                                                                                                                                                                                                                 | 	Contact your bank or use a different card                      |
| 5043| 	Stolen Card                                                | 	The card is stolen                                                                                                                                                                                                                                                                 | 	Contact your bank or use a different card                      |
| 5051| 	Insufficient Funds                                         | 	There are insufficient funds                                                                                                                                                                                                                                                           | 	Insufficient funds on the card                                                  |
| 5054| 	Expired Card                                               | 	The card has expired, or the expiration date was entered incorrectly                                                                                                                                                                                                                              | 	Check that the card details are correct, or use a different card |
| 5055| Invalid PIN                                                 | The PIN code is incorrect                                                                                                                                                                                                                                                                | Use a different card                                                    |
| 5057| 	Transaction Not Permitted                                  | 	There is a restriction on the card  <br />`Internal restrictions from the card issuing bank`  <br />`The card is blocked or not yet activated`  <br />`Online payments are not enabled on the card, or 3DS is not connected`                                                                     | 	Contact your bank or use a different card                      |
| 5058| Transaction Not Permitted To Card                           | The transaction is not allowed for this card                                                                                                                                                                                                                                                | Contact your bank or use a different card                       |
| 5059| Suspected Fraud Decline                                     | The transaction was declined by the bank due to suspected fraud                                                                                                                                                                                                                  | Contact the bank or use a different card                             |
| 5061| Exceeds Approval Amount | The card's payment limit was exceeded | Payment limit exceeded for this card. Change your limit settings or pay with a different card |
| 5062| 	Restricted Card 2                                          | 	The card cannot be used for payments                                                                                                                                                                                                                                            | 	Payments are not allowed for this card. Try a different card                      |
| 5063| 	Security Violation                                         | 	The card is blocked due to a security violation                                                                                                                                                                                                                               | 	Use a different card                                                   |
| 5065| 	Exceed Withdrawal Frequency                                | 	The card's transaction limit was exceeded                                                                                                                                                                                                                                               | 	Contact your bank or use a different card                      |
| 5082| 	Incorrect CVV                                              | 	The CVV code is incorrect                                                                                                                                                                                                                                                               | 	The CVV code entered is incorrect                                                         |
| 5091| 	Timeout                                                    | 	The issuer is unavailable                                                                                                                                                                                                                                                             | 	Try again later or use a different card                       |
| 5092| 	Cannot Reach Network                                       | The issuer is unavailable                                                                                                                                                                                                                                                              | 	Try again later or use a different card                       |
| 5096| 	System Error                                               | 	An error occurred on the acquiring bank's or network's side                                                                                                                                                                                                                                                 | 	Try again later                                                        |
| 5113| Gateways do not support the currently selected payment card | The gateway does not support non-Russian issuers                                                                                                                                                                                                                                              | Use a different card                                                    |
| 5204| 	Unable To Process                                          | 	The transaction could not be processed for other reasons                                                                                                                                                                                                                           | 	Contact your bank or use a different card                      |
| 5206| 	Authentication failed                                      | 	3D Secure authorization failed                                                                                                                                                                                                                                             | 	Contact your bank or use a different card                      |
| 5207| 	Authentication unavailable                                 | 	3D Secure authorization is unavailable                                                                                                                                                                                                                                              | 	Contact your bank or use a different card                      |
| 5300| Anti Fraud | There are acquirer limits on processing transactions  | 	Use a different card |
| 5303| Acquirer Terminal Limits Exceeded | The terminal's limit was exceeded | 	Contact your bank or use a different card |
| 5761| No Phone                                                    | The phone number is missing                                                                                                                                                                                                                                                      | Use a different card                                                    |
| 5762| Invalid Phone                                               | The phone number is incorrect                                                                                                                                                                                                                                                     | Use a different card                                                    |
| 5763| Different Phones                                            | The phone number in the request does not match                                                                                                                                                                                                                                             | Use a different card                                                    |
| 6001| SaveCardRefused | The account link was declined | The payment cannot be processed |
| 6002| InvalidErrorCode | The `code` value is incorrect | The payment cannot be processed |
| 6003| AgentIdNotExists | The `agentId` value is missing in the SBP OPCC | The payment cannot be processed |
| 6004| CurrencyNotValid | The transaction cannot be processed in the `{currency}` currency | Please contact website support |
| 6005| InvalidPaymentLink | The payment link data is incorrect | The payment cannot be processed |
| 6006| AmountCurrencyNotValid | The `amount` and `currency` fields must both be present or both be absent when `qrcType = 01` | The payment cannot be processed |
| 6007| InvalidRedirectUrl | The `redirectUrl` format is incorrect | The payment cannot be processed |
| 6008| InvalidParamsId | The `paramsId` data is incorrect | The payment cannot be processed |
| 6009| InvalidTtl | The usage period of the dynamic SBP payment link in the `qrTtl` field is outside the allowed range | The payment cannot be processed |
| 6010| SubscriptionNotFound | The account link was not found | The payment cannot be processed |
| 6011| InvalidSubscription | The account link data is incorrect | The payment cannot be processed |
| 6013| InvalidRefund | The request ID assigned by the merchant or merchant agent, `agentRefundRequestId`, is a duplicate | The payment cannot be processed |
| 6014| OriginalDetailsIncorrect | The request parameters differ from the parameters of the original SBP C2B transaction | The payment cannot be processed |
| 6015| TransactionNotFound | The requested transaction was not found | The payment cannot be processed |
| 6016| InvalidMemberId | The `memberId` value is missing in the SBP OPCC | The payment cannot be processed |
| 6017| IncorrectMCCategory | Operations are not allowed for this merchant category | The payment cannot be processed |
| 6021| Receiver Account Error | The recipient does not have a checking account at this bank | The payout cannot be processed |
| 6022| Receiver Name Error | The recipient does not have a checking account at this bank. The full name is incorrect | The payout cannot be processed |
| 6025| CrossTerminalTokenRestriction | Cross terminal payments are not allowed | The payment cannot be processed |


<aside class="notice">
For recurring payments, you need to set restrictions on sending repeat requests if error codes from the "Unconditionally negative" group were received.
This means that subsequent recurring payments will not go through, and you will need to perform the setup transaction again.<br />
<br />
Unconditionally negative<br />
5005    Do Not Honor<br />
5057    Transaction Not Permitted<br />
5003    Invalid Merchant<br />
5017    Customer Cancellation<br />
5033    Expired Card Pickup<br />
5034    Suspected Fraud<br />
5001    Refer To Card Issuer<br />
5012    Invalid Transaction<br />
<br />
After 2 attempts from the "Conditionally negative" and "Temporarily negative" groups, payment processing will be blocked for 24 hours.
Keep this rule in mind on your side for the error codes below.<br />
<br />
Conditionally negative<br />
5055    Invalid PIN<br />
5063    Security Violation<br />
5014    Invalid Card Number<br />
5030    Format Error<br />
5013    Amount Error<br />
5054    Expired Card<br />
<br />
Temporarily negative<br />
5065    Exceed Withdrawal Frequency<br />
5096    System Error<br />
5051    Insufficient Funds<br />
</aside>

## Codes for handling responses to the Check notification
Below are the codes for how your service registers responses to the [Check](notifications.md#check) notification

<aside class="notice">The code appears in the transaction details, as well as in the system log in the Dashboard.</aside>


| Code | Name | Reason |
|:--------- | :------- | :----------- |
3001  | InvalidInvoiceId | The notification handler returned `{"code":10}` |
3002  | InvalidAccountId | The notification handler returned `{"code":11}` |
3003  | InvalidAmount| The notification handler returned `{"code":12}` |
3004  | OutOfDate| The notification handler returned `{"code":20}` |
3005  | FormatError| The notification handler returned a code other than the [expected](notifications.md#check) one |
3006  | Unavailable | The service is unavailable |
3007  | UnableToConnect | The handler is not responding (`404`, `504`, `508`, etc.)|
3008  | NotAccepted | The notification handler returned `{"code":13}` |


## Operation types

The table below shows the operation type codes used in notifications.

| Code | Name |
|:--------- | :------- |
Payment |	Payment
Refund |	Refund
CardPayout |	Card payout

## Transaction statuses

The table below shows the transaction statuses, when they apply, and the possible actions.

| Status | Description | Required | Possible actions |
|:--------- | :------- | :----------- | :----------- |
| AwaitingAuthentication |	Awaiting authentication |	After the payer is redirected to the issuer's website, pending the 3D Secure result | None |
| Authorized |	Authorized |	After authorization is received |	Confirm, Cancel |
| Completed |	Completed |	After the transaction is confirmed |	Refund |
| Cancelled |	Cancelled |	If the transaction is cancelled |	None |
| Declined |	Declined |	If the transaction cannot be processed (insufficient funds on the card, etc.) |	None |

## Subscription statuses (recurring)

The table below shows the subscription statuses, when they apply, and the possible actions.

| Status | Description | Required | Possible actions |
|:--------- | :------- | :----------- | :----------- |
| Active |	Subscription is active |	After creation and the next successful payment |	Cancel |
| PastDue |	Overdue |	After one or two consecutive failed payment attempts |	Cancel |
| Cancelled |	Cancelled |	If cancelled upon request |	None |
| Rejected |	Declined |	If there are three consecutive failed payment attempts |	None |
| Expired |	Completed |	If the maximum number of periods (if specified) has been reached | None |

## List of currencies

Our partners accept payments in rubles, US dollars, euros, pounds sterling, and 54 other currencies worldwide.

The table below shows the currency names and their codes for use in the **currency** parameter of the [widget](mpf.md) or [API](api/index.md).

| Name | Code |
|:--------- | :------- |
|Russian ruble |	RUB
|Euro |	EUR
|US dollar | USD
|Pound sterling |	GBP
|Ukrainian hryvnia | UAH
|Belarusian ruble (not used since July 1, 2016) | BYR
|Belarusian ruble | BYN
|Kazakhstani tenge | KZT
|Azerbaijani manat | AZN
|Swiss franc | CHF
|Czech koruna |	CZK
|Canadian dollar |	CAD
|Polish zloty |	PLN
|Swedish krona |	SEK
|Turkish lira |	TRY
|Chinese yuan |	CNY
|Indian rupee |	INR
|Brazilian real |	BRL
|South African rand |	ZAR
|Uzbekistani som | UZS
|Bulgarian lev | BGN
|Romanian leu | RON
|Australian dollar | AUD
|Hong Kong dollar | HKD
|Georgian lari | GEL
|Kyrgyzstani som | KGS
|Armenian dram | AMD
|UAE dirham | AED

If the currency you need is not in the list, please write to us at support@cp.ru, and we will update it.

<aside class="notice">Russian legal entities and individual entrepreneurs intending to accept payments in a foreign currency need to agree on the desired list of currencies during the connection stage.</aside>

## Fiscal data operators

The table below shows the fiscal data operators that online cash registers can work with.

| Code | Operator name |
|:--------- | :------- |
PeterService |	PS ST LLC
FirstOfd |	Perviy OFD
Taxcom |	Taxcom
PlatformaOfd |	Platforma OFD
OfdYa |	OFD-Ya
OfdYandex |	Yandex OFD
Garantexpress |	Garant OFD
OfdAstralNalog |	Astral OFD
Sbis |	TENZOR LLC

## Time zone codes

The table below shows the time zone codes used for time conversion.

| Code | Name |
|:--------- | :------- |
HST	| (UTC-10:00) Hawaii
AKST | (UTC-09:00) Alaska
PST | (UTC-08:00) Pacific time (USA and Canada)
MST | (UTC-07:00) Mountain time (USA and Canada)
CST | (UTC-06:00) Central time (USA and Canada)
EST | (UTC-05:00) Eastern time (USA and Canada)
AST | (UTC-04:00) Atlantic time (Canada)
BRT	| (UTC-03:00) Brazil
UTC | (UTC) Time in UTC format
GMT | (UTC) Dublin, Lisbon, London, Edinburgh
CET | (UTC+01:00) Amsterdam, Berlin, Bern, Vienna, Rome, Stockholm
CET | (UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
CET | (UTC+01:00) Brussels, Copenhagen, Madrid, Paris
CET | (UTC+01:00) Warsaw, Zagreb, Sarajevo, Skopje
EET | (UTC+02:00) Athens, Bucharest
EET | (UTC+02:00) Vilnius, Kyiv, Riga, Sofia, Tallinn, Helsinki
EET | (UTC+02:00) Eastern Europe
EET | (UTC+02:00) Kaliningrad (RTZ 1)
MSK | (UTC+03:00) Volgograd, Moscow, St. Petersburg (RTZ 2)
MSK | (UTC+03:00) Minsk
AZT	| (UTC+04:00) Baku
AMT |	(UTC+04:00) Yerevan
SAMT |	(UTC+04:00) Izhevsk, Samara (RTZ 3)
GET |	(UTC+04:00) Tbilisi
TJT	| (UTC+05:00) Ashgabat, Tashkent
YEKT	| (UTC+05:00) Yekaterinburg (RTZ 4)
ALMT	| (UTC+06:00) Astana, Almaty
NOVT	| (UTC+06:00) Novosibirsk (RTZ 5)
KRAT	| (UTC+07:00) Krasnoyarsk (RTZ 6)
HKT	| (UTC+08:00) Hong Kong, Beijing, Ürümqi, Chongqing
IRKT	| (UTC+08:00) Irkutsk (RTZ 7)
SGT	| (UTC+08:00) Kuala Lumpur, Singapore
ULAT	| (UTC+08:00) Ulaanbaatar
YAKT	| (UTC+09:00) Yakutsk (RTZ 8)
VLAT	| (UTC+10:00) Vladivostok, Magadan (RTZ 9)
SAKT	| (UTC+11:00) Chokurdakh (RTZ 10)
ANAT	| (UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky (RTZ 11)



## Notification types

Below is the table of notification types.

| Code | Name |
|:--------- | :------- |
Check |	[Check](notifications.md#check)
Pay |	[Pay](notifications.md#pay)
Fail |	[Fail](notifications.md#fail)
Confirm |	[Confirm](notifications.md#confirm)
Refund |	[Refund](notifications.md#refund)
Recurrent |	[Recurrent](notifications.md#recurrent)
Cancel |	[Cancel](notifications.md#cancel)
