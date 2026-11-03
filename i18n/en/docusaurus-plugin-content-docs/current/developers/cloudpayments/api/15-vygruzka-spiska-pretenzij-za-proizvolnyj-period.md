---
title: "Export chargeback list for a custom period"
keywords:
  - "Export chargeback list for a custom period"
---

# Export chargeback list for a custom period

Method for exporting the chargeback list for a custom period (up to 1 year). To perform the export, you must send an HTTP request using the "Basic Auth" authorization type. Use the terminal's public key (PK) as the username.

The exported list includes all chargebacks recorded for the specified period. The results are sorted by `Date`, from the oldest to the newest, with a limit of 100 items per page.

**Endpoint:**
https://api.cloudpayments.ru/chargebacks/list

**Request parameters:**

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
CreatedDateGte | date | Yes | Chargeback creation start date
CreatedDateLte | date | Yes | Chargeback creation end date
PageNumber | number | Yes | Page number, must be greater than or equal to 1

**Request example:**

```llvm
{
    "PageNumber": 1,
    "CreatedDateGte":"2021-03-09T00:00:00+03:00",
    "CreatedDateLte":"2021-03-10T00:00:00+03:00"
}
```

**Response parameters:**

|Parameter | Format | Required|
|--- | --- | ---|
|Success | bool | Request success flag|
|Message | string | Error description in case of failure|
|Model | object | Chargeback response model|
|ChargeBackId | string | Chargeback ID|
|TransactionId | numberLong | Transaction ID associated with the chargeback|
|TerminalUrl | string | Website|
|Gateway | string | Bank|
|Operation | string | Operation, possible values:<br />`Presentment`: chargeback presentment<br />`Representment`: chargeback representment|
|Type | string | Type, possible values:<br />`Chargeback`: chargeback dispute<br />`Fee`: chargeback fee|
|Card | string | Masked card number|
|Date | date | Chargeback registration date at the bank|
|Amount | decimal | Amount|
|Currency | string | Currency|

**Example response:**

```llvm
{
    "Model": [
        {
            "ChargeBackId": "6811d4a17bab1c4b44c19371",
            "TerminalUrl": "https://cloudpayments.ru/",
            "TransactionId": 2200203594,
            "Amount": 100,
            "Currency": "RUB",
            "Type": "Chargeback",
            "Operation": "Presentment",
            "Card": "520500*******3055",
            "Gateway": "SberbankRu",
            "Date": "/Date(1745960400000)/"
        }
    ],
    "Success": true,
    "Message": null,
    "ErrorCode": null
}
```
