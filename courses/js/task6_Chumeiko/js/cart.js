// корзина
checkCart();
renderCart();


console.log(goodsLS)
console.log(cart)


function renderCart() {

  if (Object.keys(cart).length === 0) {
    _mainCartContent.innerHTML = `Корзина пуста`;
  } else {

    let out = '',
      count = 0,
      sum = 0;

    for (let good in cart) {

      for (let key of goodsLS) {
        if (key.code == good) {
          out += `
                <button class="delete" data-code="${good}"> x </button>
                <img src="${takeDefColor(key)}" width="48" alt=""> 
                <span>${key.title}</span> 
                <button class="minus-btn" data-code="${good}"> - </button> 
                ${cart[good]}
                <button class="plus-btn" data-code="${good}"> + </button> 
                $${cart[good]*key.price}
                <br>
            `
          count += cart[good];
          sum += cart[good]*key.price;
        }
      }
    }

    out += `<p>Всего в корзине ${count} единиц товара.<br>
    Общая сумма: $${sum}. </p>`
    _mainCartContent.innerHTML = out;

    itemBtnHandler('.plus-btn', plusGood);
    itemBtnHandler('.minus-btn', minusGood);
    itemBtnHandler('.delete', deleteGood);
  }
  checkCartCount();
}

function plusGood() {
  let code = this.dataset.code;
  cart[code]++;
  saveCartToLs();
  renderCart();
}

function minusGood() {
  let code = this.dataset.code;
  if (cart[code] > 1) {
    cart[code]--;
  } else {
    delete cart[code];
  }
  saveCartToLs();
  renderCart();
}

function deleteGood() {
  let code = this.dataset.code;
  delete cart[code];
  saveCartToLs();
  renderCart();
}
