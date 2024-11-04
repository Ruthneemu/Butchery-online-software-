<?php
session_start(); // Start the session

require_once "connect.php"; // Include your database connection file

if (isset($_SESSION["id"])) {
    // User is already logged in, redirect them to the homepage
    header("Location: index.php");
    exit();
}

if (isset($_POST["login"])) {
    // Get email and password from the form
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
     
    // Prepare the SQL statement
    $sql = "SELECT * FROM register WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        
        // Execute the query
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $register = mysqli_fetch_array($result, MYSQLI_ASSOC);
        
        if ($register) {
            // Compare the provided password with the stored password
            if ($password === $register["password"]) {
                // Store the user ID in the session
                $_SESSION["id"] = $register["id"];
                
                // Redirect to the homepage
                header("Location: index.php");
                exit();
            } else {
                echo "<div class='alert alert-danger'>Password does not match</div>";
            }
        } else {
            echo "<div class='alert alert-danger'>Email does not match</div>";
        }
    } else {
        echo "<div class='alert alert-danger'>Database query failed</div>";
    }

    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
?>
