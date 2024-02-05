export default class Task {
  constructor(id, title, description, priority, date, originId, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.originId = originId;
    this.completed = completed;
  }

  editTask(title, description, priority, date) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
  }

  setPriority(priorityValue) {
    this.priority = priorityValue;
  }

  setCompleted() {
    this.completed = !this.completed;
  }

  getDate() {
    return this.date;
  }
}
