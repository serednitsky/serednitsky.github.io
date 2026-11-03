---
title: "Android SDK"
keywords:
  - "Android SDK"
---

# Android SDK

The SDK allows you to integrate payment acceptance into a mobile app for the Android platform.
The main version is available on <a href="https://gitpub.cloudpayments.ru/integrations/sdk/cloudpayments-android" target="_blank">GitHub</a>.

The app explains how to obtain card details, generate a cryptogram, perform [3D Secure authorization](general-information.md#3d-secure), and make a payment on an Android device.

**Terms of use**:

*  If you need to route data through your own server, you do not need PCI DSS certification. The card data is sent in encrypted form, and the decryption keys are only available in the CloudPayments payment gateway. They are not included in the app or library.
*  Card details can be entered via keyboard or scanned using a service such as <a href="https://www.card.io/" target="_blank">card.io</a>. Never save or log the full card number or CVV.
*  Do not use mobile SDK for mobile point-of-sale (mPOS) terminals. The SDK is intended for apps installed on the phones and tablets of your customers.
*  According to the <a href="https://play.google.com/about/monetization-ads/" target="_blank">Google Play</a> rules, mobile app developers are allowed to accept payments through third-party payment systems only when selling non-digital products or digital products that can be used outside of the app.
