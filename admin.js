const ADMIN_EMAIL = 'jibran.shahban@gmail.com';
const ADMIN_PASSWORD = 'AnasAdmin@2026';

function login() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const error = document.getElementById('err');

  if (
    emailInput.value.trim() === ADMIN_EMAIL &&
    passwordInput.value === ADMIN_PASSWORD
  ) {
    localStorage.setItem('admin', '1');
    show();
  } else {
    error.textContent = 'Wrong email or password.';
  }
}

function show() {
  const loginBox = document.getElementById('login');
  const panel = document.getElementById('panel');

  loginBox.hidden = true;
  panel.hidden = false;

  render();
}

if (localStorage.getItem('admin') === '1') {
  show();
}

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const file = document.getElementById('photo').files[0];

  function saveProduct(image) {
    let products = JSON.parse(
      localStorage.getItem('products') || '[]'
    );

    products.push({
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      pieces: document.getElementById('pieces').value,
      stock: document.getElementById('stockInput').value,
      mrp: document.getElementById('mrp').value,
      sale: document.getElementById('sale').value,
      discount: document.getElementById('discount').value,
      delivery: document.getElementById('delivery').value,
      sku: document.getElementById('sku').value,
      featured: document.getElementById('featured').checked,
      limited: document.getElementById('limited').checked,
      image: image || ''
    });

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('productForm').reset();

    render();

    alert('Product published!');
  }

  if (file) {
    const reader = new FileReader();

    reader.onload = function() {
      saveProduct(reader.result);
    };

    reader.readAsDataURL(file);
  } else {
    saveProduct('');
  }
});

function render() {
  const products = JSON.parse(
    localStorage.getItem('products') || '[]'
  );

  const count = document.getElementById('count');
  const stock = document.getElementById('stock');
  const list = document.getElementById('list');

  if (count) {
    count.textContent = products.length;
  }

  if (stock) {
    stock.textContent = products.reduce(
      (total, product) => total + Number(product.stock || 0),
      0
    );
  }

  if (!list) return;

  if (products.length === 0) {
    list.innerHTML = '<p>No products yet.</p>';
    return;
  }

  list.innerHTML = products.map((product, index) => `
    <div class="card">
      <b>${product.name}</b>
      — ₹${product.sale}
      | Stock: ${product.stock}
      <button onclick="removeProduct(${index})">
        Delete
      </button>
    </div>
  `).join('');
}

function removeProduct(index) {
  let products = JSON.parse(
    localStorage.getItem('products') || '[]'
  );

  products.splice(index, 1);

  localStorage.setItem(
    'products',
    JSON.stringify(products)
  );

  render();
}
