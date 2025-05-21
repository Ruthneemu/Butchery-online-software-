// Import and initialize Supabase client at the top of your script
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://pqfofbniphvkkdscpdem.supabase.co'; // replace with your URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZm9mYm5pcGh2a2tkc2NwZGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTIzODIsImV4cCI6MjA2MzA2ODM4Mn0.YhA7wXqI5-b2YM9A5QPKHf13nhx2fTj9PotVT_2Q92Q'; // replace with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Assume we have user_id available (e.g., from auth or hardcoded for demo)
const userId = 'some-user-id'; 

// Rating stars
const stars = document.querySelectorAll('.rating i');
let userRatingValue = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        userRatingValue = parseInt(this.getAttribute('data-value'));
        updateStarRating(userRatingValue);
        console.log(`Rated ${userRatingValue} stars`);
    });

    star.addEventListener('mouseover', function() {
        updateStarRating(parseInt(this.getAttribute('data-value')));
    });

    star.addEventListener('mouseout', function() {
        updateStarRating(userRatingValue);
    });
});

function updateStarRating(value) {
    stars.forEach(star => {
        star.classList.toggle('active', parseInt(star.getAttribute('data-value')) <= value);
    });
}

// Submit Review - save to Supabase
document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value.trim();

    if (userRatingValue > 0 && reviewText !== "") {
        // Save review to Supabase
        const { data, error } = await supabase
            .from('reviews')
            .insert([{
                product_id: 'product-123', // replace with actual product ID
                rating: userRatingValue,
                review_text: reviewText,
                created_at: new Date()
            }]);

        if (error) {
            alert("Failed to save review: " + error.message);
            return;
        }

        // Optionally append the new review immediately to UI
        appendReviewToUI(userRatingValue, reviewText);

        document.getElementById('reviewText').value = ""; // Clear textarea
        userRatingValue = 0;
        stars.forEach(s => s.classList.remove('active'));
    } else {
        alert("Please provide a rating and a review text.");
    }
});

function appendReviewToUI(rating, text) {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <div class="review-rating">Rating: ${rating} Star(s)</div>
        <div class="review-text">${text}</div>
    `;
    document.getElementById('existingReviews').appendChild(reviewCard);
}

// Load reviews from Supabase on page load
async function loadReviews() {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', 'product-123') // replace with actual product ID
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading reviews:', error);
        return;
    }

    const container = document.getElementById('existingReviews');
    container.innerHTML = ''; // clear previous

    data.forEach(review => {
        appendReviewToUI(review.rating, review.review_text);
    });
}

// Add to Cart Functionality - using Supabase
document.querySelectorAll('.add-to-cart').forEach((button) => {
    const counterContainer = button.nextElementSibling;
    const incrementBtn = counterContainer.querySelector('#increment-btn');
    const decrementBtn = counterContainer.querySelector('#decrement-btn');
    const counterValue = counterContainer.querySelector('#counter-value');

    let quantity = 0;

    async function refreshCart() {
        const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .eq('product_name', productName);

        if (error) {
            console.error('Error fetching cart:', error);
            return;
        }

        if (cartItems.length > 0) {
            quantity = cartItems[0].quantity;
            counterValue.textContent = quantity;
            button.style.display = 'none';
            counterContainer.style.display = 'flex';
        } else {
            quantity = 0;
            counterValue.textContent = quantity;
            button.style.display = 'block';
            counterContainer.style.display = 'none';
        }
    }

    const productElement = button.closest('.product');
    const productName = productElement.querySelector('.product-name').textContent;
    const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('Ksh ', '').replace(',', ''));
    const productImage = productElement.querySelector('.product-image').src;

    // Initialize cart state for this product
    refreshCart();

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        // Check if product already in cart
        const { data: existingItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .eq('product_name', productName);

        if (error) {
            alert("Error accessing cart: " + error.message);
            return;
        }

        if (existingItems.length > 0) {
            // Update quantity +1
            quantity = existingItems[0].quantity + 1;

            const { error: updateError } = await supabase
                .from('cart_items')
                .update({ quantity })
                .eq('id', existingItems[0].id);

            if (updateError) {
                alert("Failed to update cart: " + updateError.message);
                return;
            }
        } else {
            quantity = 1;
            const { error: insertError } = await supabase
                .from('cart_items')
                .insert([{
                    user_id: userId,
                    product_name: productName,
                    image_url: productImage,
                    price: productPrice,
                    quantity: 1,
                    purchased_on: new Date()
                }]);

            if (insertError) {
                alert("Failed to add to cart: " + insertError.message);
                return;
            }
        }

        counterValue.textContent = quantity;
        button.style.display = 'none';
        counterContainer.style.display = 'flex';
        updateCartCount();
        showToast('Product added to cart successfully!');
    });

    incrementBtn.onclick = async () => {
        quantity++;
        counterValue.textContent = quantity;

        const { data: existingItems, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .eq('product_name', productName);

        if (existingItems.length > 0) {
            const { error: updateError } = await supabase
                .from('cart_items')
                .update({ quantity })
                .eq('id', existingItems[0].id);

            if (updateError) {
                alert("Failed to update cart: " + updateError.message);
                return;
            }
        }

        updateCartCount();
        showToast('Product quantity updated!');
    };

    decrementBtn.onclick = async () => {
        if (quantity > 1) {
            quantity--;
            counterValue.textContent = quantity;

            const { data: existingItems, error } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', userId)
                .eq('product_name', productName);

            if (existingItems.length > 0) {
                const { error: updateError } = await supabase
                    .from('cart_items')
                    .update({ quantity })
                    .eq('id', existingItems[0].id);

                if (updateError) {
                    alert("Failed to update cart: " + updateError.message);
                    return;
                }
            }
        } else if (quantity === 1) {
            // Remove from cart
            const { data: existingItems, error } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', userId)
                .eq('product_name', productName);

            if (existingItems.length > 0) {
                const { error: deleteError } = await supabase
                    .from('cart_items')
                    .delete()
                    .eq('id', existingItems[0].id);

                if (deleteError) {
                    alert("Failed to remove from cart: " + deleteError.message);
                    return;
                }
            }

            quantity = 0;
            counterValue.textContent = quantity;
            counterContainer.style.display = 'none';
            button.style.display = 'block';
        }

        updateCartCount();
        showToast('Product quantity updated!');
    };
});

// Update cart count from Supabase
async function updateCartCount() {
    const cartCount = document.getElementById('basket-count');
    if (!cartCount) return;

    const { data, error } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

    if (error) {
        console.error("Failed to fetch cart count:", error);
        cartCount.style.display = 'none';
        return;
    }

    const totalItems = data.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

// Toast message display
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Load reviews initially
loadReviews();
updateCartCount();
