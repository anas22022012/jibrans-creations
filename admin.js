// ===============================
// Jibran's Creations - Admin JS
// ===============================

// ⚠️ यहाँ अपनी Admin email/password डालें
const ADMIN_EMAIL = "jibran.shahban@gmail.com";
const ADMIN_PASSWORD = "YOUR_PASSWORD_HERE";

// Get elements safely
const loginBox = document.getElementById("login");
const panel = document.getElementById("panel");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("err");
const productForm = document.getElementById("productForm");

// ===============================
// LOGIN
// ===============================

function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("admin", "1");
        showAdmin();
    } else {
        errorBox.textContent = "Wrong email or password.";
    }
}

// ===============================
// SHOW ADMIN PANEL
// ===============================

function showAdmin() {
    loginBox.hidden = true;
    panel.hidden = false;
    renderProducts();
}

// ===============================
// LOGOUT
// ===============================

function logout() {
    localStorage.removeItem("admin");
    location.reload();
}

// ===============================
// PRODUCT ADD
// ===============================

if (productForm) {
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const file = document.getElementById("photo").files[0];

        const product = {
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            pieces: document.getElementById("pieces").value,
            stock: document.getElementById("stockInput").value,
            mrp: document.getElementById("mrp").value,
            sale: document.getElementById("sale").value,
            discount: document.getElementById("discount").value,
            delivery: document.getElementById("delivery").value,
            sku: document.getElementById("sku").value,
            featured: document.getElementById("featured").checked,
            limited: document.getElementById("limited").checked,
            image: ""
        };

        function saveProduct(imageData) {
            product.image = imageData;

            let products = JSON.parse(
                localStorage.getItem("products") || "[]"
            );

            products.push(product);

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );

            productForm.reset();
            renderProducts();

            alert("✅ Product published successfully!");
        }

        if (file) {
            const reader = new FileReader();

            reader.onload = function () {
                saveProduct(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            saveProduct("");
        }
    });
}

// ===============================
// SHOW PRODUCTS
// ===============================

function renderProducts() {
    const products = JSON.parse(
        localStorage.getItem("products") || "[]"
    );

    const list = document.getElementById("list");

    if (!list) return;

    if (products.length === 0) {
        list.innerHTML = "<p>No products yet.</p>";
        return;
    }

    list.innerHTML = products.map((product, index) => `
        <div class="card">
            <b>${escapeHTML(product.name)}</b>
            <br>
            Sale: ₹${escapeHTML(product.sale)}
            <br>
            Stock: ${escapeHTML(product.stock)}
            <br>
            Discount: ${escapeHTML(product.discount)}%
            <br>
            Delivery: ₹${escapeHTML(product.delivery)}
            <br><br>

            <button onclick="removeProduct(${index})">
                🗑️ Delete
            </button>
        </div>
    `).join("");
}

// ===============================
// DELETE PRODUCT
// ===============================

function removeProduct(index) {
    if (!confirm("Delete this product?")) return;

    let products = JSON.parse(
        localStorage.getItem("products") || "[]"
    );

    products.splice(index, 1);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();
}

// ===============================
// SECURITY HELPER
// ===============================

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ===============================
// AUTO LOGIN
// ===============================

if (localStorage.getItem("admin") === "1") {
    showAdmin();
}
