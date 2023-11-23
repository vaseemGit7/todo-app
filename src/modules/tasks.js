const tasks = (()=>{
    class Task {
        constructor(title, description, date){
            this.title = title;
            this.description = description;
            this.date = date;  
        }
    }

    function createTask(title,description,date){
        const newTask = new Task(title,description,date);
        return newTask;
    }

    return {
        createTask,
    }
})();

export default tasks;