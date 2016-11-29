<?php

// Email address verification
function isEmail($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if($_POST) {

    // Enter the email where you want to receive the message
    $emailTo = 'simon@marriott-family.co.uk';

    $firstName = addslashes(trim($_POST['firstName']));
    $lastName = addslashes(trim($_POST['lastName']));
    $clientEmail = addslashes(trim($_POST['email']));
    $subject = addslashes(trim($_POST['subject']));
    $message = addslashes(trim($_POST['message']));

    $array = array('firstNameMessage' => '', 'lastNameMessage' => '', 'emailMessage' => '', 'subjectMessage' => '', 'messageMessage' => '');

    if($firstName == '') {
    	$array['firstNameMessage'] = 'Empty First Name!';
    }
    if($lastName == '') {
    	$array['lastNameMessage'] = 'Empty Last Name!';
    }
    if(!isEmail($clientEmail)) {
        $array['emailMessage'] = 'Invalid email!';
    }
    if($subject == '') {
        $array['subjectMessage'] = 'Empty subject!';
    }
    if($message == '') {
        $array['messageMessage'] = 'Empty message!';
    }
    if($firstName != '' && $lastName != '' && isEmail($clientEmail) && $subject != '' && $message != '') {
        // Send email
        $message = "Message from: " . $firstName . " " . $lastName . "\r\n\r\n" . $message;
		$headers = "From: " . $clientEmail . "\r\n" . "Reply-To: " . $clientEmail;
		mail($emailTo, $subject . " (Contact Form)", $message, $headers);
    }

    echo json_encode($array);

}

?>
