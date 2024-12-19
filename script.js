const input = document.getElementById("input-value");
const addBtn = document.querySelector(".form-elements__btn");
const taskList = document.querySelector(".task-list");
const taskCounter = document.querySelector(".task-counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;
let currentEditIndex = null;

addBtn.addEventListener("click", handleAddButtonClick);

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-list__item");

    taskItem.innerHTML = `
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="./img/icons8-pen-stickers-32.png" alt="" class="editTask" onClick="editTask(${index})">
        <img src="./img/icons8-bin-color-32.png" class="deleteTask" alt="" onClick="deleteTask(${index})">
      </div>
    `;

    const checkbox = taskItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(taskItem);
  });

  saveToLocalStorage();
  updateTaskCount();
  updateAddButtonText();
}

function updateAddButtonText() {
  if (tasks.length === 0) {
    isEditing = false;
  }

  addBtn.textContent = isEditing ? "Сохранить" : "Добавить задачу";
}

function updateTaskCount() {
  taskCounter.textContent = `Добавлено задач: ${tasks.length}`;
}

function handleAddButtonClick(e) {
  e.preventDefault();
  addTask();
  input.focus();
}

function addTask() {
  const text = input.value.trim();

  if (!text && isEditing === false) {
    alert("Введите задачу");
    return;
  }
  if (isEditing) {
    tasks[currentEditIndex] = { text: text, completed: tasks[currentEditIndex].completed };
    isEditing = false;
    currentEditIndex = null;
  } else {
    tasks.push({ text: text, completed: false });
  }

  input.value = "";
  renderTasks();
}

function editTask(index) {
  isEditing = true;
  currentEditIndex = index;
  input.value = tasks[index].text;
  input.focus();
  updateAddButtonText();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function saveToLocalStorage() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  updateAddButtonText();
}

loadTasksFromLocalStorage();
renderTasks();
