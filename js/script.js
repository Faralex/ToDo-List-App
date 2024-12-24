import TodoService from "./todoService.js";

const DOM = {
  input: document.getElementById("input-value"),
  addBtn: document.querySelector(".form-elements__btn"),
  taskList: document.querySelector(".task-list"),
  taskCounter: document.querySelector(".task-counter"),
  clearButton: document.querySelector(".form-elements__clearBtn"),
};

const todoService = new TodoService();

DOM.addBtn.addEventListener("click", handleAddButtonClick);
DOM.clearButton.addEventListener("click", handleClearButtonClick);
DOM.taskList.addEventListener("click", handleTaskAction);

function createTask(task, index) {
  const taskItemHTML = `
    <li class="task-list__item">
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" data-index="${index}" ${
    task.completed ? "checked" : ""
  }>
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
  DOM.taskList.innerHTML = "";

  const tasks = todoService.getTasks();
  DOM.taskList.innerHTML = tasks.map((task, index) => createTask(task, index)).join("");

  updateTaskCount();
  updateAddButtonText();
}

function updateTaskCount() {
  DOM.taskCounter.textContent = `Добавлено задач: ${todoService.getTaskCount()}`;
}

function updateAddButtonText() {
  DOM.addBtn.textContent = todoService.isEditing ? "Сохранить" : "Добавить задачу";
}

function handleAddButtonClick(e) {
  e.preventDefault();
  const text = DOM.input.value.trim();

  if (todoService.isEditing) {
    todoService.editTask(todoService.currentEditIndex, text);
    todoService.resetEditing();
  } else {
    todoService.addTask(text);
  }

  DOM.input.value = "";
  renderTasks();
  DOM.input.focus();
}

function handleClearButtonClick(e) {
  e.preventDefault();
  todoService.clearTasks();
  renderTasks();
}

function handleTaskAction(e) {
  const index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("editTask")) {
    DOM.input.value = todoService.startEditing(index);
    updateAddButtonText();
    DOM.input.focus();
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
