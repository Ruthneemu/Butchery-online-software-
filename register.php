<?php
require_once "connect.php"; // Make sure this file includes your DB connection logic

// Initialize variables for user input and error messages
$first_name = $last_name = $phone_number = $email = $password = $confirm_password = "";
$first_name_err = $last_name_err = $phone_number_err = $email_err = $password_err = $confirm_password_err = "";

// Process form data when the form is submitted
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Validate first name
    if (empty(trim($_POST["first-name"]))) {
        $first_name_err = "First name cannot be blank";
    } else {
        $first_name = trim($_POST['first-name']);
    }

    // Validate last name
    if (empty(trim($_POST["last-name"]))) {
        $last_name_err = "Last name cannot be blank";
    } else {
        $last_name = trim($_POST['last-name']);
    }

    // Validate phone number
    if (empty(trim($_POST["phone-number"]))) {
        $phone_number_err = "Phone number cannot be blank";
    } else {
        $phone_number = trim($_POST['phone-number']);
    }

    // Validate email
    if (empty(trim($_POST["email"]))) {
        $email_err = "Email cannot be blank";
    } else {
        $sql = "SELECT id FROM register WHERE email = ?";
        $stmt = mysqli_prepare($conn, $sql);
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = trim($_POST['email']);

            // Execute the statement
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1) {
                    $email_err = "This email is already taken";
                } else {
                    $email = trim($_POST['email']);
                }
            } else {
                echo "Something went wrong when checking email availability.";
            }
        }
    }

    // Close statement
    mysqli_stmt_close($stmt);

    // Validate password
    if (empty(trim($_POST['password']))) {
        $password_err = "Password cannot be blank";
    } elseif (strlen(trim($_POST['password'])) < 5) {
        $password_err = "Password cannot be less than 5 characters";
    } else {
        $password = trim($_POST['password']);
    }

    // Validate confirm password
    if (trim($_POST['password']) != trim($_POST['confirm_password'])) {
        $confirm_password_err = "Passwords should match";
    }

    // Check for errors before inserting into the database
    if (empty($first_name_err) && empty($last_name_err) && empty($phone_number_err) && empty($email_err) && empty($password_err) && empty($confirm_password_err)) {
        $sql = "INSERT INTO register (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "sssss", $param_firstname, $param_lastname, $param_phone, $param_email, $param_password);

            // Set parameters
            $param_firstname = $first_name;
            $param_lastname = $last_name;
            $param_phone = $phone_number;
            $param_email = $email;
            $param_password = $password;  // Storing the password as plain text

            // Execute the query
            if (mysqli_stmt_execute($stmt)) {
                header("location: Login.html"); // Redirect to login page
                exit;
            } else {
                echo "Something went wrong... cannot redirect!";
            }
        }
        mysqli_stmt_close($stmt);
    }

    // Close the database connection
    mysqli_close($conn);
}
?>
