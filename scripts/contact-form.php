<?php

// Check if the form was submitted via POST and the 'submit' button was pressed
if (isset($_POST['submit'])) {

    // --- 1. Validate and Sanitize Inputs ---

    // Sanitize name: Remove HTML tags, encode special characters, and trim whitespace
    // FILTER_SANITIZE_FULL_SPECIAL_CHARS is a good general-purpose sanitizer
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if ($name === false || empty($name)) {
        // Handle error: Name is missing or invalid
        header("Location: contact.html?error=invalidname");
        exit(); // Stop script execution
    }
    $name = trim($name); // Ensure no extra whitespace

    // Sanitize email: Remove illegal email characters
    $emailFrom = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    if ($emailFrom === false || empty($emailFrom)) {
        // Handle error: Email is missing or invalid after initial sanitize
        header("Location: contact.html?error=invalidemail");
        exit();
    }
    // Validate email format after sanitization
    if (!filter_var($emailFrom, FILTER_VALIDATE_EMAIL)) {
        // Handle error: Email format is invalid
        header("Location: contact.html?error=invalidemailformat");
        exit();
    }

    // Sanitize message: Remove HTML tags, encode special characters, and trim whitespace
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if ($message === false || empty($message)) {
        // Handle error: Message is missing or invalid
        header("Location: contact.html?error=invalidmessage");
        exit();
    }
    $message = trim($message); // Ensure no extra whitespace

    // --- 2. Define Email Parameters ---

    // Define the recipient email address
    // It's good practice to store this in an environment variable or config file, not hardcoded.
    // For now, it's hardcoded as per your original script.
    $mailTo = "luke@nz-info.online"; // Corrected syntax: semicolon added

    // Define the subject for the email
    $subject = "Contact Form Submission from AOTEAROA Website"; // More descriptive subject

    // Construct the email body
    $emailBody = "You have received a new message from your website contact form.\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $emailFrom . "\n\n";
    $emailBody .= "Message:\n" . $message;

    // --- 3. Set Email Headers ---

    // Set additional headers for better email deliverability and reply functionality
    $headers = "From: AOTEAROA Website <noreply@yourdomain.com>\r\n"; // Use a "noreply" email for "From"
    $headers .= "Reply-To: " . $emailFrom . "\r\n"; // Set Reply-To to the sender's email
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n"; // Specify content type and character set

    // --- 4. Send Email ---

    // Attempt to send the email
    // mail() function might return false on failure
    if (mail($mailTo, $subject, $emailBody, $headers)) {
        // Email sent successfully
        header("Location: contact.html?mailsend=success");
        exit();
    } else {
        // Email failed to send
        header("Location: contact.html?error=mailfailed");
        exit();
    }

} else {
    // If the script was accessed directly without form submission, redirect to the contact page
    header("Location: contact.html");
    exit();
}
?>
