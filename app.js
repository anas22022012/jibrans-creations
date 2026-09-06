function getProducts(){return JSON.parse(localStorage.getItem('products')||'[]')}
function render(){const p=getProducts();document.getElementById('products').innerHTML=p.length?p.map(x=>`<article class="product">${x.image?`<img src="${x.image}">`:''}<h3>${x.name}</h3><p>${x.description||''}</p><b>₹${x.sale}</b></article>`).join(''):'<p>No products added yet.</p>'}
render();