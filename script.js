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


// ✅ Safe function to get cart
function getCart() {
  let cart = sessionStorage.getItem("cart");

  try {
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    return [];
  }
}


// ✅ Display Products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(li);
  });
}


// ✅ Render Cart
function renderCart() {
  cartList.innerHTML = "";

  const cartData = getCart();

  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}


// ✅ Add to Cart (FIXED)
function addToCart(productId) {
  const product = products.find(
    (p) => p.id === parseInt(productId)
  );

  if (!product) return;

  const cart = getCart();   // 🔥 Always get existing cart
  cart.push(product);       // 🔥 Append (do NOT overwrite)

  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}


// ✅ Event Listener for Add to Cart
productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productId = event.target.getAttribute("data-id");
    addToCart(productId);
  }
});


// ✅ Clear Cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});


// ✅ Initial Load
renderProducts();
renderCart();