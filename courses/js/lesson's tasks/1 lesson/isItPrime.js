let num = +prompt('Input number', '15');

for (let div = 2;  div <= num; div++) {

  let count = 0;

  for (let i = 1; i <= div; i++) {
    if (div%i !== 0) continue;
    count += 1;
  }

  if (count === 2) console.log(div);

}
