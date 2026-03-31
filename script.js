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

// 1️⃣ Display Products
function renderProducts() {
  productList.innerHTML = ""; // Clear list before rendering
  products.forEach((product) => {
    const li = document.createElement("li");
    // Including the required "Add to Cart" button with a data attribute for the ID
    li.innerHTML = `${product.name} - $${product.price} <button data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render Cart from Session Storage
function renderCart() {
  cartList.innerHTML = ""; 
  
  
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

 
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });

function addToCart(productId) {
  // Find the exact product from the products array
  const productToAdd = products.find((p) => p.id === parseInt(productId));
  
  if (productToAdd) {
 
    const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
    currentCart.push(productToAdd);
    sessionStorage.setItem("cart", JSON.stringify(currentCart));
    
    
    renderCart();
  }
}


productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productId = event.target.getAttribute("data-id");

clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart"); 
  renderCart(); 
});

renderProducts();
renderCart();