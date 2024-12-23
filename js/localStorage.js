export class LocalStorageService {
  constructor(storageKey = "tasks") {
    this.storageKey = storageKey;
  }

  loadTasks() {
    try {
      const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
      return tasks;
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  }

  saveTasks(tasks) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error", error);
    }
  }

  clearData() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("Error", error);
    }
  }
}
