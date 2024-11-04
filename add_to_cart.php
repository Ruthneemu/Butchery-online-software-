<?php
session_start(); // Start the session

require_once "connect.php"; // Include your database connection file

// Check if the user is logged in
if (!isset($_SESSION["id"])) {
    echo "User not logged in. Please log in first.";
    exit();
}

// Ensure the form submission method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the product ID and quantity from the form
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity']; // Get the quantity from form input
    $user_id = $_SESSION['id']; // Get the user ID from the session

    // Check if the product exists in the products table
    $sql = "SELECT * FROM products WHERE product_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $product_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        // Product exists, check if it is already in the cart
        $sql = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ii", $user_id, $product_id);
        mysqli_stmt_execute($stmt);
        $cart_result = mysqli_stmt_get_result($stmt);
        
        if (mysqli_num_rows($cart_result) > 0) {
            // Product already in the cart, update quantity
            $sql = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "iii", $quantity, $user_id, $product_id);

            if (mysqli_stmt_execute($stmt)) {
                echo "Product quantity updated in cart.";
            } else {
                echo "Error updating product quantity in cart.";
            }
        } else {
            // Insert the new product into the cart
            $sql = "INSERT INTO cart (user_id, product_id, quantity, created_at) VALUES (?, ?, ?, NOW())";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "iii", $user_id, $product_id, $quantity);
            
            if (mysqli_stmt_execute($stmt)) {
                echo "Product added to cart!";
            } else {
                echo "Error adding product to cart.";
            }
        }
    } else {
        echo "Product does not exist.";
    }
    
    // Close statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>
