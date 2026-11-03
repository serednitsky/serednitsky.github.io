---
title: "Скрипт checkout"
keywords:
  - "Скрипт checkout"
  - "Demo checkout"
  - "Требования"
  - "Требования к форме:"
  - "Требования к криптограмме:"
  - "Требования к безопасности по PCI DSS:"
  - "Установка"
  - "Вариант с передачей карточных данных напрямую в скрипт"
  - "Вариант с использованием формы:"
  - "При разработке собственной формы или передачи данных в скрипт обратите внимание на следующие моменты:"
  - "Методы"
  - "Асинхронный метод для генерации криптограммы."
---

# Скрипт checkout

Checkout — скрипт, который прописывается на вашем сайте, собирает из указанной формы карточные данные и составляет из них криптограмму для оплаты через наш API.

Криптограмма формируется алгоритмом RSA с длиной ключа в 2048 бит и удовлетворяет стандарту по защите карточных данных. При соблюдении описанных ниже требований карточные данные к вам не попадают, но ваш сервер всё равно влияет на их безопасность.

## Demo checkout

Демонстрация работы скрипта [Checkout](checkout.md)  представлена в нашем <a href="https://show.cloudpayments.ru/checkout/" target="_blank"> демо-магазине</a>.  
Для тестирования можно использовать как [тестовые карточные данные](testing.md), так и реальные. Списания денежных средств не произойдет.

<iframe src="/slate-pages/demo_checkout.html" width="96%" scrolling="no" height="400px" align="baseline"  hspace="2px" vspace="2px" frameborder="0" seamless></iframe>

## Требования

### Требования к форме:

* Должна работать по HTTPS-соединению с валидным SSL-сертификатом.
* На полях не должно быть атрибута "name" — это предотвращает попадание карточных данных на сервер при отправке формы.
* Поле для ввода номера карты должно поддерживать ввод от 16 до 19 цифр.

### Требования к криптограмме:

* Должна формироваться только оригинальным скриптом checkout, загруженным с адресов системы.
* Криптограмму нельзя хранить после оплаты и использовать повторно.

### Требования к безопасности по PCI DSS:

С точки зрения PCI DSS, подобный способ подключения классифицируется как "E-commerce merchants who outsource all payment processing to PCI DSS validated third parties, and who have a website(s) that doesn’t directly receive cardholder data but that can impact the security of the payment transaction. No electronic storage, processing, or transmission of any cardholder data on the merchant’s systems or premises.", то есть обработка платежных данных выполняется третьей стороной, но сайт влияет на безопасность карточных данных.

Для соблюдения требований стандарта, необходимо заполнять лист самооценки [SAQ-EP](https://www.pcisecuritystandards.org/documents/SAQ_A-EP_v3.docx) и ежеквартально проходить ASV-тестирование.

Подробнее про соответствие требованиям PCI читайте в разделе [PCI DSS](pcidss.md).

## Установка

Для создания криптограммы необходимо прописать на странице с платежной формой скрипт **checkout**:

```shell
<script src="https://checkout.cloudpayments.ru/checkout.js"></script>
```

<aside class="warning">Используйте checkout.js, чтобы оставаться совместимым с PCI, гарантируя, что платежные реквизиты отправляются напрямую в CloudPayments, не затрагивая ваш сервер. Всегда загружайте checkout.js с https://checkout.cloudpayments.ru, чтобы соответствовать требованиям. Не включайте скрипт в пакет и не размещайте его самостоятельно.</aside>  

Выбрать удобный для вас вариант передачи карточных данных:  

* Передача в скрипт  
* Форма для ввода  

Далее созданную криптограмму карты необходимо отправить на сервер и вызывать метод оплаты через [API](api/index.md).

### Вариант с передачей карточных данных напрямую в скрипт

1) Инициализировать скрипт checkout

```js
const checkout = new cp.Checkout({
    publicId: 'test_api_000000000000000002',
});
```

2) Вызвать метод генерации криптограммы, передав в него карточные данные

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

### Вариант с использованием формы:

1) Создать форму для ввода карточных данных:

```shell
<form id="paymentFormSample" autocomplete="off">
    <input type="text" data-cp="cardNumber">
    <input type="text" data-cp="expDateMonth">
    <input type="text" data-cp="expDateYear">
    <input type="text" data-cp="cvv">
    <input type="text" data-cp="name">
    <button type="submit">Оплатить 100 р.</button>
</form>
```

Поля ввода карточных данных должны быть помечены атрибутами: 

* **data-cp="cardNumber"** — поле с номером карты;
* **data-cp="expDateMonth"** — поле с месяцем срока действия;
* **data-cp="expDateYear"** — поле с годом срока действия;
* **data-cp="cvv"** — поле с кодом CVV;
* **data-cp="name"** — поле с именем и фамилией держателя карты.

2) Инициализировать скрипт checkout

```js
const checkout = new cp.Checkout({
    publicId: 'test_api_000000000000000002',
    container: document.getElementById("paymentFormSample")
});
```

3) Вызвать метод генерации криптограммы

```js
checkout.createPaymentCryptogram()
    .then((cryptogram) => {
        console.log(cryptogram); // криптограмма
    }).catch((errors) => {
        console.log(errors)
    });
```

### При разработке собственной формы или передачи данных в скрипт обратите внимание на следующие моменты:

