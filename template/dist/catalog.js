"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// filter elements from html
var filter = document.querySelector(".catalog_filter");
var filterListHidden = document.querySelector(".filter-list--hidden");

// listener to enable filter
filter.addEventListener('click', configureFilterSection);

// show catalog products
showProductsInCatalog();

// catalog items
var productsItems = productsList.children;

// listners to catalog items
for (var i = 0, len = productsItems.length; i < len; i++) {
  var key = productsItems[i];
  key.addEventListener('click', addItemToLS);
}

// showing catalog items
function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
  outputCatalogInfo();
}

// creating catalog items
function createProductItems(storage) {
  var output = '';
  for (var _i = 0, _len = storage.length; _i < _len; _i++) {
    var _key = storage[_i];
    if (_key.category === 'women') {
      output += createProductTemplate(_key);
    }
  }

  return output;
}

// catalog info-text block
function createCatalogInfo() {
  var block = document.createElement("div");
  block.className = "catalog_info-text";
  block.innerHTML = "\n    <h3 class=\"catalog_heading\">\n      Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags\n    </h3>\n    <p class=\"under-heading-description\">\n      This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer\n      ends at 11:59 GMT on March 1st 2019\n    </p>";
  return block;
}

// DEV -> output catalog info-text block depending device
function outputCatalogInfo() {
  var prodCh = productsList.children;
  var clientWidth = document.body.clientWidth;

  clientWidth > 1024 ? productsList.insertBefore(createCatalogInfo(), prodCh[4]) : clientWidth > 767 && clientWidth < 1025 ? productsList.insertBefore(createCatalogInfo(), prodCh[3]) : productsList.insertBefore(createCatalogInfo(), prodCh[2]);
}

// RES -> output catalog info-text block depending resize
window.addEventListener("resize", function () {
  productsList.querySelector(".catalog_info-text").remove();
  outputCatalogInfo();
});

// filter conifgure
function configureFilterSection(e) {
  var trg = e.target;

  if (trg.classList.contains("item-params_option")) {

    var filterList = document.querySelector('.filter-list');
    var filterListItem = trg.closest('.filter-list_item');
    var filterListItemHeading = filterListItem.querySelector(".filter-list_item-heading").textContent;
    var filterListItemParams = trg.parentElement.children;
    var _filterListHidden = document.querySelector(".filter-list--hidden");
    var filterListItemShorten = _filterListHidden.querySelectorAll(".filter-list_item-shorten");
    var indexOfFilterListItem = [].concat(_toConsumableArray(filterList.children)).indexOf(filterListItem);
    var selectedFilterListItem = filterListItem.querySelector(".filter-list_item--selected");
    var trgValue = trg.innerHTML;

    if (trgValue === 'Not selected') {

      filterListItem.classList.remove("select");

      for (var _i2 = 0; _i2 < filterListItemParams.length; _i2++) {
        filterListItemParams[_i2].classList.remove("highlight");
      }

      filterListItemShorten[indexOfFilterListItem].innerHTML = filterListItemHeading;
      filterListItemShorten[indexOfFilterListItem].classList.remove("select");
    } else {

      filterListItem.classList.add("select");
      selectedFilterListItem.innerHTML = trgValue;
      filterListItemShorten[indexOfFilterListItem].innerHTML = trgValue;
      filterListItemShorten[indexOfFilterListItem].classList.add("select");

      for (var _i3 = 0; _i3 < filterListItemParams.length; _i3++) {
        filterListItemParams[_i3].classList.remove("highlight");
      }

      trg.classList.add("highlight");
    }
  }
}

// show hidden filter
filterListHidden.addEventListener("click", function (e) {
  var trg = e.target;

  if (trg.classList.contains("close-filter")) {
    filter.classList.remove("filter-open");
  } else {
    filter.classList.add("filter-open");
  }
});


if (!Element.prototype.closest) {

  // реализуем
  Element.prototype.closest = function(css) {
    var node = this;

    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
}

// matches ie

// проверяем поддержку
if (!Element.prototype.matches) {

  // определяем свойство
  Element.prototype.matches = Element.prototype.matchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector;

}

// Array.from for IE
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike /*, mapFn, thisArg */) {
      var C = this;
      var items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {

        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
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
      A.length = len;
      return A;
    };
  }();
}