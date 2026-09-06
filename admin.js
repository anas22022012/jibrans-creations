const ADMIN_EMAIL = "jibran.shahban@gmail.com";
const ADMIN_PASSWORD = "Jibran@123";

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const err = document.getElementById("err");

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("admin", "1");
    show();
  } else {
    err.textContent = "Wrong email or password.";
  }
}

function show() {
  document.getElementById("login").hidden = true;
  document.getElementById("panel").hidden = false;
  render();
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("admin") === "1") {
    show();
  }
});

function render() {
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  document.getElementById("count").textContent = products.length;

  document.getElementById("stock").textContent =
    products.reduce((total, product) => total + Number(product.stock || 0), 0);

  document.getElementById("list").innerHTML =
    products.length
      ? products.map((product, i) =>
          `<div class="card">
            <b>${product.name}</b> — ₹${product.sale} |
            Stock: ${product.stock}
            <button onclick="removeProduct(${i})">Delete</button>
          </div>`
        ).join("")
      : "<p>No products yet.</p>";
}

function removeProduct(i) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");

  productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const file = document.getElementById("photo").files[0];

    const saveProduct = function (image) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");

      products.push({
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
        image: image || ""
      });

      localStorage.setItem("products", JSON.stringify(products));
      productForm.reset();
      render();
      alert("Product published!");
    };

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
});
