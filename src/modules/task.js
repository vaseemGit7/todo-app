export default class Task {
    constructor(id,title, description, priority, date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date; 
        this.completed = false; 
    }

    editTask(title, description, priority, date){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;
    }

    setPriority(priorityValue){
        this.priority = priorityValue;
    }

    setCompleted(){
        this.completed = !this.completed; 
    } 

    getDate(){
        return this.date;
    }
}