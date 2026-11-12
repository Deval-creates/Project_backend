// Cart Count Update Function
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Total items count (including quantities)
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
}

// cart count update on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartCount);
} else {
    updateCartCount();
}

window.addEventListener('cartUpdated', updateCartCount);


window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        updateCartCount();
    }
});
