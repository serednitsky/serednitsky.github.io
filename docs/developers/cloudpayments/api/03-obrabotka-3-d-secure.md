---
title: "Обработка 3-D Secure"
keywords:
  - "Обработка 3-D Secure"
  - "Пример формы:"
---

# Обработка 3-D Secure

Для проведения [3-D Secure аутентификации](../general-information.md#3-d-secure) нужно отправить плательщика на адрес, указанный в параметре **AcsUrl** [ответа сервера](02-oplata-po-kriptogramme.md#sample-3ds-required) с передачей следующих параметров:

* **MD** — параметр TransactionId из ответа сервера;
* **PaReq** — одноименный параметр из ответа сервера;
* **TermUrl** — адрес на вашем сайте для возврата плательщика после аутентификации.

<aside class="notice">Регистр букв в названии параметров имеет значение.</aside>

## Пример формы

```shell
<form name="downloadForm" action="AcsUrl" method="POST">
    <input type="hidden" name="PaReq" value="eJxVUdtugkAQ/RXDe9mLgo0Z1nhpU9PQasWmPhLYAKksuEChfn13uVR9mGTO7MzZM2dg3qSn0Q+X\nRZIJxyAmNkZcBFmYiMgxDt7zw6MxZ+DFkvP1ngeV5AxcXhR+xEdJ6BhpEZnEYLBdfPAzg56JKSKT\nAhqgGpFB7IuSgR+cl5s3NqFTG2NAPYSUy82aETqeWPYUUAdB+ClnwSmrwtz/TbkoC0BtDYKsEqX8\nZfZkDGgAUMkTi8synyFU17V5N2nKCpBuAHRVs610VijCJgmZu17UXTxhFWP34l7evYPlegsHkO6A\n0C85o5hMsI3piNIZHc+IBaitg59qJYzgdrUOQK7/WNy+3FZAeSqV5cMqAwLe5JlQwpny8T8HdFW8\netFuBqUyahV+Hjf27vWCaSx22fe+KY6kXKZfJLK1x22TZkyUS8QiHaUGgDQN6s+H+tOq7O7kf8hd\nt30=">
    <input type="hidden" name="MD" value="504">
    <input type="hidden" name="TermUrl" value="https://example.com/post3ds?order=1234567">
</form>
<script>
    window.onload = submitForm;
    function submitForm() { downloadForm.submit(); }
</script>
```

<aside class="notice">После аутентификации плательщик будет возвращен на TermUrl с параметрами MD и PaRes, переданными методом POST.</aside>


<br />

Для завершения оплаты выполните следующий метод Post3ds.

**Адрес метода:**   
https://api.cloudpayments.ru/payments/cards/post3ds  

**Параметры запроса:**  

Параметр | Формат | Применение | Описание
--------- | ------- | ----------- | ----------- 
TransactionId | Long | Обязательный | Значение параметра MD
PaRes | String | Обязательный | Значение одноименного параметра

В ответ на корректно сформированный запрос сервер вернет либо информацию об [успешной транзакции](02-oplata-po-kriptogramme.md#sample-approved), либо — [об отклоненной](02-oplata-po-kriptogramme.md#sample-declined).
