export default class Project {
  constructor(id, name, category) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.tasks = [];
  }

  editProject(name, category) {
    this.name = name;
    this.category = category;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t.id !== Number(task));
  }

  setTask(tasks) {
    this.tasks = tasks;
  }
}
