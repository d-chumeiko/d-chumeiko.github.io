let itemId = JSON.parse(localStorage.getItem('itemId'));
let itemOptions = document.querySelector('.options');

itemOptions.innerHTML = showItemOnPage(lsCatalog);

// thumbs listener 
document.querySelector('.thumbs-img').addEventListener('click', showFullImg);

// add to bag btn
let addToBagBtn = document.getElementById('add-to-cart-btn');

// sizes and colors from html
let optionSizes = document.querySelector('.option_sizes');
let optionColors = document.querySelector('.option_colors');

// listeners for colors and sizes
optionSizes.addEventListener('click', chooseActiveSize);
optionColors.addEventListener('click', chooseActiveColor);

// add btn listener
addToBagBtn.addEventListener('click', addToCart);

// product from LS or empty arr
let shoppingBag = getFromLS('shoppingBag') || [];

// add product to bag
function addToCart(e) {
  e.preventDefault();

  let size, color;
  let id = this.dataset.id;
  let title = document.querySelector('.options_heading').textContent;
  let price = +document.querySelector('.options_price').textContent.slice(1);
  let img = document.querySelector('.full-img_item').src;

  let sizes = document.querySelectorAll('.size-of-item');
  let colors = document.querySelectorAll('.color-of-item');

  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].classList.contains('option--active')) size = sizes[i].textContent;
  }

  for (let i = 0; i < colors.length; i++) {
    if (colors[i].classList.contains('option--active')) color = colors[i].textContent;
  }

  let item = {
    id: id,
    title: title,
    price: price,
    img: img,
    size: size,
    color: color,
  };

  if (!shoppingBag.length) {
    item.count = 1;
    shoppingBag.push(item);
  }

  else {
    let isSame = shoppingBag.some( (el) => (el.id === id && el.color === color && el.size === size) );

    if (!isSame) {
      item.count = 1;
      shoppingBag.push(item);
    }

    else {
      shoppingBag.forEach((el) => {
        if (el.id === id && el.color === color && el.size === size) {
          el.count++;
        }
      });
    }

  }

  saveToLS('shoppingBag', shoppingBag);
  checkCartPriceAndCount();
}


// choose active color
function chooseActiveColor(e) {
  let trg = e.target;
  if (trg.classList.contains('color-of-item')) {
    let itemColors = optionColors.querySelectorAll('.color-of-item');
    for (let i = 0; i < itemColors.length; i++) {
      itemColors[i].classList.remove('option--active');
    }
    trg.classList.add('option--active')
  }
}

// choose active size
function chooseActiveSize(e) {
  let trg = e.target;
  if (trg.classList.contains('size-of-item')) {
    let itemSizes = optionSizes.querySelectorAll('.size-of-item');
    for (let i = 0; i < itemSizes.length; i++) {
      itemSizes[i].classList.remove('option--active');
    }
    trg.classList.add('option--active')
  }
}

// show full image by thumbs clicking
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

// show product item
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

// item template
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
        <p class="options_price">£${key.discountedPrice ? key.discountedPrice.toFixed(2) : (key.price).toFixed(2)}</p>
        <p class="option_sizes">
          <span>Size:</span>
          <span class="size-of-item option--active">${key.sizes[0]}</span>
          ${key.sizes.slice(1).map(size => `<span class="size-of-item">${size}</span>`).join(' ')}
        </p>
        <p class="option_colors">
          <span>Color:</span>
          <span class="color-of-item option--active">${key.colors[0]}</span>
          ${key.colors.slice(1).map(color => `<span class="color-of-item">${color}</span>`).join(' ')}
        </p>

        <div class="item_add-to-bag-btn">
          <a href="#" class="main-btn" id="add-to-cart-btn" data-id="${key.id}">Add to bag</a>
        </div>
    </div>
      `
}