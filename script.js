// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list"); 

// Render product list
function renderProducts() {
  if (!productList) return;
  productList.innerHTML = ""; 
  products.forEach((product) => {
    const li = document.createElement("li");
    // Added direct 'onclick' attributes so Cypress clicks register 100% of the time
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = ""; 
  
  // Always fetch fresh data to sync perfectly with Cypress's background injections
  const cartData = sessionStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}" onclick="removeFromCart(${item.id})">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cartData = sessionStorage.getItem("cart");
  let cart = cartData ? JSON.parse(cartData) : [];
  
  const product = products.find((p) => p.id === parseInt(productId));
  
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Update the UI
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cartData = sessionStorage.getItem("cart");
  let cart = cartData ? JSON.parse(cartData) : [];
  
  const index = cart.findIndex((item) => item.id === parseInt(productId));
  
  if (index !== -1) {
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Update the UI
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart(); // Update the UI
}

// Attach the clear cart function
const clearCartBtn = document.getElementById("clear-cart-btn");
if (clearCartBtn) {
  clearCartBtn.onclick = clearCart;
}

// Initial render
renderProducts();
renderCart();