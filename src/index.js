const myTasks = [];

class Task {
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;  
    }
}

function getTasks(){
    const title = prompt("Enter the task title");
    const description = prompt("Enter the task description");
    const date = parseInt(prompt("Enter the task's date"));
    return new Task(title,description,date);
}

function addTasks(){
    return myTasks.push(getTasks());
}

addTasks();
addTasks();

console.log(myTasks);