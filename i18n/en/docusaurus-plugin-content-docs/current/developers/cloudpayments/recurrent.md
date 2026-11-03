---
title: "Recurring payments"
keywords:
  - "Recurring payments"
  - "Start and stop recurring payments"
  - "Payment schedule customization"
  - "Select the billing period and interval"
  - "Select the billing start date"
  - "Payment limit restrictions"
  - "Plan suspension"
  - "Payment amount customization"
  - "Initial payment amount"
  - "Recurring payment amount"
  - "Automated error resolution"
  - "Interaction with the cardholder"
---

# Recurring payments

Recurring payments, also known as subscription payments or automated payments, let you charge the customer's bank card regularly without requiring the payer to re-enter card details or initiate each payment.  

Recurring payments always start with the initial payment, for which the payer must enter the details of his card. For subsequent recurring payments, you must familiarize the cardholder with the billing schedule and obtain their consent for direct debiting.  

There is a common belief that recurring billing simply boils down to setting an amount to be charged to the customer's card each month. Consequently, the choice of a recurring payment provider is often based solely on the cost of the services. In reality, the process is more complex, because quality service requires far more features and capabilities. We have done everything to make launching and processing recurring payments in CloudPayments as simple and flexible as possible.

## Start and stop recurring payments


Recurring payments can be started at any time after the initial payment: immediately, one week later, or one month later. There is only one restriction: the interval between recurring payments, as well as between the initial payment and the first recurring payment, cannot exceed one year.  

*Example:* the customer pays for the first month of service through an initial payment and agrees to monthly debiting from their card starting from the second month.  
Recurring payments can be started via [API](api/17-sozdanie-podpiski-na-rekurrentnye-platezhi.md) or [payment widget](mpf.md).

If the customer cancels further payments, you can terminate the subscription at any time:  

* From the <a href="https://merchant.cloudpayments.ru/login" target="_blank">dashboard</a>
* Via the [API](api/21-otmena-podpiski-na-rekurrentnye-platezhi.md)


Additionally, the payer can independently find and cancel their recurring payments on the<a href="https://my.cloudpayments.ru/ru/unsubscribe" target="_blank">CloudPayments website.</a>

## Payment schedule customization  

### Select the billing period and interval  
The system can make recurring payments every 2 weeks, once a month, every 3 months, and so on: you can specify any billing period.

### Select the billing start date
Recurring payments can be started immediately when you create a subscription or with a delay. 
  
*Example:* a customer subscribes to your service in the middle of the month, you create a monthly recurring payments plan that starts on the 15th of the next month.

### Payment limit restrictions

You can specify the maximum amount of payments for a subscription or create a plan with no restrictions. In the former case, recurring payments will automatically stop once all payments in the billing schedule have been completed.  

*Example:* a customer purchases a product worth 12,000 rubles under a one-year installment plan, pays 1,000 rubles as the initial payment, and subscribes to a recurring payment plan of 1,000 rubles per month for no more than 11 charges.

### Plan suspension

A recurring payment subscription can be suspended for any period of time from the dashboard or via [API](api/20-izmenenie-podpiski-na-rekurrentnye-platezhi.md).   

*Example:* a customer requests to pause the service for a couple of months, so you push back the next payment date by the corresponding period.

## Payment amount customization

### Initial payment amount
The initial payment amount can be flexible and may differ from the amount of subsequent recurring payments.  

*Example:* when a customer registers for your service, you ask them to make a setup payment of 1 ruble to verify the card. Afterward, with the user's consent, you can start recurring payments for any amount.

### Recurring payment amount

The recurring payment amount can be changed at any point during the subscription plan lifecycle from the <a href="https://merchant.cloudpayments.ru/login" target="_blank">dashboard</a> or via the [API](api/20-izmenenie-podpiski-na-rekurrentnye-platezhi.md).  

*Example:* you provide the customer with a discount for the first 2 months of using the service, and then increase the subscription amount.

### Automated error resolution

Errors that occur during recurring payment execution can be divided into: recoverable and unrecoverable  

The first category includes errors related to a lack of funds on the customer's card, temporary technical issues, or unavailability of the card issuer. As a rule, these problems can be resolved by the cardholder.  

The second category covers errors that cannot be fixed, such as an expired card, a lost card, or a revoked license of the issuing bank.  

Depending on the category, the system responds to and processes recurring payment errors differently.  

### Interaction with the cardholder

If the card is declined due to insufficient funds, the system notifies the cardholder that the scheduled payment failed, recommends topping up the card balance, and informs them that a retry attempt will be made the following day.

### Retry attempts

The system retries the card charges for several consecutive days if a scheduled payment fails due to a recoverable error.

### Card update

The system prompts the user to enter new card details via its interface to resume recurring payments. If the customer agrees, the system executes a new initial payment using the updated card details, credits the payment to the subscription and continues to process recurring payments using the new card.

### Customer notification

An important function of recurring payments is to timely inform the cardholder about the upcoming scheduled payment date. Some customers can be forgetful, so a warning about an upcoming payment eliminates the element of surprise and significantly reduces the likelihood of insufficient funds on the card. CloudPayments always reminds payers of the date of the next payment, specifying the amount, purpose, and the recipient of the payment.
