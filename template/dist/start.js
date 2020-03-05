'use strict';

// show new arrivals products
showProductsInCatalog();

// counter for taking and changing best offer products
var currentItem = 0;

// left/right best offer products in arrays
var leftBestOfferProducts = createLeftProductsInBestOffer(lsCatalog);
var rightBestOfferProducts = createRightProductsInBestOffer(lsCatalog);

// best offer arrows arrays
var topArrows = Array.from(document.querySelectorAll('.selection-arrows_top'));
var bottomArrows = Array.from(document.querySelectorAll('.selection-arrows_bottom'));

// best offer arrows
var leftTopArrow = topArrows[0];
var leftBottomArrow = bottomArrows[0];
var rightTopArrow = topArrows[1];
var rightBottomArrow = bottomArrows[1];

// show best offer default products 
leftBottomArrow.insertAdjacentHTML('beforebegin', leftBestOfferProducts[currentItem]);
rightBottomArrow.insertAdjacentHTML('beforebegin', rightBestOfferProducts[currentItem]);

// left best offer listeners
leftBottomArrow.addEventListener('click', changeProductToNext.bind(null, leftBestOfferProducts, leftBottomArrow, 0));
leftTopArrow.addEventListener('click', changeProductToPrev.bind(null, leftBestOfferProducts, leftBottomArrow, 0));

// right best offer listeners
rightBottomArrow.addEventListener('click', changeProductToNext.bind(null, rightBestOfferProducts, rightBottomArrow, 1));
rightTopArrow.addEventListener('click', changeProductToPrev.bind(null, rightBestOfferProducts, rightBottomArrow, 1));

// adding event listeners to all products on the page
addEventListenersToProducts();

// adding event listener to left banner
document.querySelector('.banner_link').addEventListener('click', addItemToTL);

// next product
function changeProductToNext(products, arrow, num) {

  currentItem++;
  var el = document.querySelectorAll('.products_item')[num];
  console.log(el);
  if (currentItem <= products.length) {
    if (currentItem == products.length) {
      currentItem = 0;
    }
    document.querySelectorAll('.best-offer_item')[num].removeChild(el);
    arrow.insertAdjacentHTML('beforebegin', products[currentItem]);
  }

  addEventListenersToProducts();
}

// prev product
function changeProductToPrev(products, arrow, num) {

  var el = document.querySelectorAll('.products_item')[num];
  document.querySelectorAll('.best-offer_item')[num].removeChild(el);

  if (currentItem == 0) {
    currentItem = products.length;
  }

  if (currentItem > 0) {
    currentItem--;
    arrow.insertAdjacentHTML('beforebegin', products[currentItem]);
  }

  addEventListenersToProducts();
  return currentItem;
}

// create left best offer item
function createBestOfferItemLeft(num) {
  return leftBestOfferProducts[num];
}

// create right best offer item
function createBestOfferItemRight(num) {
  return rightBestOfferProducts[num];
}

// getting all products on the page
function addEventListenersToProducts() {
  var productsItems = document.querySelectorAll('.products_item');

  for (var i = 0, len = productsItems.length; i < len; i++) {
    var key = productsItems[i];
    key.addEventListener('click', addItemToTL);
  }
}

// creating Left BestOffer Product Item
function createLeftProductsInBestOffer(storage) {
  var output = [];

  for (var i = 0; i < window.bestOffer.left.length; i++) {
    var leftKey = window.bestOffer.left[i];

    for (var j = 0; j < storage.length; j++) {
      var storageKey = storage[j];
      if (leftKey === storageKey.id) {
        output.push(createProductTemplate(storageKey));
      }
    }
  }
  return output;
}

// creating Right BestOffer Product Item
function createRightProductsInBestOffer(storage) {
  var output = [];

  for (var i = 0; i < window.bestOffer.right.length; i++) {
    var leftKey = window.bestOffer.right[i];

    for (var j = 0; j < storage.length; j++) {
      var storageKey = storage[j];
      if (leftKey === storageKey.id) {
        output.push(createProductTemplate(storageKey));
      }
    }
  }
  return output;
}

// show products in arrivals
function showProductsInCatalog() {
  productsList.innerHTML = createProductItemsInArrivals(lsCatalog);
}

// creating producrs in arrivals
function createProductItemsInArrivals(storage) {
  var output = '';
  for (var i = 0, len = storage.length; i < len; i++) {
    var key = storage[i];
    if (key.hasNew) {
      output += createProductTemplate(key);
    }
  }
  return output;
}