// 1. сортировать только нечетные числа, не перемещая четные числа
// выводить через каждые 2 сек

var array = [9, 5, 3, 7, 2, 8, 1, 4, 6];

function sortOddNumbers(arr) {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let k = -1;
    for (let j = 0; j < len - i; j++) {
      if (arr[j] % 2 != 0) {
          if (k >= 0 && arr[k] > arr[j]) {
              let tmp = arr[k];
              arr[k] = arr[j];
              arr[j] = tmp;
          }
          k = j;
      }
    }
  }

  return arr;
}

setTimeout(function printNumbers() {
  alert(sortOddNumbers(array).splice(0, 1));
  
  if (sortOddNumbers(array).length > 0) {
    setTimeout(printNumbers, 2000);
  }
}, 2000);

// 2. суммировать население больше 25000 разных городов одной страны;

let arr = [
  { country: "Индия", city: "Бангалор", population: 25210 },
  { country: "Индия", city: "Калькутта", population: 24310 },
  { country: "Индия", city: "Мумбаи", population: 23265 },
  { country: "Япония", city: "Киото", population: 32275 },
  { country: "Япония", city: "Токио-Иокогама", population: 38050 },
  { country: "Индия", city: "Дели", population: 27280 },
  { country: "Япония", city: "Осака", population: 24115 },
  { country: "Филиппины", city: "Манила", population: 24650 },
  { country: "Япония", city: "Нагоя", population: 24115 },
];

let result = arr.filter(city => {
  if(city.population > 25000) return city;
}).reduce((accum, current) => {
  let country = current.country,
      found = accum.find(elem => elem.country === country);
  
  found ? found.population += current.population : accum.push(current);
  return accum;
  }, []);

result.forEach(el => {
  delete el.city;
  return el;
});

console.log(result);
