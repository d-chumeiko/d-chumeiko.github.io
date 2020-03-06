// elems from html
let shoppingBagHTML = document.querySelector('.shopping-bag_products');
let emptyBagBtn = document.querySelector('.shopping-bag_empty-bag');
let totalPrice = document.querySelector('.total-price');

// get shoppingBag from LS
let shoppingBag = getFromLS('shoppingBag') || [];

// if shoppingBag.length > 0
showShoppingBagProducts();
outTotalPrice();

// products added to bag
let shoppingBagProducts = shoppingBagHTML.children;

for (let i = 0, len = shoppingBagProducts.length; i < len; i++) {
  let key = shoppingBagProducts[i];
  key.addEventListener('click', addItemToLS);
}

// listeners
emptyBagBtn.addEventListener('click', emptyBag);
document.querySelector('.checkout-btn').addEventListener('click', checkout);


function plusGood() {

  let item = this.closest('.shb-item');
  let id = item.dataset.id
  let color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  let size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');

  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];
    if (key.id === id && key.color === color && key.size === size) {
      key.count++;
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

function minusGood() {

  let item = this.closest('.shb-item');
  let id = item.dataset.id
  let color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  let size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');

  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];

    if (key.id === id && key.color === color && key.size === size) {

      if (key.count > 1) {
        key.count--;
      } 
      
      else {
        delete shoppingBag[i];
        shoppingBag = shoppingBag.filter(function (x) {
          return x !== undefined && x !== null;
        });
      }

    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

function removeItemFromBag(e) {
  e.preventDefault();
  
  let item = this.closest('.shb-item');
  let id = item.dataset.id
  let color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  let size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');


  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];
    if (key.id === id && key.color === color && key.size === size) {
      delete shoppingBag[i];
      shoppingBag = shoppingBag.filter(function (x) {
        return x !== undefined && x !== null;
      });
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

// empty bag
function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = `<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>`;

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = `Total price: 0`;
  cartCount.innerHTML = '(0)';
  checkCartPriceAndCount();
}

function checkout() {

  document.querySelector('.shopping-bag_products').innerHTML = `<h2 class="bag-is-empty">Thank for your purchase</h2>`;

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = `Total price: 0`;
  cartCount.innerHTML = '(0)';
  checkCartPriceAndCount();
}

// totalPrice outpuy
function outTotalPrice() {

  let fullPrice = 0;
  let shb = getFromLS('shoppingBag');

  for (let i = 0; i < shb.length; i++) {
    let key = shb[i];
    let itemPrice = key.price * key.count;
    fullPrice += itemPrice;
    console.log(fullPrice);
  }

  totalPrice.textContent = `Total price: £${fullPrice}`;
}

//
function showShoppingBagProducts() {
  shoppingBagHTML.innerHTML = createShoppingBagProducts() || `<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>`;;
  // plus and minus btns

  itemBtnClickHandler('.param_quantity--plus', plusGood);
  itemBtnClickHandler('.param_quantity--minus', minusGood);
  itemBtnClickHandler('.shb-item_remove-item', removeItemFromBag);

}

function createShoppingBagProducts() {
  let output = '';

  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];
    output += createShoppingBagProduct(key);
  }

  return output;
}

// Shopping Bag Product template
function createShoppingBagProduct(key) {
  return `
  <div class="shb-item" data-id="${key.id}">
  <a class="shb-item_img new-label" href="./item.html">
    <img src="${key.img}" alt="product-in-bag">
  </a>
  <div class="shb-item_info">
    <a class="shb-item_name" href="./item.html"><h4>${key.title}</h4></a>
    <span class="shb-item_price">£${key.price * key.count}</span>
    <p class="shb-item_params">
      <span class="param_color">Color: ${key.color}</span>
      <span class="param_size">Size: ${key.size}</span>
      <span class="param_quantity">Quantity: <span class="param_quantity--minus" data-id="${key.id}">−</span><span id="quantity-in-bag">${key.count}</span><span class="param_quantity--plus" data-id="${key.id}">+</span></span>
    </span>
    <a class="shb-item_remove-item" href="#">Remove item</a>
  </div>
</div>
  `;
}