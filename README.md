# AOTEAROA | New Zealand Information Website

## Project Overview

This project is an attractive, informative, and standards-compliant website built as a scripting assignment (W101 & W107). The website focuses on providing clear, quality information about New Zealand, covering its history, key attractions, and upcoming events.

The goal of this assignment was to demonstrate proficiency in web programming languages, responsive design principles, and implementing rich, functional user interfaces using JavaScript.

***

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Website structure and semantic markup. |
| **CSS3 (Bootstrap 4)** | Responsive layout, styling, and consistent design across devices. |
| **JavaScript (main.js)** | Client-side scripting for form validation, Dark Mode toggle, and interactive elements. |
| **PHP (contact-form.php)** | Server-side script for secure form data handling and email processing. |
| **JQuery / Popper.js** | Required dependencies for Bootstrap's interactive components (e.g., Navbar toggler, Carousel). |

## Setup and Execution

### 1. Static Website (HTML, CSS, JS)

To view the static pages (Home, History, Attractions, Events, Contact):
* Clone or download the project folder.
* Open `index.html` (or any other `.html` file) directly in your web browser.

### 2. Contact Form Functionality (PHP)

The contact form requires a **PHP-enabled web server** to process the data and send the email.
* **Local Server Setup:** Install and run a local server environment (e.g., **XAMPP, MAMP, or WAMP**).
* **Placement:** Place the entire project directory inside the server's public folder (e.g., `htdocs` or `www`).
* **Access:** Access the site via your local host URL (e.g., `http://localhost/aotearoa-website/index.html`).

***

**Note on the Contact Form:** If you see a "BAD REQUEST: Syntax error..." message, it means the PHP server is not running or is incorrectly configured to handle the POST request. Ensure your local server is active.