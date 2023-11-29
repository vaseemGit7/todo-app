import todoManager from "./todomanager";

const uiControlller = (() => {
    const render = () =>{
        const tasksContainer = document.querySelector('.tasks-container');
        tasksContainer.innerHTML = '';

        const project = todoManager.getCurrentProject();
        const tasks = project.tasks;

        for(let i = 0; i<tasks.length;i++){
            displayTasks(tasks[i]);
        }
    }

    const displayTasks = (task) =>{
        const tasksContainer = document.querySelector('.tasks-container');
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        
        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;
        taskTitle.classList.add('task-title');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('task-description');

        const taskDate = document.createElement('p');
        taskDate.textContent = task.date;
        taskDate.classList.add('task-date');

        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDate);

        tasksContainer.appendChild(taskCard);
    }

    return{
        render,
    }
})()

export default uiControlller;