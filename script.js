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

// Render product list
function renderProducts() {
  if (!productList) return;
  productList.innerHTML = ""; // Clear existing to prevent duplicates
  
  products.forEach((product) => {
    const li = document.createElement("li");
    // Create the product display with the requested "Add to Cart" button
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list from Session Storage
function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = ""; // Clear current cart display
  
  // Fetch fresh data from sessionStorage
  const cartData = sessionStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];

  // Populate the cart list
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
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
    
    // Add new product to cart and save back to sessionStorage
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    
    // Update the UI
    renderCart();
  }
}

// Clear cart
function clearCart() {
  // Completely remove the cart from sessionStorage
  sessionStorage.removeItem("cart");
  
  // Update the UI to reflect the empty cart
  renderCart();
}

// --- Event Listeners ---

// Event delegation for Product List (Handles dynamically created buttons)
if (productList) {
  productList.addEventListener("click", (e) => {
    // Check if the clicked element is our button
    if (e.target.tagName === "BUTTON") {
      const productId = e.target.getAttribute("data-id");
      addToCart(productId);
    }
  });
}

// Clear Cart listener
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// --- Initial Setup ---

// Render products and any existing cart data on initial page load
renderProducts();
renderCart();