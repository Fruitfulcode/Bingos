<?php
$text = $_POST['text-field'];
$select = $_POST['my-select'];
$textarea = $_POST['text-area'];
$checkbox1 = $_POST['inlineCheckbox1'];
$checkbox2 = $_POST['inlineCheckbox2'];
$radio = $_POST['optionsRadios'];
 
$to = 'shumakov@fruitfulcode.com';
$subject = 'Message From (Benign) Your Website Contact Form';

$body = "";
$body .= "Text: ";
$body .= $text;
$body .= "\n\n";

$body .= "";
$body .= "Select: ";
$body .= $select;
$body .= "\n\n";

$body .= "";
$body .= "Checkbox1: ";
$body .= ($checkbox1)? 'Yes' : 'No';
$body .= "\n\n";

$body .= "";
$body .= "Checkbox2: ";
$body .= ($checkbox2)? 'Yes' : 'No';
$body .= "\n\n";

$body .= "";
$body .= "Radio: ";
$body .= $radio;
$body .= "\n\n";

$body .= "";
$body .= "Textarea: ";
$body .= $textarea;
$body .= "\n";

$headers = 'From: ' .$to . "\r\n";

if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
mail($to, $subject, $body, $headers);
echo '<span id="valid"><i class="icon icon-check"></i>Your Email was sent!</span>';
}else{
echo '<span id="invalid">Invalid Email, please provide a correct email.</span>';
}