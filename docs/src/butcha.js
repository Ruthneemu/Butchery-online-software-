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
        event.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });
});

// Sorting
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sort-select').addEventListener('change', function () {
        const selectedOption = this.value;
        const products = Array.from(document.querySelectorAll('.product'));

        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('Ksh ', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('Ksh ', ''));

            if (selectedOption === 'price-asc') return priceA - priceB;
            else if (selectedOption === 'price-desc') return priceB - priceA;
            else if (selectedOption === 'name-asc') return a.querySelector('.product-name').textContent.localeCompare(b.querySelector('.product-name').textContent);
            else if (selectedOption === 'name-desc') return b.querySelector('.product-name').textContent.localeCompare(a.querySelector('.product-name').textContent);
        });

        const productList = document.getElementById('productList');
        products.forEach(product => productList.appendChild(product));
    });
});

// Search Bar with Debounce
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const filter = searchInput.value.toLowerCase();
                const products = document.querySelectorAll('.product');
                products.forEach(product => {
                    const productName = product.querySelector('.product-name').textContent.toLowerCase();
                    product.classList.toggle('hidden', !productName.includes(filter));
                });
            }, 300);
        });
    }
});

// Chatbox Redirect
const chatIcon = document.getElementById('chat-icon');
if (chatIcon) {
    chatIcon.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/views/chatbox.html';
    });
}

// Close Chatbox
document.addEventListener('DOMContentLoaded', () => {
    const closeChatboxButton = document.getElementById('close-chatbox');
    if (closeChatboxButton) {
        closeChatboxButton.addEventListener('click', (event) => {
            event.preventDefault();
            const chatbox = document.getElementById('chatbox');
            chatbox.style.display = 'none';
        });
    }
});

// Send Chat Message
const sendMessageButton = document.getElementById('send-message');
if (sendMessageButton) {
    sendMessageButton.addEventListener('click', (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        if (message !== '') {
            const chatContent = document.querySelector('.chatbox-content');
            chatContent.innerHTML += `<div class="message"><p>${message}</p></div>`;
            messageInput.value = '';
        }
    });
}

// Login Functionality
function login(event) {
    event.preventDefault();
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
                if (xhr.responseText === 'success') {
                    alert("Login successful!");
                } else {
                    alert("Invalid email or password!");
                }
            } else {
                alert("Error: " + xhr.status);
            }
        };
    }
}

// Password Toggle
const eyeIcon = document.getElementById('eye');
const passwordInput = document.querySelector('.password-input input');
if (eyeIcon && passwordInput) {
    const togglePasswordVisibility = () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.classList.toggle('fa-eye-slash', isPassword);
        eyeIcon.classList.toggle('fa-eye', !isPassword);
    };
    eyeIcon.addEventListener('click', togglePasswordVisibility);
    eyeIcon.addEventListener('touchstart', togglePasswordVisibility);
}

// Login Dropdown
document.addEventListener("DOMContentLoaded", () => {
    const userGreeting = document.getElementById("userGreeting");
    const userDropdown = document.getElementById("userDropdown");
    const categoriesMenu = document.getElementById("categoriesMenu");
    const categoriesDropdown = document.getElementById("categoriesDropdown");

    userGreeting?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown(userDropdown);
    });

    categoriesMenu?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDropdown(categoriesDropdown);
    });

    function toggleDropdown(dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    document.addEventListener("click", (e) => {
        if (!userGreeting.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = "none";
        }
        if (!categoriesMenu.contains(e.target) && !categoriesDropdown.contains(e.target)) {
            categoriesDropdown.style.display = "none";
        }
    });
});

// Close Container
function closeContainer(event) {
    event.preventDefault();
    const container = document.querySelector('.container');
    if (container) container.style.display = 'none';
}

// Contact Form
function sendContactMessage(event) {
    event.preventDefault();
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
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('Ksh ', '').replace(',', ''));
        const productImage = productElement.querySelector('.product-image img').src;
        const counterContainer = productElement.querySelector('.counterContainer');
        const incrementBtn = counterContainer.querySelector('.increment-btn');
        const decrementBtn = counterContainer.querySelector('.decrement-btn');
        const counterValue = counterContainer.querySelector('.counter-value');

        let quantity = 1;
        const existingIndex = cart.findIndex(item => item.name === productName);
        if (existingIndex > -1) {
            quantity = cart[existingIndex].quantity;
        } else {
            cart.push({
                name: productName,
                image: productImage,
                price: productPrice,
                quantity: 1,
                purchasedOn: new Date().toLocaleString()
            });
        }

        counterValue.textContent = quantity;
        button.style.display = 'none';
        counterContainer.style.display = 'flex';

        incrementBtn.onclick = () => {
            quantity++;
            counterValue.textContent = quantity;
            if (existingIndex > -1) {
                cart[existingIndex].quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showToast('Quantity increased!');
        };

        decrementBtn.onclick = () => {
            if (quantity > 0) {
                quantity--;
                counterValue.textContent = quantity;
                if (existingIndex > -1) {
                    if (quantity === 0) {
                        cart.splice(existingIndex, 1);
                        counterContainer.style.display = 'none';
                        button.style.display = 'block';
                    } else {
                        cart[existingIndex].quantity = quantity;
                    }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                showToast('Quantity decreased!');
            }
        };

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast('Product added to cart successfully!');
    });
});

updateCartCount();
