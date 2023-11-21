import Task from "./tasks";

export default class Projects {
    myTasks = [];
    title = "";
    description = "";
    date = "";
    
    getTasks(){
        this.title = prompt("Enter the task title");
        this.description = prompt("Enter the task description");
        this.date = parseInt(prompt("Enter the task's date"));
    }

    createTask(){
        return new Task(this.title, this.description, this.date);
    }
    
    addTasks(){
        this.myTasks.push(this.createTask());
    }
}