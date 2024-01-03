export default class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t.id != task);
  }

  setTask(tasks) {
    this.tasks = tasks;
  }
}
