---
title: "Testing"
keywords:
  - "Testing"
  - "Online cash registers testing"
---

# Testing

As soon as the new website is launched in the dashboard, it is in test mode which means that payments and other transactions will be emulated.

You can use the following cards for testing:

Type | Card number | Payment result | Token payment result
--------- | :-------: | :-----------: | :-----------: 
Visa with 3D Secure | 4242 4242 4242 4242 | Successful | Successful
Mastercard with 3D Secure | 5555 5555 5555 4444 | Successful | Successful
Mir with 3D Secure | 2200 0000 0000 0004 | Successful | Successful
Visa with 3D Secure | 4012 8888 8888 1881 | Insufficient funds | —
Mastercard with 3D Secure | 5105 1051 0510 5100 | Insufficient funds | —
Mir with 3D Secure | 2202 2022 0220 2200 | Insufficient funds | —
Visa without 3D Secure | 4000 0000 0000 3055 | Successful | Successful
Mastercard without 3D Secure | 5205 0000 0000 3055 | Successful | Successful
Mir without 3D Secure | 2202 0000 0000 3055 | Successful | Successful
Visa without 3D Secure | 4111 1111 1111 1111 | Successful | Insufficient funds
Mastercard without 3D Secure | 5200 8282 8282 8210 | Successful | Insufficient funds
Mir without 3D Secure | 2200 0000 2222 2222 | Successful | Insufficient funds
Visa without 3D Secure | 4000 0566 5566 5556 | Insufficient funds | —
Mastercard without 3D Secure | 5404 0000 0000 0043 | Insufficient funds | —
Mir without 3D Secure | 2203 0000 0000 0043 | Insufficient funds | —

<aside class="notice">The expiration date can be any future date, and the CVV code can be any value.</aside>

## Online cash registers testing

When operating in test mode, fiscal receipts are generated using a demo cash register with a test fiscal drive.
