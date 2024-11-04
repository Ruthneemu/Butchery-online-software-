<?php

// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "online_butchery");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Get the form data
$name = $_REQUEST['name'];
$email = $_REQUEST['email'];
$message = $_REQUEST['message'];

// Insert query (specify the table and columns)
$sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";

// Execute the query
if(mysqli_query($conn, $sql)){
    echo "<h3>Data stored in the database successfully." 
        . " Please browse your localhost phpMyAdmin" 
        . " to view the updated data</h3>"; 
    echo nl2br("\n$name\n $email\n $message");
} else{
    echo "ERROR: Hush! Sorry $sql. " . mysqli_error($conn);
}

// Close the connection
mysqli_close($conn);
?>
