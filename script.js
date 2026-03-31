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
const cartList = document.getElementById("cart-list"); // Make sure this exists in your HTML
const clearCartBtn = document.getElementById("clear-cart-btn"); // Make sure this exists in your HTML

// --- Session Storage Helpers ---

// Get cart from session storage (returns empty array if none exists)
function getCart() {
  const cartData = sessionStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

// Save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Render Functions ---

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear existing to prevent duplicates
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  if (!cartList) return; // Guard clause in case the HTML element is missing
  
  cartList.innerHTML = ""; // Clear current cart display
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// --- Cart Logic Functions ---

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find((p) => p.id === parseInt(productId));
  
  if (productToAdd) {
    const cart = getCart();
    cart.push(productToAdd);
    saveCart(cart);
    renderCart(); // Update the UI
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  
  // Find the index of the first matching item 
  // (using findIndex ensures we only remove one instance if they added the same product multiple times)
  const index = cart.findIndex((item) => item.id === parseInt(productId));
  
  if (index !== -1) {
    cart.splice(index, 1); // Remove that specific item
    saveCart(cart);
    renderCart(); // Update the UI
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart(); // Update the UI
}

// --- Event Listeners ---

// Event delegation for adding to cart
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// Event delegation for removing from cart
if (cartList) {
  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-cart-btn")) {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    }
  });
}

// Clear cart button listener
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// --- Initialization ---

renderProducts();
renderCart();