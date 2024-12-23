import TodoService from "./todoService.js";

const input = document.getElementById("input-value");
const addBtn = document.querySelector(".form-elements__btn");
const taskList = document.querySelector(".task-list");
const taskCounter = document.querySelector(".task-counter");
const clearButton = document.querySelector(".form-elements__clearBtn");

const todoService = new TodoService();

addBtn.addEventListener("click", handleAddButtonClick);
clearButton.addEventListener("click", handleClearButtonClick);
taskList.addEventListener("click", handleTaskAction);

function createTask(task, index) {
  const taskItemHTML = `
    <li class="task-list__item">
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="./img/icons8-pen-stickers-32.png" alt="" class="editTask" data-index="${index}">
        <img src="./img/icons8-bin-color-32.png" class="deleteTask" alt="" data-index="${index}">
      </div>
    </li>
  `;
  return taskItemHTML;
}

function renderTasks() {
  taskList.innerHTML = "";

  const tasks = todoService.getTasks();
  taskList.innerHTML = tasks.map((task, index) => createTask(task, index)).join("");

  updateTaskCount();
  updateAddButtonText();
}

function updateTaskCount() {
  taskCounter.textContent = `Добавлено задач: ${todoService.getTaskCount()}`;
}

function updateAddButtonText() {
  addBtn.textContent = todoService.isEditing ? "Сохранить" : "Добавить задачу";
}

function handleAddButtonClick(e) {
  e.preventDefault();
  const text = input.value.trim();

  todoService.addTask(text, todoService.isEditing, todoService.currentEditIndex);

  if (todoService.isEditing) {
    todoService.resetEditing();
  }

  input.value = "";
  renderTasks();
  input.focus();
}

function handleClearButtonClick(e) {
  e.preventDefault();
  todoService.clearTasks();
  renderTasks();
}

function handleTaskAction(e) {
  const index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("editTask")) {
    input.value = todoService.startEditing(index);
    updateAddButtonText();
    input.focus();
  } else if (e.target.classList.contains("deleteTask")) {
    todoService.deleteTask(index);
    todoService.resetEditing();
    renderTasks();
  } else if (e.target.classList.contains("checkbox")) {
    todoService.toggleTaskComplete(index);
    renderTasks();
  }
}

renderTasks();
