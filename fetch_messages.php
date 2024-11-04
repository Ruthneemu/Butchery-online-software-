<?php
// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "online_butchery");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetch messages from the database
$sql = "SELECT * FROM messages ORDER BY created_at ASC"; 
$result = mysqli_query($conn, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<div class='message'><strong>{$row['name']}:</strong> {$row['message']}<span>{$row['created_at']}</span></div>";
    }
} else {
    echo "ERROR: Could not execute $sql. " . mysqli_error($conn);
}

mysqli_close($conn);
?>
