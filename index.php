<?php
include 'connect.php'; // Include database connection

session_start(); // Start the session

// Check if the session variable is set
if (!isset($_SESSION['id'])) {
    $firstName = 'User'; // Default value
} else {
    $userId = $_SESSION['id']; // Assign the session ID to $userId

    // Fetch user info
    $query = "SELECT first_name FROM register WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Initialize default first name
    $firstName = 'User'; // Default value

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $firstName = htmlspecialchars($row['first_name']); // Get and sanitize the first name
    }

    $stmt->close(); // Close statement
}

$conn->close(); // Close the database connection
?>
<!Doctype html>
<html lang="en">
  <head>
    <meta name="viewport" width="device-width">
    <meta charset="utf-8" initial-scale="1.0">
    <title>Dashboard </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="style.css">
    
  </head>
  <body>

    <nav>
        <ul class="sidebar">
          <li onclick="hideSidebar()"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
          <li><a href="cart.html">Cart</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Categories<i class="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul class="dropdown-menu">
              <li><a href="Beef.html">Beef</a></li>
              <li><a href="Lamb.html">Lamb</a></li>
              <li><a href="Mutton.html">Mutton</a></li>
              <li><a href="Nyama_choma.html">Nyama Choma</a></li>
              <li><a href="Minced_meat">Minced Meat</a></li>
            </ul>
          </li>           
           <li><a href="index.php">shop</a></li>
            <li><a href="contact.html">Contact us</a></li>

        </ul>
    
    <ul>
      
      <li class="menu-button"onclick="showSidebar()"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="26px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
      <a class="image" href="index.php"><img src="butchery.jpg" alt="Butchery Logo"></a> 
      <nav class="search-bar">
        <input type="search" id="search-input" placeholder="Search Products...">
        <button class="search-icon" aria-label="Search">
          <i class="fa fa-search"></i>
        </button>
      </nav>
      
      <li class="split">
        <span><i class="fa fa-map-marker" aria-hidden="true" onclick="window.location.href='delivery.html'"></i> Delivery</span>
        <button class="change" onclick="window.location.href='delivery.html'">Change</button>
    </li>
    
  
    
    <li class="person">
      <a href="#" id="userGreeting">
        <i class="fa fa-user" aria-hidden="true"></i>
        Hey, <span id="firstName"><?php echo $firstName; ?></span> ▼</a>
          <ul id="userDropdown" class="dropdown-menu" style="display: none;">
          <li><a href="account.html">Account</a></li>
          <li><a href="wishlist.html">Wishlist</a></li>
          <li><a href="place-order.html">Place Your Order</a></li>
          <li>
            <button class="logout-button" onclick="window.location.href='logout.php'">Logout</button>
          </li>
                </ul>
  </li>
          <li class="hideOnMobile"><a href="contact.html"><i class="fa fa-info" aria-hidden="true"></i>Contact us</a></li>
      </ul>
      

</nav>
  </ul>
</div>
<div class="main-content">
  <ul class="breadcrumb">
    <li><a href="index.php">Home</a></li>
    <li><span>Dashboard</span></li>
  </ul>
</div>
  <h1>Family Butchery</h1>
  <h2>Discover Meat products from family online shop at the best prices in Kenya. Make your orders and have your deliveries at your doorstep at affordable prices.</h2>
  <div id="floating-message" class="floating-message" style="display: none;">Success!</div>
  <div class="product-info">
    <div class="product-count"><p>6 Products</p></div>
    <div class="sort-by">
      <label for="sort-select">Sort by:</label>
      <select id="sort-select" class="sort-select">
        <option value="price-asc">Price (low to high)</option>
        <option value="price-desc">Price (high to low)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  </div>
</div>
<div class="product-grid" id="productList">
  <div class="product" >
    <a href="product1.html" class="product-image">
      <img src="image1.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">Lean Ground Beef</h2>
      <p class="product-price">Ksh 250</p>
      <div class="tooltip">
        <button class="add-to-cart" id="add-to-cart">Add to Cart</button>
        <span class="tooltiptext">Add this item to your cart</span>
    </div>
    
      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
    </div>
    </div>
  <div class="product">
    <a href="#" class="product-image">
      <img src="image2.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">Raw ground beef</h2>
      <p class="product-price">Ksh 100</p>
      <button class="add-to-cart" id="add-to-cart">Add to Cart</button>

      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
    </div>
  </div>
  <div class="product">
    <a href="#" class="product-image">
      <img src="image3.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">mutton</h2>
      <p class="product-price">Ksh 150</p>
      <button class="add-to-cart" id="add-to-cart">Add to Cart</button>

      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
    </div>
  </div>
  <div class="product">
    <a href="#" class="product-image">
      <img src="image4.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">Pork</h2>
      <p class="product-price">Ksh 130</p>
      <button class="add-to-cart" id="add-to-cart">Add to Cart</button>

      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
    </div>
  </div>
  <div class="product">
    <a href="#" class="product-image">
      <img src="image5.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">chicken</h2>
      <p class="product-price">Ksh 200</p>
      <button class="add-to-cart" id="add-to-cart">Add to Cart</button>

      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
    </div>
  </div>
  <div class="product">
    <a href="#" class="product-image">
      <img src="image6.png" alt="Product Image">
    </a>
    <div class="product-details">
      <h2 class="product-name">Lamb</h2>
      <p class="product-price">Ksh 150</p>
      <button class="add-to-cart" id="add-to-cart">Add to Cart</button>

      <div class="counterContainer" style="display:none;">
        <button id="increment-btn">+</button>
        <div id="counter-value">0</div>
        <button id="decrement-btn">-</button>
    </div>
  </div>
</div>

<div id="chat-icon" >
  <a href="chatbox.html" id="chatbox" class="chat-link">
    <i class="fa fa-comment-o" aria-hidden="true" style="font-size: 24px; color: #25d366;"></i>
  </a>
</div>
<div id="basket-icon">
  <a href="cart.html"class="cart">
    <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size: 24px; color: #25d366;" ></i>
  </a>
  <span id="basket-count">0</span>
</div>
</body>
  <script src="butcha.js"></script>
</html>