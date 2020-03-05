let gamburger = document.querySelector('.navbar_link--toggle');
let navbarButtonSearch = document.querySelector('.navbar_button-search');
let productsList = document.querySelector('.products_list');
let cartCount = document.querySelector('.count-products-in-bag');
let textOfEmptyBag = document.querySelector('.bag-is-empty');

gamburger.addEventListener('click', gamburgerToggle);
navbarButtonSearch.addEventListener('click', searchMenuToggle);

let lsCatalog;


saveToLS('catalog', window.catalog);
lsCatalog = JSON.parse(localStorage.getItem('catalog'));

checkCartCount();




function checkCartCount() {

  let cartCountLS = getFromLS('shoppingBag');
  
  let quantity = 0;
  let fullPrice = 0

  for (let i = 0; i < cartCountLS.length; i++) {
    let key = cartCountLS[i];
    quantity += key['count'];
    fullPrice += key['price'];
  }

  cartCount.textContent = `£${fullPrice} (${quantity})`;

}

function addItemToLS(e) {
  let trg = e.target.parentNode;
  let trgId = trg.dataset.id;
  localStorage.setItem('itemId', JSON.stringify(trgId));
}

function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

function createProductTemplate(key) {
  return `
    <div class="products_item ${key.hasNew ? 'new-label' : ''}" data-id="${key.id}" data-price="${key.price.toFixed(2)}">
      <a href="./item.html">
        <img src="${key.thumbnail[0]}" alt="product-image" class="products_item_img">
        <h4 class="products_item_title">${key.title}</h4>
        <p class="products_item_price">£${key.price.toFixed(2)}</p>
      </a>
    </div>
    `
}
























function saveToLS(key, elem) {
  localStorage.setItem(key, JSON.stringify(elem))
}



function searchMenuToggle() {
  document.querySelector('.navbar_text-to-search').classList.toggle('navbar_text-to-search--active');
}

function gamburgerToggle() {
  const navs = document.querySelectorAll('.navbar_menu, .navbar_search');
  const gamburgerImg = gamburger.querySelector('img');

  for (let i = 0; i < navs.length; i++) {
    navs[i].classList.toggle('navbar_link--toggle-show');
  }
  
  gamburgerImg.classList.toggle('gamburger-img-show');
  gamburgerImg.classList.contains('gamburger-img-show') ? gamburgerImg.src = './img/icons/close.png' : gamburgerImg.src = './img/icons/icon-menu.png';
}

  // Array.from for IE

  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
  
      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;
  
        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);
  
        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }
  
        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
  
          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
  
        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);
  
        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  
        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }