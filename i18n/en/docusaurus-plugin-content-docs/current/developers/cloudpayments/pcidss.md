---
title: "PCI DSS"
keywords:
  - "PCI DSS"
  - "Compliance requirements"
  - "PCI DSS compliance with CloudPayments"
  - "Checkout technology"
  - "ASV scanning"
---

# PCI DSS

PCI DSS is an information security standard adopted by the Visa and Mastercard payment card industry. All companies that accept card payments must comply with the standard's requirements. Some companies are also required to validate their compliance.

## Compliance requirements

The core requirement of the standard is to restrict access to payment card details as much as possible. The best solution is not to have access to this data at all and instead use certified payment providers to accept payments. In practice, this means that you must neither request nor pass card numbers. If a customer calls to report a failed payment and starts dictating their card number, you should stop them and explain why you cannot receive card details. If a customer sends card details by email or Skype, delete the message and explain that transmitting card details is not secure.

Protected data includes the full card number and the CVV2/CVC2 code (the last three digits on the back of the card). The cardholder's name, expiration date, and masked card number (the first six and last four digits) do not require the same level of standard protection and so they can be used within reasonable limits.

## PCI DSS compliance with CloudPayments

CloudPayments is a certified service provider with the highest level of PCI DSS compliance, allowing it to store payment card data and process over 6 million transactions annually. Compliance is confirmed annually as part of the certification audit.

All CloudPayments payment tools are designed to ensure that by using them, you automatically comply with security requirements. No additional measures are required.

The only exception is accepting payments via [Checkout](checkout.md) technology. To use `Checkout`, you must validate your compliance independently: by completing a self-assessment questionnaire and scanning your website for vulnerabilities with a specialized scanner every quarter.

## Checkout technology

[Checkout](checkout.md) is a card tokenization technology for accepting payments on your website through a payment form without embedded `iframe` elements, providing maximum control and payment conversion. The payment card data is encrypted in the customer's browser, so your website is not involved in processing and storing card numbers. This significantly reduces the scope of PCI DSS requirements that apply to your website. Nevertheless, the website still impacts the security of card data. To protect your website, you must scan it for malware and vulnerabilities at least once every quarter. The scan must be performed by an Approved Scanning Vendor (ASV) from the list provided by the PCI Council.

## ASV scanning

ASV scanning is an automated check of your website for vulnerabilities. The scanner checks for malware and known vulnerabilities, such as XSS and SQL injection, and generates a detailed report with instructions for resolving any issues found.

Using an ASV scanner is required to accept payments with [Checkout](checkout.md) technology. It is not required for other CloudPayments tools, including the payment widget, mobile SDK, recurring payments, and subscriptions.

You can choose any scanning vendor, provided that it is included in the <a href="https://www.pcisecuritystandards.org/assessors_and_solutions/approved_scanning_vendors" target="_blank">PCI Council's list of approved scanning vendors</a>.
