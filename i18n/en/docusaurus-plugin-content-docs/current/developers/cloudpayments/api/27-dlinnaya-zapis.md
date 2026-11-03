---
title: "Airline addendum"
keywords:
  - "Airline addendum"
---

# Airline addendum

An **airline addendum** provides extended flight itinerary details that are passed along with the transaction to the payment system for processing. Utilizing an airline addendum reduces fraud risks and lowers payment processing costs.

An airline addendum consists of itinerary information, flight segment (leg) details, and passenger data.

Itinerary information includes the following parameters:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
BookingRef |	string |	Required if the ticket number is omitted |	Booking reference
TicketNumber |	string |	Required if the booking reference is omitted |	Ticket number

A flight segment (leg) refers to a single non-stop flight from takeoff to landing. You must provide details for all route segments using the following parameters:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
FlightNumber |	string |	Yes |	Flight number
DepartureDateTime |	DateTime |	Yes |	Departure date and time
ArrivalDateTime |	DateTime |	Yes |	Arrival date and time
OriginatingCountry |	string |	Yes |	Country of departure in Russian or English
OriginatingCity |	string |	Yes |	City of departure in Russian or English
OriginatingAirportCode |	string(3) |	Yes |	Departure airport code: 3-letter IATA
DestinationCountry |	string |	Yes |	Country of arrival in Russian or English
DestinationCity |	string |	Yes |	City of arrival in Russian or English
DestinationAirportCode |	string(3) |	Yes |	Arrival airport code: 3-letter IATA

To pass passenger information, you must provide the first name and last name in Latin characters for each passenger:

Parameter | Format | Required | Description
--------- | ------- | ----------- | -----------
FirstName |	string |	Yes |	Passenger first name
LastName |	string |	Yes |	Passenger last name

An airline addendum can be passed to the system in the **AirlineAddendum** parameter when calling a payment method via the [API](index.md) or in response to a [payment verification request](../notifications.md#check).

**Airline addendum example:**

```llvm
{
   "TicketNumber":"390 5241025377",
   "BookingRef":null,
   "Legs":[
      {
         "FlightNumber":"A3 971",
         "DepartureDateTime":"2014-05-26T05:15:00",
         "ArrivalDateTime":"2014-05-26T07:30:00",
         "OriginatingCountry":"Russia",
         "OriginatingCity":"Moscow",
         "OriginatingAirportCode":"DME",
         "DestinationCountry":"Greece",
         "DestinationCity":"Athens",
         "DestinationAirportCode":"ATH"
      },
      {
         "FlightNumber":"A3 204",
         "DepartureDateTime":"2014-05-26T09:45:00",
         "ArrivalDateTime":"2014-05-26T10:50:00",
         "OriginatingCountry":"Greece",
         "OriginatingCity":"Athens",
         "OriginatingAirportCode":"ATH",
         "DestinationCountry":"Greece",
         "DestinationCity":"Rhodes",
         "DestinationAirportCode":"RHO"
      },
      {
         "FlightNumber":"A3 980",
         "DepartureDateTime":"2014-06-06T09:00:00",
         "ArrivalDateTime":"2014-06-06T13:45:00",
         "OriginatingCountry":"Greece",
         "OriginatingCity":"Rhodes",
         "OriginatingAirportCode":"RHO",
         "DestinationCountry":"Russia",
         "DestinationCity":"Moscow",
         "DestinationAirportCode":"DME"
      }
   ],
   "Passengers":[
      {
         "FirstName":"KONSTANTIN",
         "LastName":"IVANOV"
      },
      {
         "FirstName":"JULIA",
         "LastName":"IVANOVA"
      }
   ]
}
```
