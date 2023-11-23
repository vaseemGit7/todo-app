import tasks from "./modules/tasks";
import Projects from "./modules/projects";

const addBtn = document.getElementById('addBtn');
const newProject = new Projects(); 

addBtn.addEventListener('click',()=>{
    let title = prompt("Enter the task title");
    let description = prompt("Enter the task description");
    let date = parseInt(prompt("Enter the task's date"));
    const newTask = tasks.createTask(title,description,date);

    newProject.projectTasks.push(newTask);
    console.log("It clicked but didn't worked");
    console.log(newProject.projectTasks);
})
console.log(newProject.projectTasks);