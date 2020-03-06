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


function plusGood(e) {

  let trg = e.target;
  console.log(trg);

  let id = this.dataset.id;

  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];
    if (key.id === id) {
      key.count++;
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts()
}

function minusGood() {
  let id = this.dataset.id;

  for (let i = 0; i < shoppingBag.length; i++) {

    if (shoppingBag[i].id === id) {
      if (shoppingBag[i].count > 1) {
        shoppingBag[i].count--;
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
  showShoppingBagProducts()
}

function removeItemFromBag(e) {
  e.preventDefault();
  let id = this.closest('.shb-item').dataset.id;

  for (let i = 0; i < shoppingBag.length; i++) {

    if (shoppingBag[i].id === id) {
      delete shoppingBag[i];
      shoppingBag = shoppingBag.filter(function (x) {
        return x !== undefined && x !== null;
      });
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts()
}

// empty bag
function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = `<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>`;

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = `Total price: 0`;
  cartCount.innerHTML = '(0)';
}

// totalPrice outpuy
function outTotalPrice() {
  let fullPrice = 0;

  for (let i = 0; i < shoppingBag.length; i++) {
    let key = shoppingBag[i];
    fullPrice += key['price'];
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
    <h4 class="shb-item_name">${key.title}</h4>
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