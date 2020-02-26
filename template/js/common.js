// document.getElementById('wow').innerHTML = `abc ${3*12} <hr>`;

function classToggle() {
  const navs = document.querySelectorAll('.navbar_menu, .navbar_search')
  
  navs.forEach(nav => nav.classList.toggle('navbar_link--toggle-show'));
}
document.querySelector('.navbar_link--toggle')
  .addEventListener('click', classToggle);