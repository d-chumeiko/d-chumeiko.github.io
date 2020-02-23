const UlTaskList = document.getElementById('tasks_list');
const addBtn = document.getElementById('add-button');
const delAllBtn = document.getElementById('del-button')
const taskText = document.getElementById('task-text');

let count = 0;

addBtn.addEventListener('click', addTask);

function addTask() {

  let task = document.createElement('li');

  try {
    if ((taskText.value.length >= 3)) {
      task.textContent = taskText.value;
      UlTaskList.appendChild(task);
      localStorage[count] = taskText.value;
      count++;
    } else {
      throw new Error('Введите задачу длиннее 3 символов');
    }

  }

  catch(e) {
    alert(e.message);
  }

}

console.log(localStorage.getItem(0));

window.onload = function() {
  for (let i = 0; i < localStorage.length; i++) {
    let li = document.createElement('li');
    UlTaskList.appendChild(li);
    li.textContent = localStorage.getItem(i);
    count = i + 1;
  }
};

delAllBtn.addEventListener('click', () => {
  UlTaskList.textContent = '';
  localStorage.clear();
});
