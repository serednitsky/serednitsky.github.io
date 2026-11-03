---
title: "Checkout script"
keywords:
  - "Checkout script"
  - "Demo checkout"
  - "Requirements"
  - "Form requirements:"
  - "Cryptogram requirements:"
  - "PCI DSS security requirements:"
  - "Installation"
  - "The option of direct transmission to the script"
  - "The option with the input form:"
  - "When developing your own form or passing data directly to the script, please note the following:"
  - "Methods"
  - "Asynchronous method used to generate a cryptogram"
---

# Checkout script

Checkout is a script embedded into your website that collects card details from a specified form and uses them to generate a cryptogram for payment processing via our API.

The cryptogram is generated using the RSA algorithm with a 2048-bit key length and meets the standard for card data protection. If the requirements described below are followed, card details will not be accessible to you, but your server still impacts their security.

## Demo checkout

A demonstration of the [Checkout](checkout.md) script is available in our <a href="https://show.cloudpayments.ru/checkout/" target="_blank">demo store</a>.
You can use both [test card details](testing.md) and real ones for testing. No funds will be debited.

<iframe src="/slate-pages/demo_checkout.html" width="96%" scrolling="no" height="400px" align="baseline"  hspace="2px" vspace="2px" frameborder="0" seamless></iframe>

## Requirements

### Form requirements:

* Must operate over an HTTPS connection with a valid SSL certificate
* Form fields must not contain the `name` attribute, this prevents card details from reaching the server when the form is sent
* The field for entering the card number must support entry of 16 to 19 digits

### Cryptogram requirements:

* Must be generated exclusively by the original checkout script loaded from the system's official addresses
* The cryptogram must not be stored after the payment is made or reused for subsequent transactions

### PCI DSS security requirements:

From the PCI DSS perspective, this type of connection is classified as "E-commerce merchants who outsource all payment processing to PCI DSS validated third parties, and who have a website(s) that doesn’t directly receive cardholder data but that can impact the security of the payment transaction. No electronic storage, processing, or transmission of any cardholder data on the merchant’s systems or premises,", meaning that while payment data processing is handled by a third party, your website still impacts the security of card details.

To comply with the standard's requirements, complete the [SAQ-EP](https://www.pcisecuritystandards.org/documents/SAQ_A-EP_v3.docx) self-assessment questionnaire and undergo ASV testing on quarterly basis.

For more information on PCI compliance, see the [PCI DSS](pcidss.md) section.

## Installation

To generate a cryptogram, embed the **checkout** script into the payment form page:

```shell
<script src="https://checkout.cloudpayments.ru/checkout.js"></script>
```

<aside class="warning">Use <code>checkout.js</code> to maintain PCI compliance by ensuring that payment details are sent directly to CloudPayments without affecting your server. Always load <code>checkout.js</code> from https://widget.cloudpayments.ru to remain compliant. Do not bundle the script or host it yourself.</aside>

Choose the card data transmission method that best suits your needs:

* Direct transmission to the script
* Input form

Next, the generated cryptogram of a card must be sent to your server to trigger the payment method via [API](api/index.md).

### The option of direct transmission to the script

1) Initialize the checkout script

```js
const checkout = new cp.Checkout({
    publicId: 'test_api_000000000000000002',
});
```

2) Call the cryptogram generation method by passing the card details into it

```js
const fieldValues = {
    cvv: '911',
    cardNumber: '4242 4242 4242 4242',
    expDateMonth: '12',
    expDateYear: '24',
}

checkout.createPaymentCryptogram(fieldValues)
    .then((cryptogram) => {
        console.log(cryptogram);
    }).catch((errors) => {
        console.log(errors)
    });
```

### The option with the input form:

1) Create a card details input form:

```shell
<form id="paymentFormSample" autocomplete="off">
    <input type="text" data-cp="cardNumber">
    <input type="text" data-cp="expDateMonth">
    <input type="text" data-cp="expDateYear">
    <input type="text" data-cp="cvv">
    <input type="text" data-cp="name">
    <button type="submit">Pay 100 rubles.</button>
</form>
```

The input fields for card details must be tagged with the following attributes:

* **data-cp="cardNumber"**: card number field
* **data-cp="expDateMonth"**: expiration month field
* **data-cp="expDateYear"**: expiration year field
* **data-cp="CVV"**: CVV field
* **data-cp="name"**: field with the cardholder name and surname

2) Initialize the checkout script

```js
const checkout = new cp.Checkout({
    publicId: 'test_api_000000000000000002',
    container: document.getElementById("paymentFormSample")
});
```

3) Call the cryptogram generation method

```js
checkout.createPaymentCryptogram()
    .then((cryptogram) => {
        console.log(cryptogram); // The cryptogram
    }).catch((errors) => {
        console.log(errors)
    });
```

### When developing your own form or passing data directly to the script, please note the following:

