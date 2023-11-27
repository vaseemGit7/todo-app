import tasks from "./modules/tasks";
import projects from "./modules/projects";

const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click',()=>{
    let title = prompt("Enter the task title");
    let description = prompt("Enter the task description");
    let date = parseInt(prompt("Enter the task's date"));
    const newTask = tasks.createTask(title,description,date);

    projects.newProject.projectTasks.push(newTask);
    console.log("It clicked but didn't worked");
    console.log(projects.newProject.projectTasks);
})
console.log(projects.newProject.projectTasks);