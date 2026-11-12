const grid = document.getElementById('product-grid');
const pageTitle = document.getElementById('page-title');
const cartCount = document.getElementById('cart-count');

// Modal Elements
const modal = document.getElementById('checkoutModal');
const modalTitle = document.getElementById('modal-title');


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'all';

if (category !== 'all') {
    pageTitle.innerText = category.toUpperCase();
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cartCount) cartCount.innerText = cart.length;
}
updateCartCount();

// fetch is used to request data from api 
async function fetchProducts() {
    try {
        let url = 'https://fakestoreapi.com/products';
        if (category !== 'all') {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        const response = await fetch(url);
        const products = await response.json();

        grid.innerHTML = ''; 

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = "bg-white p-4 rounded-xl shadow-lg w-64 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300";
            
            
            const safeTitle = product.title.replace(/'/g, "\\'");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="h-40 object-contain mb-4">
                <h3 class="font-bold text-sm h-12 overflow-hidden">${product.title}</h3>
                <p class="text-emerald-600 font-bold text-lg mt-2">$${product.price}</p>
                
                <!-- Buttons Container -->
                <div class="flex flex-col gap-2 w-full mt-4">
                    <button onclick="addToCart(${product.id}, '${safeTitle}', ${product.price}, '${product.image}')" 
                            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md">
                        Add to Cart
                    </button>
                    <button onclick="buyNow(${product.id}, '${safeTitle}', ${product.price}, '${product.image}')" 
                            class="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md">
                        Buy Now
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<h1 class="text-red-500">Error loading products. Check internet.</h1>';
    }
}


function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    
    showNotification(`✅ ${title} added to cart!`, 'success');
}


function buyNow(id, title, price, image) {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.dispatchEvent(new Event('cartUpdated'));
    
    
    showNotification(`🚀 Redirecting to checkout...`, 'success');
    setTimeout(() => {
        window.location.href = './cart.html';
    }, 1000);
}


function showNotification(message, type = 'success') {
    
    const existing = document.getElementById('toast-notification');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = `fixed top-20 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-500 translate-x-full ${
        type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : 'bg-gradient-to-r from-red-500 to-pink-600'
    } text-white font-semibold flex items-center gap-3`;
    
    toast.innerHTML = `
        <span class="text-2xl">${type === 'success' ? '✅' : '❌'}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    }, 100);
    
    
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

fetchProducts();