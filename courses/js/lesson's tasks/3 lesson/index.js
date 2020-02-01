let person1 = {
  name: "Alex",
  age: 28,
  career: "teacher",
  hobbies: "guitar"
};

let person2 = {
  name: "Kirill",
  age: 30,
  city: "Kharkov",
  sex: "male",
  hobbies: "table games"
};

let person3 = {
  name: "Ivan",
  city: "Kharkov",
  sex: "male",
  hobbies: "reading"
};


// 1
function changeSameProps(o, p) {
  for (let prop in o) {
    if (p.hasOwnProperty(prop)) {
      p[prop] = o[prop];
    }
    else {
      p[prop] = o[prop];
    }
    }
    console.log(p);  
}

changeSameProps(person1, person2);

// 2
function keepSamePropsAndValues(o, p) {
 for(let prop in o) {
   if (p.hasOwnProperty(prop)) continue;
   else delete o[prop];
 }
 console.log(o);
}

keepSamePropsAndValues(person1, person2);

// 3

function keepSameProps(o, p) {
  for(let prop in o) {
    if (!(prop in p)) delete o[prop];
    else o[prop] = p[prop];
  }
  console.log(o);
}

keepSameProps(person1, person2);

// 4.1

// function findAverageAge1(o, p, q) {
//   let sum = 0;  
//   if ('age' in o) {
//     sum += o['age'];
//   }

//   if ('age' in p) {
//     sum += p['age'];
//   }
//   else {
//     sum += o['age'];
//   }

//   if ('age' in q) {
//     sum += q['age'];
//   }
//   else {
//     sum += o['age'];
//   }
  
//   let average = Math.ceil(sum/3);
//   // console.log(average);
// }

// findAverageAge1(person1, person2, person3);

// 4.2

function findAverageAge(...args) {
  let average = 0;
  for (let arg of args) {
    if (arg['age']) {
      average += arg['age'];
    }

    else {
      arg['age'] = args[0]['age'];
      average += arg['age'];
    }
  }
  average = Math.ceil(average/3);
  console.log(average);
}

findAverageAge(person1, person2, person3);

// 5

let arr = [
  { country: "Республика Корея", city: "Сеул-Инчхон", population: 24210 },
  { country: "Индия", city: "Мумбаи", population: 23265 },
  { country: "Индонезия", city: "Джакарта", population: 32275 },
  { country: "Япония", city: "Токио-Иокогама", population: 38050 },
  { country: "Индия", city: "Дели", population: 27280 },
  { country: "КНР", city: "Шанхай", population: 24115 },
  { country: "Филиппины", city: "Манила", population: 24650 }
];


function sortByPopulation(p) {
  return (a, b) => a[p] > b[p] ? 1 : -1;
}

arr.sort(sortByPopulation("population"));
console.log(arr);

