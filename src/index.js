import './style.css';
import uiControlller from './modules/uiController';
import todoManager from "./modules/todoManager";

const addBtn = document.getElementById('addBtn');
const createProjectBtn = document.getElementById('createProjectBtn');

uiControlller.renderProjects();

addBtn.addEventListener('click',()=>{
    let title = prompt("Enter the task title");
    let description = prompt("Enter the task description");
    let date = parseInt(prompt("Enter the task's date"));

    const currentProject = todoManager.getCurrentProject();
    const newTask = todoManager.createTask(title,description,date);

    todoManager.addTaskToProject(currentProject,newTask);
    
    uiControlller.renderTasks();
    console.log("It clicked");
    console.log(currentProject.tasks);
})

createProjectBtn.addEventListener('click',()=>{
    let projectName = prompt("Enter project name");

    const newProject = todoManager.createProject(projectName);
    uiControlller.renderProjects();
})

// deleteBtns.forEach((deleteBtn)=>{
//     deleteBtn.addEventListener('click',()=>{
//         const taskCard = deleteBtn.closest('.task-card')
//         const taskId = taskCard.getAttribute('data-task-id');

//         todoManager.removeTaskFromProject(newProject,taskId)
//         console.log("clicked");
//     })
// })