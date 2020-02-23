let usersData = document.querySelector('.users-data');
const url = 'https://jsonplaceholder.typicode.com/users';

async function fetchAsyncUsers() {
  console.log('Fetch started');
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

let users = fetchAsyncUsers();

users
  .then(data => {
      let out = '';

      for (let i of data) {
        out += `
              <div class="user-data">
                <span class="user-data_id">${i.id}</span>
                <span class="user-data_name">${i.name}</span>
                <span class="user-data_username">${i.username}</span>
              </div>
              `;
      }

      usersData.innerHTML = out;
      userDataNames = document.querySelectorAll('.user-data_name');
  })
  .then(() => {
    console.log(userDataNames);
  });





