/**
 * @function validateForm
 * @description Validates the contact form fields (Name, Email, Message) before submission.
 * Displays an alert if any required field is empty or if the email format is invalid.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */

// Ensure the DOM is fully loaded before trying to manipulate elements
document.addEventListener('DOMContentLoaded', function() {
    // --- Dark Mode Toggle Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (darkModeToggle) { // Ensure the button exists before adding listener
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode'); // Toggle the class on the body

            // Save user preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Existing Contact Form Feedback Logic (keep this as is) ---
    const urlParams = new URLSearchParams(window.location.search);
    const mailStatus = urlParams.get('mailsend');
    const errorStatus = urlParams.get('error');

    const contactContainer = document.getElementById('contact');

    if (contactContainer && (mailStatus || errorStatus)) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('alert', 'mt-3');

        if (mailStatus === 'success') {
            feedbackDiv.classList.add('alert-success');
            feedbackDiv.textContent = "Your message has been sent successfully! We will get back to you shortly.";
        } else if (errorStatus) {
            feedbackDiv.classList.add('alert-danger');
            let errorMessage = "An error occurred. Please try again.";
            if (errorStatus === 'invalidname') {
                errorMessage = "Please provide your name.";
            } else if (errorStatus === 'invalidemail' || errorStatus === 'invalidemailformat') {
                errorMessage = "Please provide a valid email address.";
            } else if (errorStatus === 'invalidmessage') {
                errorMessage = "Your message cannot be empty.";
            } else if (errorStatus === 'mailfailed') {
                errorMessage = "Failed to send message. Please try again later. If the problem persists, please contact us directly.";
            } else {
                errorMessage = "An unexpected error occurred. Please try again.";
            }
            feedbackDiv.textContent = errorMessage;
        }
        contactContainer.prepend(feedbackDiv);
    }
});

function validateForm() {
  // Get form elements by their name attributes
  const name = document.forms["myForm"]["name"].value.trim(); // .trim() removes leading/trailing whitespace
  const email = document.forms["myForm"]["email"].value.trim();
  const message = document.forms["myForm"]["message"].value.trim();

  // 1. Validate Name field
  if (name === "") {
    alert("Name must be filled out.");
    return false; // Prevent form submission
  }

  // 2. Validate Email field
  if (email === "") {
    alert("Email must be filled out.");
    return false; // Prevent form submission
  }

  // Basic email format validation using a regular expression
  // This regex is a simple check; for more robust validation, server-side validation is crucial.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false; // Prevent form submission
  }

  // 3. Validate Message field
  if (message === "") {
    alert("Message must be filled out.");
    return false; // Prevent form submission
  }

  // If all checks pass, the form is valid and can be submitted
  return true;
}
