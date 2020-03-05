'use strict';

var itemId = JSON.parse(localStorage.getItem('itemId'));
var itemOptions = document.querySelector('.options');

itemOptions.innerHTML = showItemOnPage(lsCatalog);

document.querySelector('.thumbs-img').addEventListener('click', showFullImg);

function showFullImg(e) {
  var trg = e.target;

  if (trg.tagName == 'IMG') {

    var fullImg = document.querySelector(".full-img_item");
    var thumbsItems = document.querySelectorAll('.thumbs-img_item');
    var thumbImgSrc = trg.src;

    fullImg.src = thumbImgSrc;

    for (var i = 0; i < thumbsItems.length; i++) {
      thumbsItems[i].classList.remove("thumbs-img_item--active");
    }

    trg.parentElement.classList.add("thumbs-img_item--active");
  }
}

function showItemOnPage(storage) {
  var output = '';
  for (var i = 0, len = storage.length; i < len; i++) {
    var key = storage[i];
    if (key.id == itemId) {
      output = createItemTemplate(key);
    }
  }

  return output;
}

function createItemTemplate(key) {
  return '\n      <div class="options_img">\n        <p class="full-img">\n          <img class="full-img_item" src="' + key.preview[0] + '" alt="item img">\n        </p>\n        <div class="thumbs-img">\n          <p class="thumbs-img_item thumbs-img_item--active">\n            <img src="' + key.thumbnail[0] + '" alt="item thumbs">\n          </p>\n          <p class="thumbs-img_item">\n            <img src="' + key.thumbnail[1] + '" alt="item thumbs">\n          </p>\n          <p class="thumbs-img_item">\n            <img src="' + key.thumbnail[2] + '" alt="item thumbs">\n          </p>\n        </div>\n      </div>\n\n      <div class="options_data">\n        <h1 class="options_heading">' + key.title + '</h1>\n        <p class="options_descr">' + key.description + '</p>\n        <p class="options_price">\xA3' + key.price.toFixed(2) + '</p>\n        <p class="option_sizes">\n          <span>Size:</span>\n          <span class="size-of-item option--active">' + key.sizes[0] + '</span>\n          <span class="size-of-item">' + (key.sizes[1] ? key.sizes[1] : '') + '</span>\n          <span class="size-of-item">' + (key.sizes[2] ? key.sizes[2] : '') + '</span>\n        </p>\n        <p class="option_colors">\n          <span>Color:</span>\n          <span class="color-of-item option--active">' + key.colors[0] + '</span>\n          <span class="color-of-item">' + (key.colors[1] ? key.colors[1] : '') + '</span>\n          <span class="color-of-item">' + (key.colors[2] ? key.colors[2] : '') + '</span>\n        </p>\n\n        <div class="item_add-to-bag-btn">\n          <a href="#" class="main-btn" data-id="' + key.id + '">Add to bag</a>\n        </div>\n    </div>\n      ';
}