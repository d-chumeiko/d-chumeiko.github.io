let arr = [1, 2, 3, 4, 5];
let newArr = [3, 4, 5, 6, 7, 999];

sumArrElems(arr, newArr);

function sumArrElems(arr1, arr2) {
 
  let len = getLargerLength(arr1, arr2).length;
  let result = [];

  for (let i = 0; i < len; i++) {
    arr1[i] === undefined ? result.push(0 + arr2[i]) :
    arr2[i] === undefined ? result.push(0 + arr1[i]) :
    result.push(arr1[i] + arr2[i]);
  }
  return result;
}

function getLargerLength(arr1, arr2) {
  return arr1.length > arr2.length ? arr1 : arr2;
}