* длина номера карты составляет от 16 (15 для карт AMEX)  до 19 цифр. Подробнее [тут](https://en.wikipedia.org/wiki/Payment_card_number);  
* скрипт checkout не работает в устаревших, небезопасных браузерах, которые не поддерживают протоколы шифрования TLS версии 1.1 или выше. Например, в Internet Explorer 7;  
* окно 3DS можно показывать как в новом окне, так и во фрейме поверх страницы. Размер окна должен быть не менее 500х500 пикселей.  

## Методы

### Асинхронный метод для генерации криптограммы.  

В данном методе при ошибке валидации карточных данных - вместо локализованного сообщения будет выдан код ошибки пример см. ниже.

`async createPaymentCryptogram(fieldValues: CardData): Promise&lt;string&gt;`

Метод возвращает Promise&lt;string&gt; содержащий криптограмму. В случае если переданы некорректные данные Promise будет отклонен с ошибкой содержащей объект со списком ошибок.


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

### Описание объекта CardData:

```js
export interface CardData {
    cvv?:  string; // CVV/CVC код
    cardNumber?: string; // Номер карты, наличие пробелов не имеет значения
    expDateMonth?: string; // Срок действия карты - месяц
    expDateYear?: string; // Срок дейcтвия карты - год
    expDateMonthYear?: string; // Срок действия карты, все символы за исключением цифр игнорируются, 
    //Если длина строки 2,3 или 5 символов то первая цифра воспринимается как месяц, оставшиеся как год. 
    //Если длина строки 4 или 6 символов то первые два трактуются как месяц, а оставшиеся как год.
}
```

Параметр | Описание | Тип | Обязательный *
--------- | ------- |  ------- |  ------- 
cvv | CVV/CVC код | string | Нет *
cardNumber | Номер карты, наличие пробелов не имеет значения | string | Не обязательный, если поле привязано в форме
expDateMonth | Срок действия карты - месяц | string | Не обязательный, если поле привязано в форме или передано поле `expDateMonthYear`
expDateYear | Срок дейcтвия карты - год	| string | Не обязательный, если поле привязано в форме или переданы поля `expDateMonth` и `expDateYear`
expDateMonthYear | Срок действия карты, все символы за исключением цифр игнорируются. Если длина строки 2, 3 или 5 символов то первая цифра воспринимается как месяц, оставшиеся как год. Если длина строки 4 или 6 символов то первые два трактуются как месяц, а оставшиеся как год.	| string | Не обязательный, если поле привязано в форме или переданы поля `expDateMonth` и `expDateYear`
name | Имя владельца карты	| string | Нет

<aside class="warning"> Сам объект CardData обязательным не является, вы можете не передавать его если используете привязку к HTML-форме.</aside>

### Обработка ошибок валидации карточных данных:

```js
const fieldValues = {
    cvv: '91', // Невалидный CVV
    cardNumber: '4242 4242 4242 424', // Невалидный номер карты
    expDateMonth: '12',
    expDateYear: '24',
}

checkout.createPaymentCryptogram(fieldValues)
    .then((cryptogram) => {
        console.log(cryptogram);
    })
		.catch((errors) => {
				console.log(errors);
  			 /* Выведет
				{
        	cardNumber: "CardNumber_Invalid",
        	cvv: "Cvv_Invalid"
				}
				*/
});
```

Код ошибки | Описание
--------- | ------- 
CardNumber_Empty |	Пустой номер карты
CardNumber_Invalid |	Некорректный номер карты
Cvv_Empty |	Пустой CVV
Cvv_Invalid	| Некорректный CVV
ExpDateMonthYear_Empty |	Пустой год и месяц
ExpDateMonthYear_Invalid |	Некорректный год и месяц
ExpDateMonth_Empty |	Пустой месяц
ExpDateMonth_Invalid |	Некорректный месяц
ExpDateYear_Empty |	Пустой год
ExpDateYear_Invalid |	Некорректный год
Name_Empty |	Пустое имя *
Name_Invalid |	Некорректное имя *
Name_TooLong |	Слишком длинное имя *
Name_TooShort |	Слишком короткое имя *

<aside class="notice"> * Поле name не является обязательным и валидируется только если указано в форме или передано в объекте CardData.</aside>

### Метод для генерации криптограммы

Метод возвращает криптограмму в случае успешной генерации и объект со списком ошибок в случае наличия ошибок в карточных данных - в отличие от метода createPaymentCryptogram, объект со списком ошибок содержит не коды ошибок, а локализованные на русский язык описания ошибок. 

`createCryptogramPacket(fieldValues: CardData):string|object` - устаревший.

Метод может принимать на вход объект с карточными данными и может использоваться в устаревшей схеме с привязкой к HTML-форме. В случае если используется и привязка формы и этот же параметр найден в объекте CardData при попытке сформировать криптограмму будет выброшена ошибка.

Cкрипт для создания криптограммы:

```js
this.createCryptogram = function () {
    var result = checkout.createCryptogramPacket();

    if (result.success) {
        // сформирована криптограмма
        alert(result.packet);
    }
    else {
        // найдены ошибки в введённых данных, объект `result.messages` формата: 
        // { name: "В имени держателя карты слишком много символов", cardNumber: "Неправильный номер карты" }
        // где `name`, `cardNumber` соответствуют значениям атрибутов `<input ... data-cp="cardNumber">`
       for (var msgName in result.messages) {
           alert(result.messages[msgName]);
       }
    }
};

$(function () {
    /* Создание checkout */
    checkout = new cp.Checkout(
    // public id из личного кабинета
    "test_api_00000000000000000000001",
    // тег, содержащий поля данных карты
    document.getElementById("paymentFormSample"));
});
```
