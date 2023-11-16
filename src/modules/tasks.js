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

export default getTasks;