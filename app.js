const app = document.getElementById("app");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(productName) {

    cart.push(productName);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(productName + " added to cart!");
}

function homePage() {

    app.innerHTML = `
    <h2>Welcome 🌸</h2>

    <p>
    Browse our cute stationery collection.
    </p>
    `;
}

function aboutPage() {

    app.innerHTML = `
    <h2>About Us 💕</h2>

    <p>
    Cute Stationery Store built using
    HTML, CSS and JavaScript.
    </p>
    `;
}

function productsPage() {

    let html = `

    <h2>Our Products ✨</h2>

    <input
        type="text"
        id="search"
        placeholder="Search products..."
    >

    <select id="category">

        <option value="all">All Categories</option>

        <option value="Notebook">Notebook</option>

        <option value="Pen">Pen</option>

        <option value="Accessories">Accessories</option>

    </select>

    <div class="products" id="product-list"></div>

    `;

    app.innerHTML = html;

    displayProducts(products);

    document
    .getElementById("search")
    .addEventListener("input", filterProducts);

    document
    .getElementById("category")
    .addEventListener("change", filterProducts);
}

function displayProducts(items) {

    const list =
    document.getElementById("product-list");

    let html = "";

    items.forEach(product => {

        html += `

        <div class="card">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p class="price">${product.price}</p>

            <button onclick="addToCart('${product.name}')">
            Add to Cart
            </button>

        </div>

        `;
    });

    list.innerHTML = html;
}

function filterProducts() {

    const search =
    document.getElementById("search")
    .value
    .toLowerCase();

    const category =
    document.getElementById("category")
    .value;

    let filtered =
    products.filter(product => {

        let matchesSearch =
        product.name
        .toLowerCase()
        .includes(search);

        let matchesCategory =
        category === "all" ||
        product.category === category;

        return matchesSearch &&
        matchesCategory;
    });

    displayProducts(filtered);
}

function router() {

    const hash =
    location.hash || "#home";

    switch(hash) {

        case "#products":
        productsPage();
        break;

        case "#about":
        aboutPage();
        break;

        default:
        homePage();
    }
}

window.addEventListener(
"hashchange",
router
);

router();
