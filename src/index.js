import './style.css';
import uiControlller from './modules/uiController';
import todoManager from "./modules/todoManager";

const createProjectBtn = document.getElementById('createProjectBtn');

uiControlller.renderTaskBins();
uiControlller.renderProjects();

createProjectBtn.addEventListener('click',()=>{
    let projectName = prompt("Enter project name");

    const newProject = todoManager.createProject(projectName);
    uiControlller.renderProjects();
})