* The card number length ranges from 16 digits (15 for AMEX cards) to 19 digits. Read more [here](https://en.wikipedia.org/wiki/Payment_card_number).
* The **checkout** script does not operate in outdated, insecure browsers that lack support for TLS encryption protocols version 1.1 or later. For example, Internet Explorer 7.
* The 3DS window can be displayed either in a new window or in a frame that overlays the page. The window dimensions must be at least 500x500 pixels.

## Methods

### Asynchronous method used to generate a cryptogram

In this method, if a card details validation error occurs, an error code will be returned instead of a localized message (see the example below).

`async createPaymentCryptogram(fieldValues: CardData): Promise&lt;string&gt;`

The method returns the Promise&lt;string&gt; containing the cryptogram. If the invalid data is passed, the Promise will be rejected with an error containing an object with a [list of errors](./handbook.md#error-codes).


```js
const checkout = new cp.Checkout({
    publicId: 'test_api_000000000000000002'
});

const fieldValues = {
    cvv: '911',
    cardNumber: '4242 4242 4242 4242',
    expDateMonth: '12',
    expDateYear: '24',
}

checkout.createPaymentCryptogram(fieldValues)
    .then((cryptogram) => {
        console.log(cryptogram);
    });
```

### CardData object description:

```js
export interface CardData {
    cvv?:  string; // CVV/CVC code
    cardNumber?: string; // Card number (spaces are ignored)
    expDateMonth?: string; // Card expiration month
    expDateYear?: string; // Card expiration year
    expDateMonthYear?: string; // Card expiration date (all non-digit characters are ignored)
    // If the string length is 2, 3, or 5 characters, the first digit is parsed as the month, and the rest as the year
    // If the string length is 4 or 6 characters, the first two digits are parsed as the month, and the rest as the year
}
```

Parameter | Description | Type | Required \*
--------- | ------- |  ------- |  -------
cvv | CVV/CVC code | string | No \*
cardNumber | Card number (spaces are ignored) | string | Optional if the field is bound to the form
expDateMonth | Card expiration month | string | Optional if the field is bound to the form or the `expDateMonthYear` field is specified
expDateYear | Card expiration year	| string | Optional if the field is bound to the form or the `expDateMonthr` and `expDateYear` fields are specified
expDateMonthYear | Card expiration date (all non-digit characters are ignored). If the string length is 2, 3, or 5 characters, the first digit is parsed as the month, and the rest as the year. If the string length is 4 or 6 characters, the first two digits are parsed as the month, and the rest as the year	| string | Optional if the field is bound to the form or the `expDateMonthr` and `expDateYear` fields are specified
name | Name of card owner	| string | No

<aside class="warning"> The <code>CardData</code> object itself is optional; you can omit it if you use HTML form binding.</aside>

### Error handling for card validation:

```js
const fieldValues = {
    cvv: '91', // Invalid CVV
    cardNumber: '4242 4242 4242 424', // Invalid card number
    expDateMonth: '12',
    expDateYear: '24',
}

checkout.createPaymentCryptogram(fieldValues)
    .then((cryptogram) => {
        console.log(cryptogram);
    })
		.catch((errors) => {
				console.log(errors);
  			 /* Will put out:
				{
        	cardNumber: "CardNumber_Invalid",
        	cvv: "Cvv_Invalid"
				}
				*/
});
```

Error code | Description
--------- | -------
CardNumber_Empty |	Card number is missing
CardNumber_Invalid |	Invalid card number
Cvv_Empty |	CVV is missing
Cvv_Invalid	| Invalid CVV
ExpDateMonthYear_Empty |	Expiration date is missing
ExpDateMonthYear_Invalid |	Invalid expiration date
ExpDateMonth_Empty |	Expiration month is missing
ExpDateMonth_Invalid |	Invalid expiration month
ExpDateYear_Empty |	Expiration year is missing
ExpDateYear_Invalid |	Invalid expiration year
Name_Empty |	Cardholder name is missing \*
Name_Invalid |	Invalid cardholder name \*
Name_TooLong |	Cardholder name is too long \*
Name_TooShort |	Cardholder name is too short \*

<aside class="notice"> * The <code>name</code> field is optional and is validated only if it is specified in the form or provided in the <code>CardData</code> object.</aside>

### Cryptogram generation method

The method returns a cryptogram upon successful generation or an object with a list of errors if card details contain any errors. Unlike the `createPaymentCryptogram` method, this error object contains localized Russian error descriptions instead of error codes.

`createCryptogramPacket(fieldValues: CardData):string of the object` — deprecated.

This method accepts an object with card details and can be used in the legacy HTML form binding implementation. If a form binding is used and the same parameter is found in the `CardData` object, an error will be thrown when attempting to generate the cryptogram.

Script for cryptogram generation:

```js
this.createCryptogram = function () {
    var result = checkout.createCryptogramPacket();

    if (result.success) {
        // The cryptogram is generated
        alert(result.packet);
    }
    else {
        // Input data validation failed; the `result.messages` object is formatted as follows:
        // { name: "The cardholder name contains too many characters", cardNumber: "Invalid Card Number" }
        // Where `name` and `cardNumber` correspond to the values of the `<input ... data-cp="cardNumber">` attributes
       for (var msgName in result.messages) {
           alert(result.messages[msgName]);
       }
    }
};

$(function () {
    /* checkout initialization */
    checkout = new cp.Checkout(
    // Public ID from the dashboard
    "test_api_00000000000000000000001",
    // The tag that contains the card details fields
    document.getElementById("paymentFormSample"));
});
```
