import todoManager from "./todoManager";

const uiControlller = (() => {
    const renderTaskBins = () =>{
        const taskBins = todoManager.getTaskBins();

        for(let i = 0; i<taskBins.length;i++){
            displayProject(taskBins[i],'taskBins');
        }
    }

    const renderProjects = () =>{
        const workspaces = document.querySelector('.workspaces');
        workspaces.innerHTML = '';

        const projects = todoManager.getProjects();

        for(let i = 0; i<projects.length;i++){
            displayProject(projects[i],'projects');
        }
    }

    const displayProject = (project,collection) =>{
        const menus = document.querySelector('.menus');
        const workspaces = document.querySelector('.workspaces');

        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        const projectNav = document.createElement('button');
        projectNav.textContent = project.name;
        projectNav.classList.add('project-nav');

        projectNav.addEventListener('click',handleProjectSelection);
        projectCard.appendChild(projectNav);
        
        if(collection === 'projects'){
            const deleteProjectBtn = document.createElement('button');
            deleteProjectBtn.textContent = "Delete";
                    
            deleteProjectBtn.addEventListener('click',handleProjectDeletion);    

            projectCard.setAttribute('data-project-id',project.id);
            projectCard.appendChild(deleteProjectBtn);
            workspaces.appendChild(projectCard);
        }

        if(collection === 'taskBins'){
            projectCard.setAttribute('data-menu-id',project.id);
            menus.appendChild(projectCard);
        }
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

        const taskCheck = document.createElement('div');
        taskCheck.classList.add('task-check');
        
        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;
        taskTitle.classList.add('task-title');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('task-description');

        const taskPriority = document.createElement('select');
        taskPriority.className = 'task-priority';

        const taskDate = document.createElement('p');
        taskDate.textContent = task.date;
        taskDate.classList.add('task-date');
        
        const taskId = document.createElement('p');
        taskId.textContent =`Task Id: ${task.id}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Button';
        deleteBtn.classList.add('delete-btn');

        const priorityOptions = ['high','medium','low'];

        priorityOptions.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);

            if (optionValue === task.priority) {
                option.selected = true;
            }
    
            taskPriority.appendChild(option);
        })

        if(task.completed === true){
            taskCard.classList.add('task-done');
            taskCheck.classList.add('task-checked');
        }

        taskPriority.addEventListener('change', handleTaskPriority);
        taskCheck.addEventListener('click', handleTaskComplete);
        deleteBtn.addEventListener('click',handleDeleteTask);

        taskCard.setAttribute('data-task-id',task.id);
        
        taskCard.appendChild(taskCheck);
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskPriority);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskId);
        taskCard.appendChild(deleteBtn);

        tasksContainer.appendChild(taskCard);
    }

    const createAddTaskBtn = () =>{
        const addTaskContainer = document.querySelector('.add-task-container');
        addTaskContainer.innerHTML = "";

        const addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.classList.add('addTask-btn');
        addTaskBtn.addEventListener('click',handleTaskForm);

        addTaskContainer.appendChild(addTaskBtn);
    }

    const createTaskForm = () =>{
        const tasksContainer = document.querySelector('.tasks-container');

        const taskForm = document.createElement('form');
        taskForm.id = 'taskForm';
        taskForm.classList.add('task-form');
        taskForm.classList.add('disabled');
        
        const leftPanel = document.createElement('div');
        leftPanel.classList.add('left-panel');
        
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'titleInput';
        titleInput.name = 'title';
        
        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'descriptionInput';
        descriptionInput.name = 'description';
        
        leftPanel.appendChild(titleLabel);
        leftPanel.appendChild(titleInput);
        leftPanel.appendChild(descriptionLabel);
        leftPanel.appendChild(descriptionInput);
        
        const rightPanel = document.createElement('div');
        rightPanel.classList.add('right-panel');
        
        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Due Date';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.name = 'dueDate';
        dateInput.id = 'dateInput';
        
        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = 'Priority';
        const prioritySelect = document.createElement('select');
        prioritySelect.name = 'priority';
        prioritySelect.id = 'priorityInput';
        
        const priorities = ['High', 'Medium', 'Low'];
        priorities.forEach(priority => {
          const option = document.createElement('option');
          option.value = priority.toLowerCase();
          option.textContent = priority;
          prioritySelect.appendChild(option);
        });
        
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancelBtn';
        cancelBtn.textContent = 'Cancel';
        
        const addBtn = document.createElement('button');
        addBtn.id = 'addBtn';
        addBtn.textContent = 'Add';

        addBtn.addEventListener('click',handleAddTask);
        
        rightPanel.appendChild(dueDateLabel);
        rightPanel.appendChild(dateInput);
        rightPanel.appendChild(priorityLabel);
        rightPanel.appendChild(prioritySelect);
        rightPanel.appendChild(cancelBtn);
        rightPanel.appendChild(addBtn);
        
        taskForm.appendChild(leftPanel);
        taskForm.appendChild(rightPanel);
        
        tasksContainer.appendChild(taskForm);
    }

    const handleProjectSelection = (event) =>{
        const currentProjectName = document.querySelector('#currentProjectName');
        
        const projectCard = event.target.closest('.project-card');
        const isProjectCollection = projectCard.parentElement.classList.contains('workspaces');
        const isMenuCollection = projectCard.parentElement.classList.contains('menus');
        
        if(isProjectCollection){
            const projectId = projectCard.getAttribute('data-project-id');
            todoManager.setCurrentProject(projectId,'project');
            console.log("Current Project: "+ projectId);
            createAddTaskBtn();
        }
        
        if(isMenuCollection){
            const menuId = projectCard.getAttribute('data-menu-id');
            todoManager.setCurrentProject(menuId,'menu');
            console.log("Current Menu: "+ menuId);
        }

        const currentProject = todoManager.getCurrentProject();
        currentProjectName.textContent = currentProject.name;
        
        renderTasks();
    }

    const handleProjectDeletion = (event) =>{
        const projectCard = event.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');

        todoManager.deleteProject(projectId);
        todoManager.setCurrentProject(undefined);
        renderProjects();   
    }

    const handleTaskComplete = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');

        const project = todoManager.getCurrentProject();
        todoManager.setTaskCompleteStatus(project,taskId);
        renderTasks();  
    }

    const handleTaskPriority = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const priorityValue = event.target.value;

        const project = todoManager.getCurrentProject();
        todoManager.setTaskPriority(project,taskId,priorityValue);
        renderTasks();
    }

    const handleTaskForm = () =>{
        createTaskForm();

        const taskForm = document.querySelector('.task-form');
        taskForm.classList.remove('disabled');

        const addTaskBtn = document.querySelector('.addTask-btn');
        addTaskBtn.classList.add('disabled');

        console.log("FORM CREATED");
    }

    const handleAddTask = (event) =>{
        event.preventDefault();

        const title = document.querySelector('#titleInput').value;
        const description = document.querySelector('#descriptionInput').value;
        const priority = document.querySelector('#priorityInput').value;
        const date = document.querySelector('#dateInput').value;

        const currentProject = todoManager.getCurrentProject();
        const newTask = todoManager.createTask(title,description,priority,date);

        todoManager.addTaskToProject(currentProject,newTask);

        const taskForm = document.querySelector('.task-form');
        taskForm.classList.add('disabled');

        const addTaskBtn = document.querySelector('.addTask-btn');
        addTaskBtn.classList.remove('disabled');
        
        renderTasks();
        console.log("It clicked");
        console.log(currentProject.tasks);
    }

    const handleDeleteTask = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const project = todoManager.getCurrentProject();
        todoManager.removeTaskFromProject(project,taskId);
        console.log("deleted");
        renderTasks();
    }

    return{
        renderTasks,
        renderProjects,
        renderTaskBins
    }
})()

export default uiControlller;