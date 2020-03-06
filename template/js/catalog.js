// filter elements from html
let filter = document.querySelector(".catalog_filter");
let filterListHidden = document.querySelector(".filter-list--hidden");

// listener to enable filter
filter.addEventListener('click', configureFilterSection);

// show catalog products
showProductsInCatalog();

// catalog items
let productsItems = productsList.children;

// listners to catalog items
for (let i = 0, len = productsItems.length; i < len; i++) {
  let key = productsItems[i];
  key.addEventListener('click', addItemToLS);
}

// showing catalog items
function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
  outputCatalogInfo();
}

// creating catalog items
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

  (clientWidth > 1024) ? productsList.insertBefore(createCatalogInfo(), prodCh[4]):
    (clientWidth > 767 && clientWidth < 1025) ? productsList.insertBefore(createCatalogInfo(), prodCh[3]) :
    productsList.insertBefore(createCatalogInfo(), prodCh[2]);
}

// RES -> output catalog info-text block depending resize
window.addEventListener("resize", function () {
  productsList.querySelector(".catalog_info-text").remove();
  outputCatalogInfo()
});

// filter conifgure
function configureFilterSection(e) {
  let trg = e.target;

  if (trg.classList.contains("item-params_option")) {
    
    let filterList = document.querySelector('.filter-list')
    let filterListItem = trg.closest('.filter-list_item');
    let filterListItemHeading = filterListItem.querySelector(".filter-list_item-heading").textContent;
    let filterListItemParams = trg.parentElement.children; 
    let filterListHidden = document.querySelector(".filter-list--hidden");
    let filterListItemShorten = filterListHidden.querySelectorAll(".filter-list_item-shorten"); 
    let indexOfFilterListItem = [...filterList.children].indexOf(filterListItem);
    let selectedFilterListItem = filterListItem.querySelector(".filter-list_item--selected");
    let trgValue = trg.innerHTML;

    if (trgValue === 'Not selected') { 

      filterListItem.classList.remove("select"); 
      
      for (let i = 0; i < filterListItemParams.length; i++) {
        filterListItemParams[i].classList.remove("highlight"); 
      }

      filterListItemShorten[indexOfFilterListItem].innerHTML = filterListItemHeading;
      filterListItemShorten[indexOfFilterListItem].classList.remove("select");
      
    } 
    
    else {

      filterListItem.classList.add("select");
      selectedFilterListItem.innerHTML = trgValue; 
      filterListItemShorten[indexOfFilterListItem].innerHTML = trgValue;
      filterListItemShorten[indexOfFilterListItem].classList.add("select");
      
      for (let i = 0; i < filterListItemParams.length; i++) {
        filterListItemParams[i].classList.remove("highlight");
      }

      trg.classList.add("highlight");
    }
  }
}

// show hidden filter
filterListHidden.addEventListener("click", function (e) {
  let trg = e.target;

  if (trg.classList.contains("close-filter")) {
    filter.classList.remove("filter-open");
  }
  
  else {
    filter.classList.add("filter-open");
  }
});