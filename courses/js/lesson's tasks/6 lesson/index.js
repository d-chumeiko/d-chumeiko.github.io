// 1. Взять массив объектов из лекции 3, сделать из него массив городов(массив строк)
// Напишите функцию, которая возвращает true в том случае, если длина любого
// элемента массива соответствует значению len. Если таких элементов в массиве нет —
// функция должна возвратить false.
// Например, console.log(findLength(arr, 6));

let countries = [
  { country: "Республика Корея", city: "Сеул-Инчхон", population: 24210 },
  { country: "Индия", city: "Мумбаи", population: 23265 },
  { country: "Индонезия", city: "Джакарта", population: 32275 },
  { country: "Япония", city: "Токио-Иокогама", population: 38050 },
  { country: "Индия", city: "Дели", population: 27280 },
  { country: "КНР", city: "Шанхай", population: 24115 },
  { country: "Филиппины", city: "Манила", population: 24650 }
];

let cities = countries.map(el => el.city);

function findLength(countries, len) {
  let flag = false;
  countries.forEach(el => {
    if (el.length === len) flag = true;
  });
  return flag;
}

console.log(findLength(cities, 6));

// 2. Используя цепочку промисов и коллекции возвести массив в степень, убрать не
// уникальные значения и отзеркалить элементы массива

let arr = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5];


function myPromise() {
  return new Promise(function (resolve, reject) {
    let set = new Set();

    arr.forEach(el => {
      if (isNaN(el)) return reject(new Error('Нечисловой элемент в массиве'));
      el *= el;
      set.add(el);
    });

    return resolve(set);
  });
}

myPromise().then(function (set) {
  let arr = Array.from(set).concat(Array.from(set).reverse());
  console.log(arr);
}).catch(function (err) {
  console.log(err.message);
});
    