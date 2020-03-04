showProductsInCatalog();

let productsItems = productsList.children;

for (let i = 0, len = productsItems.length; i < len; i++) {
  let key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}

document.querySelector('.banner_link').addEventListener('click', addItemToTL);










function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
}

function createProductItems(storage) {
  let output = '';
  for (let i = 0, len = storage.length; i < len; i++) {
    let key = storage[i];
    if (key.hasNew) {
      output += createProductTemplate(key);
    }
  }
  return output;
}