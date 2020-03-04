'use strict';

showProductsInCatalog();

var leftBestOfferProducts = createLeftProductsInBestOffer(lsCatalog);
var rightBestOfferProducts = createRightProductsInBestOffer(lsCatalog);

// let bestOfferItemLeft = document.querySelectorAll('.best-offer_item')[0];
// let bestOfferItemRight = document.querySelectorAll('.best-offer_item')[1];

var currentItem = 0;

var topArrows = Array.from(document.querySelectorAll('.selection-arrows_top'));

var bottomArrows = Array.from(document.querySelectorAll('.selection-arrows_bottom'));

bottomArrows[0].insertBefore(createBestOfferItemLeft(0));

bottomArrows[1].insertBefore(createBestOfferItemRight(0));

function createBestOfferItemLeft(num) {
  return leftBestOfferProducts[num];
}

function createBestOfferItemRight(num) {
  return rightBestOfferProducts[num];
}

var productsItems = document.querySelectorAll('.products_item');

for (var i = 0, len = productsItems.length; i < len; i++) {
  var key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}

document.querySelector('.banner_link').addEventListener('click', addItemToTL);

function createLeftProductsInBestOffer(storage) {
  var output = [];

  for (var _i = 0; _i < window.bestOffer.left.length; _i++) {
    var leftKey = window.bestOffer.left[_i];

    for (var j = 0; j < storage.length; j++) {
      var storageKey = storage[j];
      if (leftKey === storageKey.id) {
        output.push(createProductTemplate(storageKey));
      }
    }
  }
  return output;
}

function createRightProductsInBestOffer(storage) {
  var output = [];

  for (var _i2 = 0; _i2 < window.bestOffer.right.length; _i2++) {
    var leftKey = window.bestOffer.right[_i2];

    for (var j = 0; j < storage.length; j++) {
      var storageKey = storage[j];
      if (leftKey === storageKey.id) {
        output.push(createProductTemplate(storageKey));
      }
    }
  }
  return output;
}

function showProductsInCatalog() {
  productsList.innerHTML = createProductItemsInArrivals(lsCatalog);
}

function createProductItemsInArrivals(storage) {
  var output = '';
  for (var _i3 = 0, _len = storage.length; _i3 < _len; _i3++) {
    var _key = storage[_i3];
    if (_key.hasNew) {
      output += createProductTemplate(_key);
    }
  }
  return output;
}