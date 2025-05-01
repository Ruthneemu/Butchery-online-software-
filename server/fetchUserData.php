<?php
// Assume you have a database connection established
include 'connect.php';

session_start(); // Start the session to access user info

// Check if the session variable is set
if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "User ID not found in session"]);
    exit();
}

$userId = $_SESSION['id']; // Assign the session ID to $userId

$query = "SELECT first_name, last_name, phone, email FROM register WHERE id = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit();
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Return the address information as a JSON response
    echo json_encode($row);
} else {
    echo json_encode(["error" => "User not found or no data available"]);
}

$stmt->close();
$conn->close();
?>
