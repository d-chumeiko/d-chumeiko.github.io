///// 1

let itemName = document.querySelector('#item');
let btn = document.querySelector('button');
let ulItem = document.querySelector('ul');
let child = ulItem.children;

btn.addEventListener('click', addItem);

function addItem() {
  if (itemName.value !== '') {
    let liItem = document.createElement('li');
    let closeItem = document.createElement('span');

    liItem.textContent = itemName.value;
    closeItem.textContent = 'X';

    closeItem.style.marginLeft = 15 + 'px';

    ulItem.appendChild(liItem);
    liItem.appendChild(closeItem);

    closeItem.addEventListener('click', del)
  }
}

function del() {
  ulItem.removeChild(this.parentNode);
}

///// 2

let inputNums = document.querySelectorAll('.num');
let result = document.getElementById('result');
let sumBtn = document.querySelector('.btn');

sumBtn.addEventListener('click', sumNums);

function sumNums() {
  let sum = 0;
  
  for (let el of inputNums) {
    if (!isNaN(+el.value)) sum += +el.value;
  }

  result.textContent = sum;
}


