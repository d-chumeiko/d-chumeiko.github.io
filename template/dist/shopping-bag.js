'use strict';

// elems from html
var shoppingBagHTML = document.querySelector('.shopping-bag_products');
var emptyBagBtn = document.querySelector('.shopping-bag_empty-bag');
var totalPrice = document.querySelector('.total-price');

// get shoppingBag from LS
var shoppingBag = getFromLS('shoppingBag') || [];

// if shoppingBag.length > 0
showShoppingBagProducts();
outTotalPrice();

// products added to bag
var shoppingBagProducts = shoppingBagHTML.children;

for (var i = 0, len = shoppingBagProducts.length; i < len; i++) {
  var key = shoppingBagProducts[i];
  key.addEventListener('click', addItemToLS);
}

// listeners
emptyBagBtn.addEventListener('click', emptyBag);

function plusGood(e) {

  var trg = e.target;
  console.log(trg);

  var id = this.dataset.id;

  for (var _i = 0; _i < shoppingBag.length; _i++) {
    var _key = shoppingBag[_i];
    if (_key.id === id) {
      _key.count++;
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
}

function minusGood() {
  var id = this.dataset.id;

  for (var _i2 = 0; _i2 < shoppingBag.length; _i2++) {

    if (shoppingBag[_i2].id === id) {
      if (shoppingBag[_i2].count > 1) {
        shoppingBag[_i2].count--;
      } else {
        delete shoppingBag[_i2];
        shoppingBag = shoppingBag.filter(function (x) {
          return x !== undefined && x !== null;
        });
      }
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
}

function removeItemFromBag(e) {
  e.preventDefault();
  var id = this.closest('.shb-item').dataset.id;

  for (var _i3 = 0; _i3 < shoppingBag.length; _i3++) {

    if (shoppingBag[_i3].id === id) {
      delete shoppingBag[_i3];
      shoppingBag = shoppingBag.filter(function (x) {
        return x !== undefined && x !== null;
      });
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
}

// empty bag
function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = '<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>';

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = 'Total price: 0';
  cartCount.innerHTML = '(0)';
}

// totalPrice outpuy
function outTotalPrice() {
  var fullPrice = 0;

  for (var _i4 = 0; _i4 < shoppingBag.length; _i4++) {
    var _key2 = shoppingBag[_i4];
    fullPrice += _key2['price'];
  }

  totalPrice.textContent = 'Total price: \xA3' + fullPrice;
}

//
function showShoppingBagProducts() {
  shoppingBagHTML.innerHTML = createShoppingBagProducts() || '<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>';;
  // plus and minus btns

  itemBtnClickHandler('.param_quantity--plus', plusGood);
  itemBtnClickHandler('.param_quantity--minus', minusGood);
  itemBtnClickHandler('.shb-item_remove-item', removeItemFromBag);
}

function createShoppingBagProducts() {
  var output = '';

  for (var _i5 = 0; _i5 < shoppingBag.length; _i5++) {
    var _key3 = shoppingBag[_i5];
    output += createShoppingBagProduct(_key3);
  }

  return output;
}

// Shopping Bag Product template
function createShoppingBagProduct(key) {
  return '\n  <div class="shb-item" data-id="' + key.id + '">\n  <a class="shb-item_img new-label" href="./item.html">\n    <img src="' + key.img + '" alt="product-in-bag">\n  </a>\n  <div class="shb-item_info">\n    <h4 class="shb-item_name">' + key.title + '</h4>\n    <span class="shb-item_price">\xA3' + key.price * key.count + '</span>\n    <p class="shb-item_params">\n      <span class="param_color">Color: ' + key.color + '</span>\n      <span class="param_size">Size: ' + key.size + '</span>\n      <span class="param_quantity">Quantity: <span class="param_quantity--minus" data-id="' + key.id + '">\u2212</span><span id="quantity-in-bag">' + key.count + '</span><span class="param_quantity--plus" data-id="' + key.id + '">+</span></span>\n    </span>\n    <a class="shb-item_remove-item" href="#">Remove item</a>\n  </div>\n</div>\n  ';
}