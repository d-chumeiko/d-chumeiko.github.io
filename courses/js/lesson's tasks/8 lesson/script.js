//////////   1

const btn = document.querySelector('button');
const inputName = document.querySelector('input[name="name"]');
const inputSurname = document.querySelector('input[name="surname"]');
const table = document.querySelector('table');

btn.addEventListener('click', addUser);

function addUser() {

  let tr = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdSurname = document.createElement('td');
  let tdDel = document.createElement('td');

  tdName.textContent = inputName.value;
  tdSurname.textContent = inputSurname.value;
  tdDel.innerHTML = `<button>Удалить</button>`;

  tdName.classList.add('name');
  tdSurname.classList.add('surname');

  tdDel.addEventListener('click', () => {
    tr.remove();
  });

  if ((inputName.value.length >= 3) && (inputSurname.value.length >= 3)) {
    tr.appendChild(tdName);
    tr.appendChild(tdSurname);
    tr.appendChild(tdDel);
  
    table.appendChild(tr);
  }
}

table.onclick = function(event) {
  let target = event.target;

  if (target.className == 'name') target.textContent = prompt('Input new name', 'Petro');

  if (target.className == 'surname') target.textContent = prompt('Input new surname', 'Ivanov');
};


/////// 2

let divs = document.querySelectorAll('.just-div');

for (let i = 0; i < divs.length; i++) {
	divs[i].addEventListener('click', changeToRed);
}

function changeToRed() {
	this.style.backgroundColor = 'red';
  this.style.transition = '.2s';
  
	this.removeEventListener('click', changeToRed);
	this.addEventListener('click', changeToGreen);
}

function changeToGreen() {
	this.style.backgroundColor = 'green';
  this.style.transition = '.2s';
  
	this.removeEventListener('click', changeToGreen);
	this.addEventListener('click', changeToRed);
}
