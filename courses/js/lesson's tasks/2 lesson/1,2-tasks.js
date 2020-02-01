let arr  = ["aaa", "bbb", "ccc", "ddddd", "aaa", "aaa", "aaa", "aaaa"];

chooseUniqueValues(arr);
chooseLargerThanThree(arr);

// 1
function chooseUniqueValues(arr) {
  let uniqueValues = [];

  arr.forEach(el => { 
    if (!uniqueValues.includes(el)) uniqueValues.push(el); 
  });

  return uniqueValues;
}

// 2 
function chooseLargerThanThree(arr) {
  let result = [];

  arr.forEach(el => { 
    if (el.length > 3) result.push(el); 
  });

  return result;
}