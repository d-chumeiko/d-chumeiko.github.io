'use strict';

var shoppingBagLS = getFromLS('shoppingBag');
var shoppingBag = document.querySelector('.shopping-bag_products');
var emptyBagBtn = document.querySelector('.shopping-bag_empty-bag');
var totalPrice = document.querySelector('.shopping-bag_price');

if (shoppingBagLS) {
  showShoppingBagProducts();
  outTotalPrice();
}

var shoppingBagProducts = shoppingBag.children;
console.log(shoppingBag);

for (var i = 0, len = shoppingBagProducts.length; i < len; i++) {
  var key = shoppingBagProducts[i];
  key.addEventListener('click', addItemToLS);
}

emptyBagBtn.addEventListener('click', emptyBag);

function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = '<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>';

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = 'Total price: 0';
  cartCount.innerHTML = '(0)';
}

function outTotalPrice() {
  var fullPrice = 0;

  for (var _i = 0; _i < shoppingBagLS.length; _i++) {
    var _key = shoppingBagLS[_i];
    fullPrice += _key['price'];
  }

  totalPrice.textContent = 'Total price: \xA3' + fullPrice;
}

function showShoppingBagProducts() {
  shoppingBag.innerHTML = '';
  for (var _i2 = 0; _i2 < shoppingBagLS.length; _i2++) {
    var _key2 = shoppingBagLS[_i2];
    shoppingBag.innerHTML += createShoppingBagProduct(_key2);
  }
}

function createShoppingBagProduct(key) {
  return '\n  <div class="shb-item" data-id="' + key.id + '">\n  <a class="shb-item_img new-label" href="./item.html">\n    <img src="' + key.img + '" alt="product-in-bag">\n  </a>\n  <div class="shb-item_info">\n    <h4 class="shb-item_name">' + key.title + '</h4>\n    <span class="shb-item_price">\xA3' + key.price * key.count + '</span>\n    <p class="shb-item_params">\n      <span class="param_color">Color: ' + key.color + '</span>\n      <span class="param_size">Size: ' + key.size + '</span>\n      <span class="param_quantity">Quantity: <span class="param_quantity--minus">\u2212</span> ' + key.count + ' <span class="param_quantity--plus">+</span></span>\n    </p>\n    <a class="shb-item_remove-item" href="#">Remove item</a>\n  </div>\n</div>\n  \n  ';
}