<?php
session_start(); // Start the session

// Unset all session variables
session_unset();

// Destroy the session
session_destroy();

// Redirect to the homepage or login page
header("Location: index.php"); // Change this to your desired landing page after logout
exit; // Ensure no further code is executed
?>
