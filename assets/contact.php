<?php

// Email address verification
function isEmail($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Sanitise the input data
function sanitiseInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_POST) {

    // Enter the email where you want to receive the message
    $emailTo = 'simon@marriott-family.co.uk';

    $firstName = sanitiseInput($_POST['firstName']);
    $lastName = sanitiseInput($_POST['lastName']);
    $clientEmail = sanitiseInput($_POST['email']);
    $subject = sanitiseInput($_POST['subject']);
    $message = sanitiseInput($_POST['message']);

    $errors = array('firstNameMessage' => '', 'lastNameMessage' => '', 'emailMessage' => '', 'subjectMessage' => '', 'messageMessage' => '');

    if(strlen($firstName) < 2 ) {
        if(!$firstName) {
            $msg = 'You must enter a first name!';
            $errors['firstNameMessage'] = $msg;
        } else {
            $msg = 'First name should be at least 2 Characters!';
            $errors['firstNameMessage'] = $msg;
        }
    }
    if(strlen($lastName) < 2 ) {
        if(!$lastName) {
            $msg = 'You must enter a last name!';
            $errors['lastNameMessage'] = $msg;
        } else {
            $msg = 'Last name should be at least 2 characters!';
            $errors['lastNameMessage'] = $msg;
        }
    }
    if(!$clientEmail) {
        $msg = 'Your email is required';
        $errors['emailMessage'] = $msg;
    } else if(!isEmail($clientEmail)) {
        $msg = 'Invalid email!';
            $errors['emailMessage'] = $msg;
    }
    if(strlen($subject) < 2 ) {
        if(!$subject) {
            $msg = 'Subject is required!';
            $errors['subjectMessage'] = $msg;
        } else {
            $msg = 'Subject should be at least 2 characters!';
            $errors['subjectMessage'] = $msg;
        }
    }
    if (strlen($message) < 10 ) {
        if(!$message) {
            $msg = 'Message is required!';
            $errors['messageMessage'] = $msg;
        } else {
            $msg = 'Message should be at least 10 characters!';
            $errors['messageMessage'] = $msg;
        }
    }
    if($firstName != '' && $lastName != '' && isEmail($clientEmail) && $subject != '' && $message != '') {
        // Send email
        $message = "Message from: " . $firstName . " " . $lastName . "\r\n\r\n" . $message;
        $subject = "Contact Form: " . $subject;
		$headers = "From: " . $clientEmail . "\r\n" . "Reply-To: " . $clientEmail;
		mail($emailTo, $subject, $message, $headers);
    }

    echo json_encode($errors);

}

?>
