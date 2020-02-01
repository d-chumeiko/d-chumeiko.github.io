let arr = [1, 2, 3, 4, 5];

accumSum(arr);

function accumSum(arr) {
  let newArr = [];

  arr.reduce( (sum, el) => {
    newArr.push(sum + el);
    return sum + el;
  }, 0);

  return newArr;
}