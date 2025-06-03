// Example product data to simulate database/products API
const PRODUCTS = [
  {
    id: 1,
    name: "Heritage Wool Blazer",
    price: 399,
    img: "assets/Blazer.jpg",
    category: "fashion",
    description: "Impeccably tailored, this blazer embodies the essence of old money style.",
    has3D: true,
    threeDModel: "assets/blazer.glb"
  },
  {
    id: 2,
    name: "Classic Cashmere Scarf",
    price: 189,
    img: "assets/Scarf.jpg",
    category: "fashion",
    description: "Pure Scottish cashmere, hand-finished with subtle elegance.",
    has3D: false
  },
  {
    id: 3,
    name: "Vintage Leather Briefcase",
    price: 569,
    img: "assets/Briefcase.jpg",
    category: "fashion",
    description: "Crafted from Italian leather, built to last a lifetime.",
    has3D: false
  },
  {
    id: 4,
    name: "Marble Table Lamp",
    price: 320,
    img: "assets/Lamp.jpg",
    category: "home",
    description: "Heavy marble base, brass finish, and timeless silhouette.",
    has3D: false
  },
  {
    id: 5,
    name: "Monogrammed Crystal Glasses (Set of 2)",
    price: 145,
    img: "assets/crystal glasse.jpg",
    category: "home",
    description: "Hand-cut crystal, personalized with your monogram.",
    has3D: false
  },
  {
    id: 6,
    name: "Wireless Vintage Radio",
    price: 245,
    img: "assets/Radio.jpg",
    category: "tech",
    description: "Old world design, new world wireless sound.",
    has3D: false
  }
];

function renderProducts(products = PRODUCTS) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" class="product-img" alt="${product.name}"/>
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price}</div>
      <div class="product-btns">
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn" onclick="showProductModal(${product.id})">View</button>
      </div>
    `;
    grid.appendChild(card);
    // GSAP animation on mount
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.07 * products.indexOf(product)
    });
  });
}

// Product modal logic
function showProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const modal = document.getElementById("product-modal");
  const details = document.getElementById("modal-details");
  details.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.img}" style="width:120px;border-radius:10px;box-shadow:0 2px 16px #bbb;" alt="${product.name}"/>
    <p>${product.description}</p>
    <div style="font-size:1.1rem;color:var(--accent);margin:0.7em 0;">$${product.price}</div>
    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
    ${product.has3D ? `<div id="product-3d-viewer" style="height:300px;margin-top:1.2em;"></div><button class="btn" onclick="load3DModel('${product.threeDModel}')">View 3D</button>` : ""}
  `;
  modal.classList.remove("hidden");
  gsap.from(modal.querySelector(".modal-content"), {
    opacity: 0, y: 50, scale: 0.9, duration: 0.5, ease: "power2.out"
  });
}
document.getElementById("close-modal").onclick = () => {
  document.getElementById("product-modal").classList.add("hidden");
};

// Filtering
document.getElementById("search-bar").addEventListener("input", e => {
  filterProducts();
});
document.getElementById("category-filter").addEventListener("change", e => {
  filterProducts();
});
function filterProducts() {
  const search = document.getElementById("search-bar").value.trim().toLowerCase();
  const category = document.getElementById("category-filter").value;
  renderProducts(PRODUCTS.filter(p => {
    return (!category || p.category === category) &&
      (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
  }));
}

// Initial render
renderProducts();