$(document).ready(function(){
  $.getJSON('../data/data.json', function(data) {
    dataFromJSON = data;
    showCardItems(data);
    showListItems(data);
    enableSlick();
  });
});

var settings = {
  "url": "https://api.covid19api.com/summary",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

let dataFromJSON;

const filtrationButtonsCard = document.querySelector('.filtration-buttons__list--card');
const filtrationButtonsList = document.querySelector('.filtration-buttons__list--list');
const comingSoonViewButtons = document.querySelectorAll('.control-panel__view-buttons')[0];
const mostPopularViewButtons = document.querySelectorAll('.control-panel__view-buttons')[1];

filtrationButtonsCard.addEventListener('click', filterItems);
filtrationButtonsList.addEventListener('click', filterItems);

comingSoonViewButtons.addEventListener('click', changeView);
mostPopularViewButtons.addEventListener('click', changeView);


function changeView() {
  let trg = event.target.closest('p');
  let activeClass = 'view-button--active';
  if (trg) {
    let buttons = Array.from(trg.closest('.control-panel__view-buttons').children);
    buttons.forEach(el => {
      if (el.classList.contains(activeClass)) el.classList.remove(activeClass);
    });
    trg.classList.add(activeClass);
    trg.classList.contains('view-buttons__card') ? console.log('yes') : console.log('no')
  }
}

function filterItems() {
  let trg = event.target;
  let activeClass = 'filtration-buttons__list--active';
  let parentCatalogItemsContainer = trg.closest('.films-catalog').querySelector('.catalog-items-container');
  let items = Array.from(parentCatalogItemsContainer.querySelectorAll('.catalog__item'));

  if (trg.tagName === 'LI') {
    let buttons = Array.from(trg.closest('.filtration-buttons__list').children);

    buttons.forEach(el => {
      if (el.classList.contains(activeClass)) el.classList.remove(activeClass);
    });
    trg.classList.add(activeClass);

    if (trg.dataset.type === 'All') {
      items.forEach(item => item.style.display = 'flex');
    }

    if (trg.dataset.type === 'Movie') {
      items.forEach(item => {
        item.style.display = 'flex'
        if (item.dataset.type !== 'Movie') {
          item.style.display = 'none';
        }
      });
    }

    if (trg.dataset.type === 'TV-Show') {
      items.forEach(item => {
        item.style.display = 'flex'
        if (item.dataset.type !== 'TV-Show') {
          item.style.display = 'none';
        }
      });
    }

  }
}

function showCardItems(d) {
  let catalogCards = document.querySelector('.catalog-cards');
  let out = '';
  for (let i = 0, len = d.length; i < len; i++) {
    let item = d[i];
    out += createCardItem(item);
  }
  catalogCards.innerHTML = out;

  let catalogItems = Array.from(catalogCards.closest('.films-catalog').querySelectorAll('.catalog__item'));

  catalogItems.forEach(item => {
    if (item.dataset.type !== 'Movie') {
      item.style.display = 'none';
    }
  });

  
  
}

function showListItems(d) {
  let catalogList = document.querySelector('.catalog-list');
  let out = ''
  for (let i = 0, len = d.length; i < len; i++) {
    let item = d[i];
    out += createListItem(item);
  }
  catalogList.innerHTML = out;
  takeProgressRate();
}

function createListItem(i) {
  return `
  <div class="catalog-list__item catalog__item" data-type="${i.type}">

    <p class="catalog-list__logo">
      <img src="${i.poster}" alt="film logo">
      <span class="catalog-list_play-btn">
        <img src="./img/icons/products/play-button.svg" alt="">
      </span>
    </p>

    <p class="catalog-list__rate">
      <svg class="progress-ring" width="80" height="80">
        <circle stroke="#d3f4e3" stroke-width="10" cx="40" cy="40" r="34" fill="transparent"
        />
        <circle class="progress-ring__circle" stroke="#22ca71" stroke-width="10" cx="40" cy="40" r="34" fill="transparent" data-rate="${i.rank ? i.rank : i.expectations_count}"
        />
      </svg>
      <span class="catalog-list__rate--count">${i.rank ? i.rank : i.expectations_count}</span>
    </p>

    <div class="catalog-list__right">
      <h2 class="catalog-llist__name">${i.title}</h2>
      <p class="catalog-list__short-info">${i.year} | Director: ${i.director} | Writer: ${i.writer}
      </p>
      <p class="catalog-list__about">${i.content}</p>

      <div class="catalog-list__data">

        <a href="#" class="cl-actions__share cl-action">
          <img src="./img/icons/products/actions/share.svg" alt="share">
        </a>
        <a href="#" class="cl-actions__comment cl-action">
          <span>${i.comments_count} |</span>
          <img src="./img/icons/products/actions/comment.svg" alt="comment">
        </a>
        <a href="#" class="cl-actions__rate cl-action">
          <span>${i.rank ? i.rank : i.expectations_count} |</span>
          <img src="./img/icons/products/actions/gradeless.svg" alt="rate">
        </a>
        <a href="#" class="cl-actions__like cl-action">
          <span>${i.likes_count} |</span>
          <img src="./img/icons/products/actions/heart.png" alt="like">
        </a>

      </div>

    </div>

    <a href="#" class="catalog-list__read-more">Read more</a>
  </div>
  `
}

function createCardItem(i) {
  return `
  <div class="catalog-cards__item catalog__item" data-type="${i.type}">
    <h2 class="catalog-cards__name">${i.title}</h2>
    <p class="catalog-cards__year">${i.year}</p>
    <p class="catalog-cards__logo">
      <img src="${i.poster}" alt="film logo">
      <span class="catalog-cards__type"><img src="${i.type === 'Movie' ? './img/icons/products/type-movie.svg' : './img/icons/products/type-tv-show.svg'}" alt=""></span>
      <span class="catalog-cards__rate"><img src="./img/icons/products/gradeless.svg" alt=""></span>
      <span class="catalog-cards_play-btn">
        <img src="./img/icons/products/play-button.svg" alt="">
      </span>
    </p>

    <div class="cc-data__actions">
      <a href="#" class="cc-actions__share cc-action">
        <img src="./img/icons/products/actions/share.svg" alt="share">
      </a>
      <a href="#" class="cc-actions__comment cc-action">
        <span class="cc-quantity_comments">${i.comments_count}</span>
        <img src="./img/icons/products/actions/comment.svg" alt="comment">
      </a>
      <a href="#" class="cc-actions__rate cc-action">
        <span class="cc-quantity_rate">${i.rank ? i.rank : i.expectations_count}</span>
        <img src="./img/icons/products/actions/gradeless.svg" alt="rate">
      </a>
      <a href="#" class="cc-actions__like cc-action">
        <span class="cc-quantity_like">${i.likes_count}</span>
        <img src="./img/icons/products/actions/heart.png" alt="like">
      </a>
  </div>
  </div>
</div>
  
  `
}

function takeProgressRate() {
  const circles = document.querySelectorAll('.progress-ring__circle');
  const radius = circles[0].r.baseVal.value;
  const circumLength = 2 * Math.PI * radius;
  circles.forEach( circle => {
    const rate = circle.dataset.rate;
    circle.style.strokeDasharray = `${circumLength} ${circumLength}`;
    const offset = circumLength - rate / 10 * circumLength;
    circle.style.strokeDashoffset = offset;
  });
}

function enableSlick() {
  $('.catalog-cards').slick({
    slidesToShow: 5,
    initialSlide: 0,
    slidesToScroll: 3,
    arrows: false,
    variableWidth: true,
    focusOnSelect: false,
    speed: 500,
    cssEase: 'ease-in-out',
    infinite: false,
  });

  $('.catalog-list').slick({
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    adaptiveHeight: true,
    prevArrow: '<img src="../img/icons/verticali-slider-arrows.svg" class="prev-arrow">',
    nextArrow: '<img src="../img/icons/verticali-slider-arrows.svg" class="next-arrow">'
  });

}