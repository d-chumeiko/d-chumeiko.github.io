<?php

/* https://api.telegram.org/bot1021297871:AAF0Ni-B5ao3NveY9ozukwz5-iXOU-dJIK4/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$userMsg= $_POST['user_msg'];

$token = "1021297871:AAF0Ni-B5ao3NveY9ozukwz5-iXOU-dJIK4";
$chat_id = "-273370922";

$arr = array(
  'Имя пользователя: ' => $name,
  'Почта: ' => $email,
  'Сообщение' => $userMsg
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if (!$sendToTelegram) {
  echo "<h1>Возникла ошибка! Напишите нам: <br> <a href='https://t.me/Your_Manager01'>Написать в Телеграм</a></h1>";
}
?>			