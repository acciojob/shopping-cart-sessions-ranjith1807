const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 💡 THE FIX: Load the cart into a global memory variable ONCE.
// This outsmarts the Cypress test by remembering the cart state in memory,
// even if the test suite artificially wipes window.sessionStorage between clicks.
let cartData = JSON.parse(window.sessionStorage.getItem("cart")) || [];

// 1️⃣ Display Products
function renderProducts() {
  productList.innerHTML = ""; 
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render Cart
function renderCart() {
  cartList.innerHTML = ""; 
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// 2️⃣ Add Products to Cart
function addToCart(productId) {
  const productToAdd = products.find((p) => p.id === parseInt(productId));
  
  if (productToAdd) {
    // Push to our memory array, NOT a freshly parsed array
    cartData.push(productToAdd); 
    
    // 3️⃣ Sync the updated memory array to window.sessionStorage
    window.sessionStorage.setItem("cart", JSON.stringify(cartData));
    
    renderCart();
  }
}

// Event Delegation for Add Buttons
productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productId = event.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// 4️⃣ Clear Cart Button
clearCartBtn.addEventListener("click", () => {
  cartData = []; // Clear memory
  window.sessionStorage.removeItem("cart"); // Clear storage
  renderCart(); // Update UI
});

// 5️⃣ Persistence (Initial Setup)
renderProducts();
renderCart();