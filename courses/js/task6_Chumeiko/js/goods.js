// товаров на странице
let defaultGoodsOnPage = 6;
// количество отрисованных элементов
let itemsOnPage = [];
// активная страница
let activePage;

// нижнее подчеркивание - получение из html
const _goods = document.querySelector('.goods');
const _pagination = document.getElementById('pagination');

// функции при загрузке страницы
renderPaginationElems();
showGoodsOnPage(itemsOnPage[0]);
checkCart();

itemsOnPage.forEach(el => el.addEventListener('click', function () {
  showGoodsOnPage(this);
}));

let _colors = document.querySelectorAll('.color');
let _itemColors = document.querySelectorAll('.item-colors');

let _sortAsc = document.querySelector('.sort-asc-goods_btn');
let _sortDesc = document.querySelector('.sort-desc-goods_btn');
let _filterByAvailable = document.querySelector('.filter-by-available-goods_btn');
let addGoods = document.querySelector('.add-goods_btn');
let popup = document.querySelector('.add-goods-popup');
let formAddFlower = document.getElementById('formAddFlower');
let count = goodsLS.length;

_colors.forEach(el => el.addEventListener('click', changeImageByColor));

_sortAsc.addEventListener('click', sortGoodsAsc.bind(null, 'data-price', _goods));

_sortDesc.addEventListener('click', sortGoodsDesc.bind(null, 'data-price', _goods));

_filterByAvailable.addEventListener('click', filterByAvailable.bind(null,goods));

addGoods.addEventListener('click', showModal);

formAddFlower.addEventListener('submit',addFlowerToLS);

document.querySelector('.close-popup').addEventListener('click', () => {
  popup.style.display = 'none';
  addGoods.style.display = 'block';
})

function showModal(e) {
  e.preventDefault();
  popup.style.display = 'block';
  addGoods.style.display = 'none';
}

function addFlowerToLS(e) {
  e.preventDefault();
  popup.style.display = 'none';

  let newFlower = {
    code: count += 1,
    title: `${this.elements.name.value}`,
    price: `${this.elements.price.value}`,
    descr: `${this.elements.description.value}`,
    defaultColor: `${this.elements.defcolor.value}`,
    src: [
      {green: `img/${this.elements.file.files[0].name}`, available: true},
      {red: `img/${this.elements.file.files[0].name}`, available: true},
      {biege: `img/${this.elements.file.files[0].name}`, available: true}
    ]
  };

  let localS = JSON.parse(localStorage.getItem('goods'));
  localS.push(newFlower);
  localStorage.setItem('goods', JSON.stringify(localS));
  console.log(localS)
  goodsLS = JSON.parse(localStorage.getItem("goods"));
  console.log(localS)
  showGoodsOnPage(itemsOnPage[0]);
}

function changeImageByColor(e) {
  
  let target = e.target;
  let selectedColor = target.classList[1];
  console.log(selectedColor);

  let activeColor = target.parentNode.querySelector('.active');
  activeColor.classList.remove('active');
  target.classList.add('active');

  let item = target.closest('.item')
  let itemCode = item.dataset.code;
  // console.log(itemCode);

  let colorIndex = selectedColor == 'green' ? 0 :
      selectedColor == 'red' ? 1 : 2;

  let img = item.querySelector('img');
  console.log(goods[itemCode-1].src[colorIndex][selectedColor]);

  img.src = goods[itemCode-1].src[colorIndex][selectedColor];

  let itemAvailable = item.querySelector('.item-available');
  itemAvailable.textContent = goods[itemCode-1].src[colorIndex].available?'В наличии': 'Нет в наличии';
}

makeDefColorActive();

function makeDefColorActive() {
  _colors.forEach(el => {
    let color = el.parentNode.dataset.color;

    if (el.classList.contains(color)) {
      el.classList.add('active');
    }
  });
}

function filterByAvailable(arr, e) {
  e.preventDefault();
  arr = document.querySelectorAll('.item-available');

  for (let el of arr) {
    if (el.dataset.available !== 'true') {
      let item = el.closest('.item');
      item.remove();
    }
  }
  console.log(arr);
}

// пагинация
function renderPaginationElems() {
  let countOfItems = Math.ceil(goods.length / defaultGoodsOnPage);
  for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    li.classList.add('page');
    _pagination.appendChild(li);
    itemsOnPage.push(li);
  }
}

// отрисовка товаров на странице
function showGoodsOnPage(item) {

  if (activePage) {
    activePage.classList.remove('active-page');
  }

  activePage = item;
  item.classList.add('active-page');

  let pageNum = +item.innerHTML;
  let start = (pageNum - 1) * defaultGoodsOnPage;
  let end = start + defaultGoodsOnPage;
  let goodsOnPage = goodsLS.slice(start, end);

  _goods.innerHTML = createGood(goodsOnPage);
  itemBtnHandler('.item-btn', addToCart);
  
}

function createGood(arr) {
  let output = '';

  for (let key of arr) {
    output += `
        <div class="item" data-code="${key.code}" data-price="${key.price}">
        <img class="item-img" src="${takeDefColor(key)}" alt="Изображение товара">
        <p class="item-info">
          <p class="item-info_name">${key.title}</p>
          <p class="item-info_descr">${key.descr}</p>
        </p>
        <p class="item-price">$${key.price}</p>
        <ul class="item-colors" data-color="${key.defaultColor}">
          <li class="color biege"></li>
          <li class="color red"></li>
          <li class="color green"></li>
        </ul>
        <p class="item-available" data-available="${takeDefAvailable(key)}">${takeDefAvailable(key)? 'В наличии': 'Нет в наличии'}</p>
        <button class="item-btn" data-code="${key.code}"> Добавить в  корзину </button>
      </div>
      `;
  }

  return output;
}

// Сортировка товаров 
function sortGoodsAsc(sortType, parent, e) {
  e.preventDefault();
  for (let i = 0; i < parent.children.length - 1; i++) {
    for (let j = i; j < parent.children.length; j++) {
      if (+parent.children[i].getAttribute(sortType) > +parent.children[j].getAttribute(sortType)) {
        let replacedNode = parent.replaceChild(parent.children[j], parent.children[i]);
        insertAfter(replacedNode, parent.children[i]);
      }
    }
  }
}

function sortGoodsDesc(sortType, parent, e) {
  e.preventDefault();
  for (let i = 0; i < parent.children.length - 1; i++) {
    for (let j = i; j < parent.children.length; j++) {
      if (+parent.children[i].getAttribute(sortType) < +parent.children[j].getAttribute(sortType)) {
        let replacedNode = parent.replaceChild(parent.children[j], parent.children[i]);
        insertAfter(replacedNode, parent.children[i]);
      }
    }
  }
}

function insertAfter(el, refEl) {
  return refEl.parentNode.insertBefore(el, refEl.nextSibling);
}