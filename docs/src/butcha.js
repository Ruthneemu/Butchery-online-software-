// login dropdown - wrapped event listeners with existence checks
document.addEventListener("DOMContentLoaded", () => {
    // Set user's first name for the greeting
    document.getElementById("firstName").textContent = "<?php echo $first_name; ?>";

    // Account Dropdown Toggle
    const userGreeting = document.getElementById("userGreeting");
    const userDropdown = document.getElementById("userDropdown");

    if (userGreeting && userDropdown) {
        userGreeting.addEventListener("click", (e) => {
            e.preventDefault();
            toggleDropdown(userDropdown);
        });
    }

    // Categories Dropdown Toggle
    const categoriesMenu = document.getElementById("categoriesMenu");
    const categoriesDropdown = document.getElementById("categoriesDropdown");

    if (categoriesMenu && categoriesDropdown) {
        categoriesMenu.addEventListener("click", (e) => {
            e.preventDefault();
            toggleDropdown(categoriesDropdown);
        });
    }

    // Function to toggle dropdown visibility
    function toggleDropdown(dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        if (userGreeting && userDropdown) {
            if (!userGreeting.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.style.display = "none";
            }
        }
        if (categoriesMenu && categoriesDropdown) {
            if (!categoriesMenu.contains(e.target) && !categoriesDropdown.contains(e.target)) {
                categoriesDropdown.style.display = "none";
            }
        }
    });
});

// Add to Cart Functionality with fixed product image reference
document.querySelectorAll('.add-to-cart').forEach((button) => {
    const counterContainer = button.nextElementSibling; // Assuming counterContainer is next to the button
    const incrementBtn = counterContainer.querySelector('#increment-btn');
    const decrementBtn = counterContainer.querySelector('#decrement-btn');
    const counterValue = counterContainer.querySelector('#counter-value');

    let quantity = 0; // Initialize quantity for this product

    button.addEventListener('click', (event) => {
        event.preventDefault();

        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('Ksh ', '').replace(',', ''));
        const productImage = productElement.querySelector('img') ? productElement.querySelector('img').src : ''; // FIXED here

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.name === productName);

        if (existingProductIndex > -1) {
            quantity = cart[existingProductIndex].quantity;
        } else {
            cart.push({
                name: productName,
                image: productImage, // FIXED usage
                price: productPrice,
                quantity: 1,
                purchasedOn: new Date().toLocaleString()
            });
            quantity = 1;
        }

        // Update the counter display
        counterValue.textContent = quantity;

        // Hide the "Add to Cart" button
        button.style.display = 'none';

        // Show the counterContainer
        counterContainer.style.display = 'flex';

        // Increment Button Functionality
        incrementBtn.onclick = () => {
            quantity += 1;
            counterValue.textContent = quantity;

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showSuccessMessage();
        };

        // Decrement Button Functionality
        decrementBtn.onclick = () => {
            if (quantity > 0) {
                quantity -= 1;
                counterValue.textContent = quantity;
                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity = quantity;
                    if (quantity === 0) {
                        cart.splice(existingProductIndex, 1);
                        counterContainer.style.display = 'none';
                        button.style.display = 'block'; // Show the add button again if quantity is 0
                    }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                showSuccessMessage();
            }
        };

        // Save cart and update UI on first add
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showSuccessMessage();

        // Toast success message
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        showToast('Product added to cart successfully!');
    });
});
updateCartCount();
