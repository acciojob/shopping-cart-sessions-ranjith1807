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
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list (HTML kept exactly as boilerplate requested)
function renderProducts() {
  if (!productList) return;
  productList.innerHTML = "";
  
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = "";
  
  // Read fresh from storage
  const cartData = sessionStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  
  if (product) {
    // ALWAYS read the freshest state immediately before modifying
    const cartData = sessionStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];
    
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cartData = sessionStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];
  
  const index = cart.findIndex((item) => item.id === parseInt(productId));
  
  if (index !== -1) {
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// --- Event Listeners ---

// Event delegation for Product List
if (productList) {
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.getAttribute("data-id");
      addToCart(productId);
    }
  });
}

// Event delegation for Cart List
if (cartList) {
  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-cart-btn")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });
}

// Clear Cart listener
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// Initial render
renderProducts();
renderCart();