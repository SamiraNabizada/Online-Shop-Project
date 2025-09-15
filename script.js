const products = [
    { id: 1, name: ' مانتو سیاه با طرح های سفید', price: 75, image: 'product-1.jpg' },
    { id: 2, name: ' مانتو  بنفش با طرح های صورتی', price: 90, image: 'product-2.webp' },
    { id: 3, name: ' مانتو  سفید', price: 95, image: 'product-3.jpg' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// show products
const renderProducts = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>قیمت: $${product.price}</p>
            <button onclick="addToCart(${product.id})">اضافه به سبد خرید</button>
        `;
        productList.appendChild(productDiv);
    });
};

// add product to cart
const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

//   show cart items
const renderCart = () => {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <div>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <button onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        `;
        cartDiv.appendChild(cartItemDiv);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').innerText = `مجموع: $${total}`;
};

// update product quantity in cart
const updateQuantity = (id, change) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
};

// remove product from cart
const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

//  initial render
renderProducts();
renderCart();