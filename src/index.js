import './style.css';
import uiControlller from './modules/uiController';
import todoManager from "./modules/todoManager";

const addBtn = document.getElementById('addBtn');
const newProject = todoManager.createProject();

addBtn.addEventListener('click',()=>{
    let title = prompt("Enter the task title");
    let description = prompt("Enter the task description");
    let date = parseInt(prompt("Enter the task's date"));

    const newTask = todoManager.createTask(title,description,date);

    todoManager.addTaskToProject(newProject,newTask);
    
    uiControlller.render();
    console.log("It clicked");
    console.log(newProject.tasks);
})