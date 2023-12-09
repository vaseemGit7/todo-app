export default class Task {
    constructor(id,title, description, date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date; 
        this.completed = false; 
    }

    setCompleted(){
        this.completed = !this.completed; 
    } 
}