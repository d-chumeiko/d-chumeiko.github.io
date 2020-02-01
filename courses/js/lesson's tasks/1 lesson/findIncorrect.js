let a, b, c;

a = +prompt('A', 4);
b = +prompt('B', 10);
c = +prompt('C', 100);

let correctedA = a>2 && a<11;
let correctedB = b>=6 && b<14;
let correctedC = c>90 || c<14;

let incorrect = [];

if ( correctedA && correctedB && correctedC) {
  alert("Correct");
}

if (!correctedA) {
  incorrect.push("Некорректное А");
} 

if (!correctedB) {
  incorrect.push("Некорректное B");
}

if (!correctedC) {
 incorrect.push("Некорректное C");
}

findIncorrect(incorrect);


function findIncorrect(arr) {
  for (let elem of arr) {
    console.log(elem);
  }
}