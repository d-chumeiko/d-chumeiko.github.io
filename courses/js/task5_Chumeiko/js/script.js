let items = [
  {
    'img': 'img/1.jpg',
    'title': 'Внешние работы',
    'descr': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsum.',
    'price': 500
  },

  {
    'img': 'img/1.jpg',
    'title': 'Внешние работы',
    'descr': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsum.',
    'price': 500
  },
  
  {
    'img': 'img/1.jpg',
    'title': 'Внешние работы',
    'descr': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsum.',
    'price': 500
  },

  {
    'img': 'img/1.jpg',
    'title': 'Внешние работы',
    'descr': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsum.',
    'price': 500
  }  
];

let itemsOnPage = [];
let activePage;

const defaultGoodsOnPage = 8;

const listBtn = document.getElementById('list');
const gridBtn = document.getElementById('grid');

const main = document.querySelector('main');
const itemsWrapper = document.getElementById('items-wrapper');
const pagination = document.getElementById('pagination');

renderPaginationElems();
renderItemsOnPage(itemsOnPage[0]);

gridBtn.addEventListener('click', showGridOfItems);
listBtn.addEventListener('click', showListOfItems);

function showListOfItems() {
  main.style.opacity = 1;
  main.style.display = 'block';
  itemsWrapper.classList.remove('main_items--grid'); 
  itemsWrapper.classList.add('main_items--list');
}

function showGridOfItems() {
  main.style.opacity = 1;
  main.style.display = 'block';
  itemsWrapper.classList.remove('main_items--list'); 
  itemsWrapper.classList.add('main_items--grid');
}

function renderPaginationElems() {
  let countOfItems = Math.ceil(items.length / defaultGoodsOnPage);
  for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    li.classList.add('page');
    pagination.appendChild(li);
    itemsOnPage.push(li);
  }
}

itemsOnPage.forEach(el => el.addEventListener('click', function () {
  renderItemsOnPage(this);
}));

function renderItemsOnPage(item) {

  if (activePage) {
    activePage.classList.remove('active');
  }

  activePage = item;
  item.classList.add('active');

  let out = '';
  let pageNum = +item.innerHTML;
  let start = (pageNum - 1) * defaultGoodsOnPage;
  let end = start + defaultGoodsOnPage;
  let goodsOnPage = items.slice(start, end);

  console.time();

  for (let key in goodsOnPage) {
    let el = goodsOnPage[key];
    out += `
          <div class="item">
            <p class="item_photo">
              <img src="${el.img}" alt="item_photo">
            </p>
            <h2 class="item_title">${el.title}</h2>
            <p class="item_descr">${el.descr}</p>
            <p class="item_price"><b>Цена:</b> от ${el.price} грн/час</p>
          </div>
      `;
  }

  console.timeEnd();

  itemsWrapper.innerHTML = out;

}



