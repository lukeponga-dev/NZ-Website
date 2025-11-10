/**
 * @function validateForm
 * @description Validates the contact form fields (Name, Email, Message) using inline feedback.
 * Adds 'is-invalid' class and displays error messages next to the corresponding fields.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */

// Ensure the DOM is fully loaded before trying to manipulate elements
document.addEventListener('DOMContentLoaded', function() {
    // --- Dark Mode Toggle Logic (Keep as is) ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) { // Ensure the button exists before adding listener
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save user preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // --- Existing Contact Form Feedback Logic (Keep as is) ---
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
    const form = document.forms["myForm"];
    // Get form elements and trim their values
    const name = form["name"].value.trim();
    const email = form["email"].value.trim();
    const message = form["message"].value.trim();
    let isValid = true; // Assume valid until a check fails
    
    // Helper function to display errors inline
    function displayError(fieldName, errorMessage) {
        const inputElement = document.getElementById(fieldName); // Use ID from the HTML
        const feedbackElement = document.getElementById(fieldName + 'Feedback'); // Use ID from the HTML
        
        // Add invalid class to the input element (for red border)
        inputElement.classList.add('is-invalid');
        
        // Display the error message
        if (feedbackElement) {
            feedbackElement.textContent = errorMessage;
        }
        isValid = false;
    }
    
    // Helper function to clear previous errors
    function clearErrors() {
        // Array of field IDs to clear
        const fields = ['name', 'email', 'message'];
        fields.forEach(fieldName => {
            const inputElement = document.getElementById(fieldName);
            const feedbackElement = document.getElementById(fieldName + 'Feedback');
            
            // Remove invalid class
            inputElement.classList.remove('is-invalid');
            // Clear the error message text
            if (feedbackElement) {
                feedbackElement.textContent = '';
            }
        });
    }
    
    // --- 1. Clear previous errors before running new checks ---
    clearErrors();
    
    // --- 2. Validate Name field ---
    if (name === "") {
        displayError("name", "Name must be filled out.");
    }
    
    // --- 3. Validate Email field ---
    if (email === "") {
        displayError("email", "Email must be filled out.");
    } else {
        // Basic email format validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError("email", "Please enter a valid email address (e.g., user@domain.com).");
        }
    }
    
    // --- 4. Validate Message field ---
    if (message === "") {
        displayError("message", "Message must be filled out.");
    }
    
    // Return the overall validity status (true or false)
    return isValid;
}