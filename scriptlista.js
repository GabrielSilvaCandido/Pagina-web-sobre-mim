const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList1 = document.getElementById('task-list-1');
const taskList2 = document.getElementById('task-list-2');
const taskList3 = document.getElementById('task-list-3');

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    taskList1.appendChild(taskItem);
    taskInput.value = '';

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        taskItem.classList.remove('completed');
        moveTask(taskItem, taskList1, taskList2, );
      } else {
        taskItem.classList.add('completed');
        moveTask(taskItem, taskList2, taskList3);
      }
    });
  }
});

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const taskLabel = document.createElement('span');
  taskLabel.textContent = taskText;
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskLabel);

  checkbox.addEventListener('change', function() {
    if (checkbox.checked && taskItem.parentElement !== taskList1) {
      taskLabel.style.textDecoration = 'line-through';
    } else {
      taskLabel.style.textDecoration = 'none';
    }
  });

  return taskItem;
}

function moveTask(taskItem, sourceList, targetList) {
  sourceList.removeChild(taskItem);
  targetList.appendChild(taskItem);
}
