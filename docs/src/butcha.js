// Show/Hide Sidebar Functions
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Dropdown Toggle Functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });
});


// sorting
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('sort-select').addEventListener('change', function() {
    const selectedOption = this.value;
    const products = Array.from(document.querySelectorAll('.product'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('Ksh ', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('Ksh ', ''));
        
        if (selectedOption === 'price-asc') {
            return priceA - priceB;
        } else if (selectedOption === 'price-desc') {
            return priceB - priceA;
        } else if (selectedOption === 'name-asc') {
            return a.querySelector('.product-name').textContent.localeCompare(b.querySelector('.product-name').textContent);
        } else if (selectedOption === 'name-desc') {
            return b.querySelector('.product-name').textContent.localeCompare(a.querySelector('.product-name').textContent);
        }
    });

    // Append sorted products back to the product grid
    const productList = document.getElementById('productList');
    products.forEach(product => productList.appendChild(product));
});
});

// Search Bar Functionality with Debounce
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input'); 
    if (searchInput) {
        let debounceTimer;

        searchInput.addEventListener('input', function() {
            console.log("Input event triggered"); // Check if the input event is triggered
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const filter = searchInput.value.toLowerCase();
                console.log("Search filter:", filter); // Log the search filter
                const products = document.querySelectorAll('.product');

                products.forEach(product => {
                    const productName = product.querySelector('.product-name').textContent.toLowerCase();
                    console.log("Checking product:", productName); // Log each product name

                    // Check if the product name includes the filter
                    if (productName.includes(filter)) {
                        product.classList.remove('hidden'); // Show matching product
                        console.log("Showing:", productName); // Log which products are shown
                    } else {
                        product.classList.add('hidden'); // Hide non-matching product
                        console.log("Hiding:", productName); // Log which products are hidden
                    }
                });
            }, 300);
        });
    } else {
        console.error('Search input field not found.');
    }
});


// Toggle Chatbox Functionality
const chatIcon = document.getElementById('chat-icon');
if (chatIcon) {
    chatIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        window.location.href = '/views/chatbox.html'; // Redirect to chat.html
    });
}

// Close Chatbox Functionality
document.addEventListener('DOMContentLoaded', () => {
    const closeChatboxButton = document.getElementById('close-chatbox');
    if (closeChatboxButton) {
        closeChatboxButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior
            const chatbox = document.getElementById('chatbox');
            chatbox.style.display = 'none'; // Hide chatbox
        });
    }
});

// Send Message Functionality in Chat
const sendMessageButton = document.getElementById('send-message');
if (sendMessageButton) {
    sendMessageButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission or default action
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        if (message !== '') {
            const chatContent = document.querySelector('.chatbox-content');
            const messageHTML = `<div class="message"><p>${message}</p></div>`;
            chatContent.innerHTML += messageHTML; // Add message to chat content
            messageInput.value = ''; // Clear input
        }
    });
}

// Login Functionality
function login(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert("Please fill in all fields!");
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                if (response === 'success') {
                    alert("Login successful!");
                    // Redirect to dashboard or another page
                } else {
                    alert("Invalid email or password!");
                }
            } else {
                alert("Error: " + xhr.status);
            }
        };
    }
}

// Password Toggle Functionality in Registration
const eyeIcon = document.getElementById('eye');
const passwordInput = document.querySelector('.password-input input');

if (eyeIcon && passwordInput) {
    const togglePasswordVisibility = () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('fa-eye-slash');
            eyeIcon.classList.remove('fa-eye');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.add('fa-eye');
            eyeIcon.classList.remove('fa-eye-slash');
        }
    };
    eyeIcon.addEventListener('click', togglePasswordVisibility);
    eyeIcon.addEventListener('touchstart', togglePasswordVisibility);
}

