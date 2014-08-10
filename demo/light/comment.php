<?php
//$img = $_POST['file'];
$name = $_POST['author'];
$email = $_POST['email'];
$message = $_POST['comment'];
 
$to = 'youremail@gmail.com';
$subject = 'Message From (Bingos) Your Website Comment Form';

$body = "";
$body .= "Author: ";
$body .= $name;
$body .= "\n\n";

$body .= "";
$body .= "Comment: ";
$body .= $message;
$body .= "\n";

$headers = 'From: ' .$email . "\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
	mail($to, $subject, $body, $headers);
	echo '<span id="valid"><i class="icon icon-check"></i>Your Email was sent!</span>';
}else{
	echo '<span id="invalid">Invalid Email, please provide a correct email.</span>';
}
