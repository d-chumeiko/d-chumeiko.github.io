"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var filter = document.getElementsByClassName("catalog_filter")[0];
var mobileFilter = document.getElementsByClassName("filter-list--hidden")[0];

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
        for (var i = 0; i < subListItem.length; i++) {
            subListItem[i].classList.remove("highlight"); // У всех елементов подменю убрать класс
        }
        mobileItem[index].innerHTML = parentListHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML  родительского li по умолчанию
        mobileItem[index].classList.remove("select"); //Елементу мобильного списка убрать класс
    } else {
        parentList.classList.add("select"); // Родительскому li добавить класс "select"
        value.innerHTML = targetHtml; // Значение фильтра в родительском елементе на InnerHTML елемента по которому был клик 
        mobileItem[index].innerHTML = targetHtml; // Значение фильтра Елемента мобильного списка  на InnerHTML елемента по которому был клик 
        mobileItem[index].classList.add("select"); //Елементу мобильного списка добавить класс
        for (var _i = 0; _i < subListItem.length; _i++) {
            subListItem[_i].classList.remove("highlight"); // У всех елементов подменю убрать класс
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