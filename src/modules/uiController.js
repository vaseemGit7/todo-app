import todoManager from "./todomanager";

const uiControlller = (() => {
    const render = () =>{
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = '';

        const project = todoManager.getCurrentProject();
        const tasks = project.tasks;

        for(let i = 0; i<tasks.length;i++){
            displayTasks(tasks[i]);
        }
    }

    const displayTasks = (task) =>{
        const taskContainer = document.querySelector('.task-container');
        
        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;
        taskTitle.classList.add('task-title');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('task-description');

        const taskDate = document.createElement('p');
        taskDate.textContent = task.date;
        taskDate.classList.add('task-date');

        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDescription);
        taskContainer.appendChild(taskDate);
    }

    return{
        render,
    }
})()

export default uiControlller;