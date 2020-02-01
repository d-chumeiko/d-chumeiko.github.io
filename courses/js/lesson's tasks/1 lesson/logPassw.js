let login = prompt("Введите логин", 'login');

if (login === "Admin") {
  
  let password = prompt("Введите пароль", '****');

  if (password === '1234') {
    alert("Вход разрешен");
  }

  else {
    alert("Неверный пароль");
  }

} 

else if (login !== 'Admin' || login === '' || login === null || login === undefined) {
  alert("Пользователь не найден");
}