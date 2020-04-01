<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];

$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';  
$mail->SMTPAuth = true;
$mail->Username = 'phpmailer@inbox.ru';
$mail->Password = '2m7AeI1hoLt1He1TFFyml';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('phpmailer@inbox.ru');


// Кому будет уходить письмо 
$mail->addAddress('rakshenkodmitry@yandex.ru'); 
// $mail->addAddress('ellen@example.com');    

$mail->isHTML(true);                                 

$mail->Subject = 'Заявка с сайта VolgoElectrik';




if($name != ''){
	$mail->Body = 'Имя: ' .$name . '<br>' . 'Номер телефона: ' .$phone;
} else {
	$mail->Body = 'Номер телефона: ' .$phone;
}



$mail->AltBody = '';

$mail->send();
?>