//login dropdown
document.addEventListener("DOMContentLoaded", () => {
    // Set user's first name for the greeting
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("firstName").textContent = "<?php echo $first_name; ?>";
    });
   
    // Account Dropdown Toggle
    const userGreeting = document.getElementById("userGreeting");
    const userDropdown = document.getElementById("userDropdown");

    userGreeting.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown(userDropdown);
    });

    // Categories Dropdown Toggle
    const categoriesMenu = document.getElementById("categoriesMenu");
    const categoriesDropdown = document.getElementById("categoriesDropdown");

    if (categoriesMenu && categoriesDropdown) {
        categoriesMenu.addEventListener("click", (e) => {
            e.preventDefault();
            toggleDropdown(categoriesDropdown);
        });

        // Function to toggle dropdown visibility
        function toggleDropdown(dropdown) {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        }

        // Close dropdowns when clicking outside
        document.addEventListener("click", (e) => {
            if (!categoriesMenu.contains(e.target) && !categoriesDropdown.contains(e.target)) {
                categoriesDropdown.style.display = "none";
            }
        });
    } else {
        console.error("categoriesMenu or categoriesDropdown element not found.");
    }

    // Function to toggle dropdown visibility
    function toggleDropdown(dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        if (!userGreeting.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = "none";
        }
        if (!categoriesMenu.contains(e.target) && !categoriesDropdown.contains(e.target)) {
            categoriesDropdown.style.display = "none";
        }
    });
});

// Close Container Functionality
function closeContainer(event) {
    event.preventDefault(); // Prevent any default behavior
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'none';
    }
}

// Contact Form Validation
function sendContactMessage(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert("Empty! Please fill in all fields and send us a message.");
    } else {
        alert("Message sent successfully!");
    }
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('basket-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Sum up quantities
        cartCount.textContent = totalItems; // Update cart count display
        cartCount.style.display = totalItems > 0 ? 'block' : 'none'; // Show or hide based on item count
    }
}

function showSuccessMessage() {
    const messageBox = document.getElementById('floating-message');
    messageBox.classList.add('show'); // Add the show class to make it visible

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('show'); // Remove the show class to hide it
    }, 3000);
}

// Call this function when you need to display the success message
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            // Your code here
        });
    }
});

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach((button) => {
    const counterContainer = button.nextElementSibling; // Assuming counterContainer is next to the button
    const incrementBtn = counterContainer.querySelector('#increment-btn');
    const decrementBtn = counterContainer.querySelector('#decrement-btn');
    const counterValue = counterContainer.querySelector('#counter-value');

    let quantity = 0; // Initialize quantity for this product

    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
    

        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('Ksh ', '').replace(',', ''));
        const productImage = productElement.querySelector('img')?.src || '';

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.name === productName);

        if (existingProductIndex > -1) {
            // Set quantity to the existing product's quantity
            quantity = cart[existingProductIndex].quantity;
        } else {
            // Add new product to cart
            cart.push({
                name: productName,
                image: productElement.querySelector('img')?.src || '',
                price: productPrice,
                quantity: 1,
                purchasedOn: new Date().toLocaleString()
            });
            quantity = 1; // Start with quantity 1
        }



        // Update the counter display
        counterValue.textContent = quantity;

          // Hide the "Add to Cart" button
          button.style.display = 'none'; // Hide the button

          // Show the counterContainer
          counterContainer.style.display = 'flex';

        // Increment Button Functionality
        incrementBtn.onclick = () => {
            quantity += 1;
            counterValue.textContent = quantity;

            // Update cart quantity
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity = quantity; // Update quantity in the cart
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(); // Update the cart count
            showSuccessMessage(); // Show success message
        };

        setTimeout(() => {
            counterContainer.style.display = 'none'; // Hide the counter
            button.style.display = 'block'; // Hide the button
        }, 3000); 
        // toast success message
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
        
            // Auto-hide after 3 seconds
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
        
        // Example usage after adding to cart
        showToast('Product added to cart successfully!');
        

        // Decrement Button Functionality
        decrementBtn.onclick = () => {
            if (quantity > 0) {
                quantity -= 1;
                counterValue.textContent = quantity;
                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity = quantity; // Update quantity in the cart
                    if (quantity === 0) {
                        cart.splice(existingProductIndex, 1); // Remove the item from the cart if quantity is 0
                        counterContainer.style.display = 'none'; // Hide the counter if quantity is 0
                    }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount(); // Update the cart count
                showSuccessMessage(); // Show success message
            }
        };

        // Save cart to localStorage for the first addition
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Update the cart count
        showSuccessMessage(); // Show success message
    });
});
updateCartCount();


