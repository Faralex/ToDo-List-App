import { LocalStorageService } from "./localStorage.js";

class TodoService {
  constructor() {
    this.localStorageService = new LocalStorageService();
    this.tasks = this.localStorageService.loadTasks() || [];
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  addTask(text) {
    if (!text) {
      alert("Введите задачу");
      return;
    }

    this.tasks.push({ text: text, completed: false });
    this.saveTasks();
  }

  editTask(index, editedText) {
    this.tasks[index] = {
      ...this.tasks[index],
      text: editedText,
    };

    this.saveTasks();
  }

  startEditing(index) {
    this.isEditing = true;
    this.currentEditIndex = index;

    return this.tasks[index].text;
  }

  resetEditing() {
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleTaskComplete(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  saveTasks() {
    this.localStorageService.saveTasks(this.tasks);
  }

  clearTasks() {
    this.localStorageService.clearData();
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  getTaskCount() {
    return this.tasks.length;
  }
}

export default TodoService;
