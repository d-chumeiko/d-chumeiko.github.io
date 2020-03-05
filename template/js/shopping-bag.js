let shoppingBagLS = getFromLS('shoppingBag');
let shoppingBag = document.querySelector('.shopping-bag_products');
let emptyBagBtn = document.querySelector('.shopping-bag_empty-bag');
let totalPrice = document.querySelector('.shopping-bag_price');

if (shoppingBagLS) {
  showShoppingBagProducts();
  outTotalPrice();
}

let shoppingBagProducts = shoppingBag.children;
console.log(shoppingBag);

for (let i = 0, len = shoppingBagProducts.length; i < len; i++) {
  let key = shoppingBagProducts[i];
  key.addEventListener('click', addItemToLS);
}

emptyBagBtn.addEventListener('click', emptyBag);



function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = `<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>`;

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = `Total price: 0`;
  cartCount.innerHTML = '(0)';
}

function outTotalPrice() {
  let fullPrice = 0;

  for (let i = 0; i < shoppingBagLS.length; i++) {
    let key = shoppingBagLS[i];
    fullPrice += key['price'];
  }

  totalPrice.textContent = `Total price: £${fullPrice}`;
}


function showShoppingBagProducts() {
  shoppingBag.innerHTML = '';
  for (let i = 0; i < shoppingBagLS.length; i++) {
    let key = shoppingBagLS[i];
    shoppingBag.innerHTML += createShoppingBagProduct(key);
  }
}

function createShoppingBagProduct(key) {
  return `
  <div class="shb-item" data-id="${key.id}">
  <a class="shb-item_img new-label" href="./item.html">
    <img src="${key.img}" alt="product-in-bag">
  </a>
  <div class="shb-item_info">
    <h4 class="shb-item_name">${key.title}</h4>
    <span class="shb-item_price">£${key.price * key.count}</span>
    <p class="shb-item_params">
      <span class="param_color">Color: ${key.color}</span>
      <span class="param_size">Size: ${key.size}</span>
      <span class="param_quantity">Quantity: <span class="param_quantity--minus">−</span> ${key.count} <span class="param_quantity--plus">+</span></span>
    </p>
    <a class="shb-item_remove-item" href="#">Remove item</a>
  </div>
</div>
  
  `
}