document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to handle star rating selection
    const stars = document.querySelectorAll('.rating i');
    let userRatingValue = 0;

    stars.forEach(star => {
        star.addEventListener('click', function () {
            userRatingValue = this.getAttribute('data-value');
            updateStarRating(userRatingValue);
            console.log(`Rated ${userRatingValue} stars`);
        });

        star.addEventListener('mouseover', function () {
            updateStarRating(this.getAttribute('data-value'));
        });

        star.addEventListener('mouseout', function () {
            updateStarRating(userRatingValue);
        });
    });

    function updateStarRating(value) {
        stars.forEach(star => {
            star.classList.toggle('active', star.getAttribute('data-value') <= value);
        });
    }

    // Review submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const reviewText = document.getElementById('reviewText').value;
            if (userRatingValue > 0 && reviewText.trim() !== "") {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');
                reviewCard.innerHTML = `
                    <div class="review-rating">Rating: ${userRatingValue} Star(s)</div>
                    <div class="review-text">${reviewText}</div>
                `;
                document.getElementById('existingReviews').appendChild(reviewCard);
                document.getElementById('reviewText').value = ""; // Clear textarea
                userRatingValue = 0; // Reset rating
                stars.forEach(s => s.classList.remove('active')); // Reset user stars
            } else {
                alert("Please provide a rating and a review text.");
            }
        });
    }

    // Add to Cart Functionality
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        const counterContainer = button.nextElementSibling; // Assuming counterContainer is next to the button
        const incrementBtn = counterContainer.querySelector('#increment-btn');
        const decrementBtn = counterContainer.querySelector('#decrement-btn');
        const counterValue = counterContainer.querySelector('#counter-value');

        let quantity = 0; // Initialize quantity for this product
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior

            const productElement = button.closest('.product');
            if (!productElement) {
                console.error("Product element not found!");
                return;
            }

            const productName = productElement.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('Ksh ', '').replace(',', ''));

            // Check if the product is already in the cart
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                // Set quantity to the existing product's quantity
                quantity = cart[existingProductIndex].quantity;
            } else {
                // Add new product to cart
                cart.push({
                    name: productName,
                    image: productElement.querySelector('.product-image').src, // Update to use the correct selector for the image
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
                showToast('Product quantity updated!'); // Show success message
            };

            setTimeout(() => {
                counterContainer.style.display = 'none'; // Hide the counter
                button.style.display = 'block'; // Show the button
            }, 3000);

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
                    showToast('Product quantity updated!'); // Show success message
                }
            };

            // Save cart to localStorage for the first addition
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(); // Update the cart count
            showToast('Product added to cart successfully!');
        });
    });

    updateCartCount();

    // Cart Functionality
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('basket-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Sum up quantities
            cartCount.textContent = totalItems; // Update cart count display
            cartCount.style.display = totalItems > 0 ? 'block' : 'none'; // Show or hide based on item count
        }
    }

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

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            console.log("Add to Cart button clicked");
        } else if (event.target.classList.contains('wishlist-button')) {
            console.log("Wishlist button clicked");
            const productId = event.target.getAttribute('data-product-id');
            addToWishlist(productId);
        }
    });
});
