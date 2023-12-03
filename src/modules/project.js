export default class Project {
    constructor(name){
        this.name = name;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(task){
        this.tasks = this.tasks.filter(t => t.id != task);
    }
}