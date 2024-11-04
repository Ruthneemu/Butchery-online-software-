<?php
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Check if the required parameters are present
if (!isset($_POST['user_id']) || !isset($_POST['product_id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input. Please provide user_id and product_id.']);
    exit;
}

$user_id = intval($_POST['user_id']);
$product_id = intval($_POST['product_id']);

// Example response
$wishlistItems = [
    ["item_id" => 1, "item_name" => "Meat A"],
    ["item_id" => 2, "item_name" => "Meat B"],
];

echo json_encode(['success' => true, 'wishlist' => $wishlistItems]);
?>
