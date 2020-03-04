'use strict';

showProductsInCatalog();

for (var i = 0, len = productsItems.length; i < len; i++) {
  var key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}

function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
}

function createProductItems(storage) {
  var output = '';
  for (var _i = 0, _len = storage.length; _i < _len; _i++) {
    var _key = storage[_i];
    if (_key.hasNew) {
      output += createProductTemplate(_key);
    }
  }
  return output;
}