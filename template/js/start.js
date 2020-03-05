// show new arrivals products
showProductsInCatalog();

// counter for taking and changing best offer products
let currentItem = 0;

// left/right best offer products in arrays
let leftBestOfferProducts = createLeftProductsInBestOffer(lsCatalog); 
let rightBestOfferProducts = createRightProductsInBestOffer(lsCatalog);

// best offer arrows arrays
let topArrows = Array.from(document.querySelectorAll('.selection-arrows_top'));
let bottomArrows = Array.from(document.querySelectorAll('.selection-arrows_bottom'));

// best offer arrows
let leftTopArrow = topArrows[0];
let leftBottomArrow = bottomArrows[0];
let rightTopArrow = topArrows[1];
let rightBottomArrow = bottomArrows[1];

// show best offer default products 
leftBottomArrow.insertAdjacentHTML('beforebegin', leftBestOfferProducts[currentItem]);
rightBottomArrow.insertAdjacentHTML('beforebegin', rightBestOfferProducts[currentItem]);

// left best offer listeners
leftBottomArrow.addEventListener('click', changeProductToNext.bind(null, leftBestOfferProducts, leftBottomArrow, 0));
leftTopArrow.addEventListener('click', changeProductToPrev.bind(null, leftBestOfferProducts, leftBottomArrow, 0));

// right best offer listeners
rightBottomArrow.addEventListener('click', changeProductToNext.bind(null, rightBestOfferProducts, rightBottomArrow, 1));
rightTopArrow.addEventListener('click', changeProductToPrev.bind(null, rightBestOfferProducts, rightBottomArrow, 1));

// output prices of chosen products
sumBestOfferPrices();

// adding event listeners to all products on the page
addEventListenersToProducts();

// adding event listener to left banner
document.querySelector('.banner_link').addEventListener('click', addItemToTL);

// sum prices
function sumBestOfferPrices() {
  let oldPriceHTML = document.querySelector('.best-offer_old-price');
  let newPriceHTML = document.querySelector('.best-offer_new-price');
  let discount = +window.bestOffer.discount;

  let leftProductPrice = +document.querySelectorAll('.products_item_price')[0].textContent.slice(1);
  let RightProductPrice = +document.querySelectorAll('.products_item_price')[1].textContent.slice(1);

  let oldPrice = (leftProductPrice + RightProductPrice).toFixed(2);

  oldPriceHTML.textContent = `£${oldPrice}`;
  newPriceHTML.textContent = `£${(oldPrice - discount).toFixed(2)}`;

}

// next product
function changeProductToNext(products, arrow, num) {
  
  let el = document.querySelectorAll('.products_item')[num];
  currentItem++;
  if (currentItem <= products.length) {
    
    if (currentItem == products.length) {
      currentItem = 0;
    }
    document.querySelectorAll('.best-offer_item')[num].removeChild(el);
    arrow.insertAdjacentHTML('beforebegin', products[currentItem]);
  }
  console.log(currentItem);
  addEventListenersToProducts();
  sumBestOfferPrices();
}

// prev product
function changeProductToPrev(products, arrow, num) {

  let el = document.querySelectorAll('.products_item')[num];
  document.querySelectorAll('.best-offer_item')[num].removeChild(el);
  
  if (currentItem == 0) {
    currentItem = products.length;
  }

  if (currentItem > 0) {
    currentItem--;
    arrow.insertAdjacentHTML('beforebegin', products[currentItem]);
  }

  addEventListenersToProducts();
  sumBestOfferPrices();
  console.log(currentItem);
  return currentItem;
}

// create left best offer item
function createBestOfferItemLeft(num) {
  return leftBestOfferProducts[num];
}

// create right best offer item
function createBestOfferItemRight(num) {
  return rightBestOfferProducts[num]
}

// getting all products on the page
function addEventListenersToProducts() {
  let productsItems = document.querySelectorAll('.products_item');

  for (let i = 0, len = productsItems.length; i < len; i++) {
    let key = productsItems[i];
    key.addEventListener('click', addItemToTL);
  }
}

// creating Left BestOffer Product Item
function createLeftProductsInBestOffer(storage) {
  let output = [];
  
  for (let i = 0; i < window.bestOffer.left.length; i++) {
    let leftKey = window.bestOffer.left[i];

    for (let j = 0; j < storage.length; j++) {
      let storageKey = storage[j];
      if (leftKey=== storageKey.id) {
        output.push(createProductTemplate(storageKey));
      }
    }
  }
  return output;
}

// creating Right BestOffer Product Item
function createRightProductsInBestOffer(storage) {
  let output = [];
  
  for (let i = 0; i < window.bestOffer.right.length; i++) {
    let leftKey = window.bestOffer.right[i];

    for (let j = 0; j < storage.length; j++) {
      let storageKey = storage[j];
      if (leftKey=== storageKey.id) {
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
  let output = '';
  for (let i = 0, len = storage.length; i < len; i++) {
    let key = storage[i];
    if (key.hasNew) {
      output += createProductTemplate(key);
    }
  }
  return output;
}