let itemId = JSON.parse(localStorage.getItem('itemId'));
let itemOptions = document.querySelector('.options');

itemOptions.innerHTML = showItemOnPage(lsCatalog);

document.querySelector('.thumbs-img').addEventListener('click', showFullImg);




function showFullImg(e) {
  let trg = e.target;

  if (trg.tagName == 'IMG') {

    let fullImg = document.querySelector(".full-img_item");
    let thumbsItems = document.querySelectorAll('.thumbs-img_item');
    let thumbImgSrc = trg.src;

    fullImg.src = thumbImgSrc;

    for (let i = 0; i < thumbsItems.length; i++) {
      thumbsItems[i].classList.remove("thumbs-img_item--active");
    }

    trg.parentElement.classList.add("thumbs-img_item--active");
  }


}



function showItemOnPage(storage) {
  let output = '';
  for (let i = 0, len = storage.length; i < len; i++) {
    let key = storage[i];
    if (key.id == itemId) {
      output = createItemTemplate(key);
    }
  }

  return output;
}

function createItemTemplate(key) {
  return `
      <div class="options_img">
        <p class="full-img">
          <img class="full-img_item" src="${key.preview[0]}" alt="item img">
        </p>
        <div class="thumbs-img">
          <p class="thumbs-img_item thumbs-img_item--active">
            <img src="${key.thumbnail[0]}" alt="item thumbs">
          </p>
          <p class="thumbs-img_item">
            <img src="${key.thumbnail[1]}" alt="item thumbs">
          </p>
          <p class="thumbs-img_item">
            <img src="${key.thumbnail[2]}" alt="item thumbs">
          </p>
        </div>
      </div>

      <div class="options_data">
        <h1 class="options_heading">${key.title}</h1>
        <p class="options_descr">${key.description}</p>
        <p class="options_price">£${key.price}</p>
        <p class="option_sizes">
          <span>Size:</span>
          <span class="size-of-item option--active">${key.sizes[0]}</span>
          <span class="size-of-item">${key.sizes[1] ? key.sizes[1] : ''}</span>
          <span class="size-of-item">${key.sizes[2] ? key.sizes[2] : ''}</span>
        </p>
        <p class="option_colors">
          <span>Color:</span>
          <span class="color-of-item option--active">${key.colors[0]}</span>
          <span class="color-of-item">${key.colors[1] ? key.colors[1] : ''}</span>
          <span class="color-of-item">${key.colors[2] ? key.colors[2] : ''}</span>
        </p>

        <div class="item_add-to-bag-btn">
          <a href="#" class="main-btn" data-id="${key.id}">Add to bag</a>
        </div>
    </div>
      `
}