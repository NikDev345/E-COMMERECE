let cart = [];

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const found = cart.find(item => item.id === id);
  if (found) found.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartCount();
  gsap.to("#cart-btn", { scale: 1.15, yoyo: true, repeat: 1, duration: 0.13 });
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}
function showCart() {
  const modal = document.getElementById("cart-modal");
  const items = document.getElementById("cart-items");
  items.innerHTML = cart.length === 0 ?
    "<p>Your cart is empty.</p>" :
    cart.map(item => `
      <div class="cart-item" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.1rem;">
        <img src="${item.img}" style="width:50px;border-radius:8px;"/>
        <div style="flex:1;">
          <div style="font-weight:700;">${item.name}</div>
          <div>Qty: <button onclick="changeQty(${item.id},-1)" style="font-weight:700;">-</button> ${item.qty} <button onclick="changeQty(${item.id},1)" style="font-weight:700;">+</button></div>
        </div>
        <div style="min-width:60px;">$${item.price * item.qty}</div>
      </div>
    `).join("");
  document.getElementById("cart-total").innerText = cart.length ? `Total: $${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}` : "";
  modal.classList.remove("hidden");
  gsap.from(modal.querySelector(".modal-content"), {
    opacity: 0, y: 40, scale: 0.9, duration: 0.5, ease: "power2.out"
  });
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCartCount();
  showCart();
}
document.getElementById("cart-btn").onclick = showCart;
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").classList.add("hidden");
};
document.getElementById("checkout-btn").onclick = () => {
  alert("Thank you for your (imaginary) purchase!");
  cart = [];
  updateCartCount();
  showCart();
};