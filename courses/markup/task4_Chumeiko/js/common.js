let images = ['Dubai.jpg', 'London.jpg', 'Kyiv.jpg', 'Paris.jpg', 'Amsterdam.jpg'];
let views = ['84.411', '79.008', '68.174', '88.091', '75.987']
let slider = document.querySelector('.item');
let img = slider.querySelector('img');

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let prevPage = document.querySelector('.prev-page');
let nextPage = document.querySelector('.next-page');

let pageNum = document.querySelector('.page');

let viewsCount = document.querySelector('.views-count');

let currentPage = 1;
pageNum.textContent = 2;

prev.addEventListener('click', showPrev);
next.addEventListener('click', showNext);

function showPrev() {
  if (currentPage > 0) {
    currentPage -= 1;
    img.src = 'img/' + images[currentPage];
    viewsCount.textContent = views[currentPage];

    pageNum.textContent -= 1;

    prevPage.textContent -= 1;
    nextPage.textContent -= 1;

    if (prevPage.textContent == '0') {
      prev.classList.add("hidden");
    }

    if (nextPage.textContent != images.length+1) {
      next.classList.remove("hidden");
    }
  }
}

function showNext() {
  if (currentPage < images.length-1) {
    currentPage += 1;
    img.src = 'img/' + images[currentPage];
    viewsCount.textContent = views[currentPage];

    pageNum.textContent = +pageNum.textContent + 1;

    prevPage.textContent = +prevPage.textContent + 1;
    nextPage.textContent = +nextPage.textContent + 1;

    if (prevPage.textContent != '0') {
      prev.classList.remove("hidden");
    }

    if (nextPage.textContent == images.length+1) {
      next.classList.add("hidden");
    }
  }
}
