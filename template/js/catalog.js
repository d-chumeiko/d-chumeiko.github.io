let filter = document.getElementsByClassName("catalog_filter")[0];
let mobileFilter = document.getElementsByClassName("filter-list--hidden")[0];

showProductsInCatalog();


for (let i = 0, len = productsItems.length; i < len; i++) {
  let key = productsItems[i];
  key.addEventListener('click', addItemToTL);
}










function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
  outputCatalogInfo();
}

function createProductItems(storage) {
    let output = '';
    for (let i = 0, len = storage.length; i < len; i++) {
      let key = storage[i];
      if (key.category === 'women') {
        output += createProductTemplate(key);
      }
    }

    return output;
}

// catalog info-text block
function createCatalogInfo() {
  let block = document.createElement("div");
  block.className = "catalog_info-text";
  block.innerHTML = `
    <h3 class="catalog_heading">
      Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags
    </h3>
    <p class="under-heading-description">
      This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer
      ends at 11:59 GMT on March 1st 2019
    </p>`;
  return block;
}

// DEV -> output catalog info-text block depending device
function outputCatalogInfo() {
  let prodCh = productsList.children;
  let clientWidth = document.body.clientWidth;

  (clientWidth > 1024) ? productsList.insertBefore
    (createCatalogInfo(), prodCh[4]) :
  (clientWidth > 767 && clientWidth < 1025) ? productsList.insertBefore
    (createCatalogInfo(), prodCh[3]) :
  productsList.insertBefore(createCatalogInfo(), prodCh[2]);
}

// RES -> output catalog info-text block depending resize
window.addEventListener("resize", function () {
  productsList.querySelector(".catalog_info-text").remove();
  outputCatalogInfo()
});





















filter.addEventListener("click", function (e) {
  let target = e.target;
  if (!target.classList.contains("sub-list-item")) return;
  let parentList = target.parentElement.parentElement; //Родитель родителя елемента по которому был клик (родительский li)
  let parentListHtml = parentList.getElementsByClassName("list-item-caption")[0].innerHTML; //InnerHtml родительского li по умолчанию
  let subListItem = target.parentElement.children; // Дети родителя елемента по которому был клик (родительский ul в котором подменю)
  let mobilList = document.querySelector(".filter-list--hidden"); // Мобильный список
  let mobileItem = mobilList.getElementsByClassName("filter-list-item-mobile"); // Елемент мобильного списка
  let index = [...parentList.parentNode.children].indexOf(parentList); //Индекс елемента по которому был клик(преобразует NodeList в массив)
  let value = parentList.getElementsByClassName("select-value")[0]; // Значение фильтра в родительском елементе
  let targetHtml = target.innerHTML; // InnerHTML елемента по которому был клик
  if (targetHtml === "Not selected") { // Если InnerHTML елемента по которому был клик равен "Not selected"
    parentList.classList.remove("select"); // У родительского li убрать класс "select"
    for (let i = 0; i < subListItem.length; i++) {
      subListItem[i].classList.remove("highlight"); // У всех елементов подменю убрать класс
    }
    mobileItem[index].innerHTML = parentListHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML  родительского li по умолчанию
    mobileItem[index].classList.remove("select"); //Елементу мобильного списка убрать класс
  } else {
    parentList.classList.add("select"); // Родительскому li добавить класс "select"
    value.innerHTML = targetHtml; // Значение фильтра в родительском елементе на InnerHTML елемента по которому был клик 
    mobileItem[index].innerHTML = targetHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML елемента по которому был клик 
    mobileItem[index].classList.add("select"); //Елементу мобильного списка добавить класс
    for (let i = 0; i < subListItem.length; i++) {
      subListItem[i].classList.remove("highlight"); // У всех елементов подменю убрать класс
    }
    target.classList.add("highlight"); // Добавить класс елементу по котрому был клик
  }
});

//Показать мобильный фильтр
mobileFilter.addEventListener("click", function (e) {
  let target = e.target;
  if (target.classList.contains("close-filter")) {
    filter.classList.remove("filter-open");
  } else filter.classList.add("filter-open");
});