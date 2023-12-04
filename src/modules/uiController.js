import todoManager from "./todoManager";

const uiControlller = (() => {
    const renderProjects = () =>{
        const workspaces = document.querySelector('.workspaces');
        workspaces.innerHTML = '';

        const projects = todoManager.getProjects();

        for(let i = 0; i<projects.length;i++){
            displayProject(projects[i]);
        }
    }

    const displayProject = (project) =>{
        const workspaces = document.querySelector('.workspaces');

        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        const projectNav = document.createElement('button');
        projectNav.textContent = project.name;
        projectNav.classList.add('project-nav');

        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.textContent = "Delete";
                
        projectCard.setAttribute('data-project-id',project.id);
        
        deleteProjectBtn.addEventListener('click',handleProjectDeletion);
        projectNav.addEventListener('click',handleProjectSelection);
        
        projectCard.appendChild(projectNav);
        projectCard.appendChild(deleteProjectBtn);

        workspaces.appendChild(projectCard);
    }

    const renderTasks = () =>{
        const tasksContainer = document.querySelector('.tasks-container');
        tasksContainer.innerHTML = '';

        const project = todoManager.getCurrentProject();
        const tasks = project.tasks;

        for(let i = 0; i<tasks.length;i++){
            displayTask(tasks[i]);
        }
    }

    const displayTask = (task) =>{
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
        
        const taskId = document.createElement('p');
        taskId.textContent =`Task Id: ${task.id}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Button';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click',handleDelete);

        taskCard.setAttribute('data-task-id',task.id);
        
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskId);
        taskCard.appendChild(deleteBtn);

        tasksContainer.appendChild(taskCard);
    }

    const handleProjectSelection = (event) =>{
        const currentProjectName = document.querySelector('#currentProjectName');
        
        const projectCard = event.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');
        todoManager.setCurrentProject(projectId);
        console.log("Current Project: "+ projectId);
        
        const currentProject = todoManager.getCurrentProject();
        currentProjectName.textContent = currentProject.name;
        console.log(currentProject.name);
        renderTasks();
    }

    const handleProjectDeletion = (event) =>{
        const projectCard = event.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');

        todoManager.deleteProject(projectId);
        renderProjects();
        renderTasks();
    }

    const handleDelete = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const project = todoManager.getCurrentProject();
        todoManager.removeTaskFromProject(project,taskId);
        console.log("deleted");
        renderTasks();
    }

    return{
        renderTasks,
        renderProjects
    }
})()

export default uiControlller;