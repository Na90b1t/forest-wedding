<?php
// send.php

// Устанавливаем заголовок для правильной кодировки
header("Content-Type: text/html; charset=UTF-8");

// Получаем JSON-данные от fetch
$data = json_decode(file_get_contents("php://input"));

// Отладка: раскомментируй, если нужно посмотреть, что приходит
// var_dump($data);

// Проверяем, что имя передано
if (!empty($data->name)) {
    $name = htmlspecialchars($data->name);
    $attendance = !empty($data->attendance) ? htmlspecialchars($data->attendance) : 'не указано';
    $drink = !empty($data->drink) ? htmlspecialchars($data->drink) : 'не указано';

    // Формируем строку для записи
    $log = date('Y-m-d H:i:s') . " | Имя: $name | Присутствие: $attendance | Напиток: $drink\n";

    // Записываем в файл
    if (file_put_contents('messages.txt', $log, FILE_APPEND | LOCK_EX)) {
        echo "Спасибо! Данные успешно записаны.";
    } else {
        echo "Ошибка при записи данных.";
    }
} else {
    echo "Пожалуйста, укажите ваше имя.";
}
?>