// корзина
let cart = {};

// нижнее подчеркивание - получение из html
const _mainCartContent = document.getElementById('main-cart_content');

// операции с LS
saveToLS('goods', goods);

let goodsLS = JSON.parse(localStorage.getItem('goods'));


///// Функции

// добавить в корзину
function addToCart() {
  let code = this.dataset.code;
  if (cart[code] !== undefined) {
    cart[code]++;
  } else {
    cart[code] = 1;
  }
  saveToLS('cart', cart);
  checkCart();
  checkCartCount();
}

function takeDefColor(key) {
  let def = key.defaultColor;
  for (let el of key.src) {
    if (el[def]) return el[def];
  }
}

function takeDefAvailable(key) {
  let def = key.defaultColor;
  for (let el of key.src) {
    if (el[def]) return el.available;
  }
}


function checkCart() {
  let lsItem = localStorage.getItem('cart');
  if (lsItem != null) {
    cart = JSON.parse(lsItem);
  }
  checkCartCount();
}

// сохранение в LocalStorage
function saveToLS(key, elem) {
  localStorage.setItem(key, JSON.stringify(elem))
}

// загрузка с LocalStorage
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

// обработчик кнопок по клику
function itemBtnHandler(className, functionName) {
  document.querySelectorAll(className).forEach(btn => {
    btn.addEventListener('click', functionName);
  })
}

function saveCartToLs() {
  saveToLS('cart', cart)
}

function checkCartCount() {
  let cartCount = document.querySelector('.cart_count');

  let cartCountLS = getFromLS('cart');
  let sum = 0;

  for (let el in cartCountLS) {
    sum += cartCountLS[el];
  }

  return cartCount.textContent = sum;

}

