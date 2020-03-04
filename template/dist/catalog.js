"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var filter = document.getElementsByClassName("catalog_filter")[0];
var mobileFilter = document.getElementsByClassName("filter-list--hidden")[0];

showProductsInCatalog();

var productsItems = productsList.children;

for (var i = 0, len = productsItems.length; i < len; i++) {
  var key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}

function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
  outputCatalogInfo();
}

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

filter.addEventListener("click", function (e) {
  var target = e.target;
  if (!target.classList.contains("sub-list-item")) return;
  var parentList = target.parentElement.parentElement; //Родитель родителя елемента по которому был клик (родительский li)
  var parentListHtml = parentList.getElementsByClassName("list-item-caption")[0].innerHTML; //InnerHtml родительского li по умолчанию
  var subListItem = target.parentElement.children; // Дети родителя елемента по которому был клик (родительский ul в котором подменю)
  var mobilList = document.querySelector(".filter-list--hidden"); // Мобильный список
  var mobileItem = mobilList.getElementsByClassName("filter-list-item-mobile"); // Елемент мобильного списка
  var index = [].concat(_toConsumableArray(parentList.parentNode.children)).indexOf(parentList); //Индекс елемента по которому был клик(преобразует NodeList в массив)
  var value = parentList.getElementsByClassName("select-value")[0]; // Значение фильтра в родительском елементе
  var targetHtml = target.innerHTML; // InnerHTML елемента по которому был клик
  if (targetHtml === "Not selected") {
    // Если InnerHTML елемента по которому был клик равен "Not selected"
    parentList.classList.remove("select"); // У родительского li убрать класс "select"
    for (var _i2 = 0; _i2 < subListItem.length; _i2++) {
      subListItem[_i2].classList.remove("highlight"); // У всех елементов подменю убрать класс
    }
    mobileItem[index].innerHTML = parentListHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML  родительского li по умолчанию
    mobileItem[index].classList.remove("select"); //Елементу мобильного списка убрать класс
  } else {
    parentList.classList.add("select"); // Родительскому li добавить класс "select"
    value.innerHTML = targetHtml; // Значение фильтра в родительском елементе на InnerHTML елемента по которому был клик 
    mobileItem[index].innerHTML = targetHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML елемента по которому был клик 
    mobileItem[index].classList.add("select"); //Елементу мобильного списка добавить класс
    for (var _i3 = 0; _i3 < subListItem.length; _i3++) {
      subListItem[_i3].classList.remove("highlight"); // У всех елементов подменю убрать класс
    }
    target.classList.add("highlight"); // Добавить класс елементу по котрому был клик
  }
});

//Показать мобильный фильтр
mobileFilter.addEventListener("click", function (e) {
  var target = e.target;
  if (target.classList.contains("close-filter")) {
    filter.classList.remove("filter-open");
  } else filter.classList.add("filter-open");
});