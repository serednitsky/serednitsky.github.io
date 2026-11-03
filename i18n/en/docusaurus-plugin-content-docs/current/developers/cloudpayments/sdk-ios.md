---
title: "iOS SDK"
keywords:
  - "iOS SDK"
---

# iOS SDK

The SDK lets you integrate payment acceptance into iOS mobile apps.
Main version can be found on <a href="https://gitpub.cloudpayments.ru/integrations/sdk/cloudpayments-ios" target="_blank">GitHub</a>.

The app will guide you through obtaining card data, generating a cryptogram, performing [3D Secure authentication](general-information.md#3d-secure), and processing a payment on an iPhone or iPad.

**Terms of use**:

*  If you need to route data through your own server, you do not need PCI DSS certification. The card data is sent in encrypted form, and the decryption keys are available only in the CloudPayments payment gateway. They are not included in the app or library.
*  Card details can be entered via keyboard or scanned using a service such as <a href="https://www.card.io/" target="_blank">card.io</a>. Never save or write to logs the full card number or CVV.
*  Do not use mobile SDK for mobile terminals (mPOS). The SDK is made to be used in apps that will be installed on the phones and tablets of your customers.
*  According to the <a href="https://developer.apple.com/app-store/review/guidelines/#purchasing-currencies" target="_blank">App Store</a> rules, mobile app developers are allowed to receive payments using external payment systems only when selling non-digital goods or digital products that can be used outside of the app.
