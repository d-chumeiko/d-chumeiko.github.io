showProductsInCatalog();

let leftBestOfferProducts = createLeftProductsInBestOffer(lsCatalog); 
let rightBestOfferProducts = createRightProductsInBestOffer(lsCatalog);

// let bestOfferItemLeft = document.querySelectorAll('.best-offer_item')[0];
// let bestOfferItemRight = document.querySelectorAll('.best-offer_item')[1];

let currentItem = 0;

let topArrows = Array.from(document.querySelectorAll('.selection-arrows_top'));

let bottomArrows = Array.from(document.querySelectorAll('.selection-arrows_bottom'));

bottomArrows[0].insertBefore(createBestOfferItemLeft(0));

bottomArrows[1].insertBefore(createBestOfferItemRight(0));

function createBestOfferItemLeft(num) {
  return leftBestOfferProducts[num];
}

function createBestOfferItemRight(num) {
  return rightBestOfferProducts[num]
}






let productsItems = document.querySelectorAll('.products_item');

for (let i = 0, len = productsItems.length; i < len; i++) {
  let key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}

document.querySelector('.banner_link').addEventListener('click', addItemToTL);

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

function showProductsInCatalog() {
  productsList.innerHTML = createProductItemsInArrivals(lsCatalog);
}

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