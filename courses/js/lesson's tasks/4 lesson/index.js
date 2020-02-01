// 1

function findSumOfArgsExFirst(...args) {
  let first, sum = 0;
  for (let i = 0; i < args.length; i++) {
    if (i == 0) {
      first = args[i];
    }
    else {
      sum += args[i];
    }  
  }
  console.log(sum*first);
  return sum*first;
}

findSumOfArgsExFirst(3,2,3,15);

// 2

const readers = [
  { name: "Anna", books: ["Bible", "Harry Potter"], age: 21 },
  { name: "Bob", books: ["War and peace", "Romeo and Juliet"], age: 26 },
  { name: "Alice", books: ["The Lord of the Rings", "The Shining"], age: 18 }
];

function returnBookList(arr) {
  let list = [];
  for (let el of arr) {
    list.push(el.books.join(', '));
  }
  list = list.join(', ');
  console.log(list)
  return list;
}

returnBookList(readers);


// 3

getCrossings([1,2,3], [1,3,4,5], [1,5,6,7], [7,8,9,1]);

function getCrossings(...arrays) {
  let crossedArray = arrays[0];
  for (let i = 1; i < arrays.length; i++) {
    crossedArray = crossedArray.filter(elem => arrays[i].includes(elem))
  }

  return crossedArray;
}

// canvas


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let el = 10;
let el2 = 20;

for (let i = 0; i < 6; i++) {
  ctx.moveTo(10, el);
  ctx.lineTo(80, el);
  ctx.stroke();
  el += 10;
}

for (let i = 0; i < 6; i++ ) {
  ctx.moveTo(el2, 0);
  ctx.lineTo(el2, 70);
  ctx.stroke();
  el2 += 10;
}