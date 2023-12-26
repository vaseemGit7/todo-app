import todoManager from "./todoManager"
import uiControlller from "./uiController"

const eventHandler = (()=>{
    const dialogModal = document.querySelector('.dialog-modal');

    const handleProjectSelection = (event) =>{
        const currentProjectName = document.querySelector('#currentProjectName');
        
        const projectCard = event.target.closest('.project-card');
        const isProjectCollection = projectCard.parentElement.classList.contains('workspaces');
        const isMenuCollection = projectCard.parentElement.classList.contains('menus');
        
        if(isProjectCollection){
            const projectId = projectCard.getAttribute('data-project-id');
            todoManager.setCurrentProject(projectId,'project');
            console.log("Current Project: "+ projectId);
            uiControlller.createAddTaskBtn();
        }
        
        if(isMenuCollection){
            const menuId = projectCard.getAttribute('data-menu-id');
            todoManager.setCurrentProject(menuId,'menu');
            console.log("Current Menu: "+ menuId);
        }

        const currentProject = todoManager.getCurrentProject();
        currentProjectName.textContent = currentProject.name;
        
        uiControlller.renderTasks();
    }

    const handleProjectDeletion = (event) =>{
        const projectCard = event.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');

        todoManager.deleteProject(projectId);
        todoManager.setCurrentProject(undefined);
        uiControlller.renderProjects();   
    }

    const handleTaskComplete = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');

        const project = todoManager.getCurrentProject();
        todoManager.setTaskCompleteStatus(project,taskId);
        uiControlller.renderTasks();  
    }

    const handleTaskPriority = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const priorityValue = event.target.value;

        const project = todoManager.getCurrentProject();
        todoManager.setTaskPriority(project,taskId,priorityValue);
        uiControlller.renderTasks();
    }

    const handleTaskForm = () =>{
        uiControlller.createTaskForm('add');

        const taskForm = document.querySelector('.task-form');
        taskForm.classList.remove('disabled');

        const addTaskBtn = document.querySelector('.addTask-btn');
        addTaskBtn.classList.add('disabled');

        console.log("FORM CREATED");
    }

    const handleAddProject =  (event) =>{
        event.preventDefault();

        const projectForm = document.querySelector('#projectForm');
        const projectName = document.querySelector('#projectNameInput').value;

        todoManager.createProject(projectName);
        uiControlller.renderProjects();

        projectForm.reset();
        dialogModal.close();
    }

    const handleAddTask = (event) =>{
        event.preventDefault();

        const title = document.querySelector('#titleInput').value;
        const description = document.querySelector('#descriptionInput').value;
        const priority = document.querySelector('#priorityInput').value;
        const date = document.querySelector('#dateInput').value;

        const currentProject = todoManager.getCurrentProject();
        const newTask = todoManager.createTask(title,description,priority,date,currentProject.id);

        todoManager.addTaskToProject(currentProject,newTask);

        const taskForm = document.querySelector('.task-form');
        taskForm.classList.add('disabled');

        const addTaskBtn = document.querySelector('.addTask-btn');
        addTaskBtn.classList.remove('disabled');
        
        uiControlller.renderTasks();
        console.log("It clicked");
        console.log(currentProject.tasks);
    }

    const handleEditTask = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const project = todoManager.getCurrentProject();

        const task = project.tasks.find((task)=> task.id == taskId);
        uiControlller.createTaskForm('edit',task);

        const taskForm = document.querySelector('.task-form');
        taskForm.classList.remove('disabled');

        taskCard.classList.add('disabled');

        console.log(event.target.closest('.task-card'));
    }

    const handleEditTaskSubmit = (event) =>{
        event.preventDefault();

        const taskForm = event.target.closest('.task-form');
        const taskId = taskForm.getAttribute('data-task-id');
        const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
        const project = todoManager.getCurrentProject();

        const editedTitle = document.querySelector('#titleInput').value;
        const editedDescription = document.querySelector('#descriptionInput').value;
        const editedPriority = document.querySelector('#priorityInput').value;
        const editedDate = document.querySelector('#dateInput').value;
        todoManager.editTaskInProject(project,taskId,editedTitle,editedDescription,editedPriority,editedDate);

        taskForm.classList.add('disabled');

        taskCard.classList.remove('disabled');
        uiControlller.renderTasks();
    }

    const handleDeleteTask = (event) =>{
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-task-id');
        const originId = taskCard.getAttribute('data-origin-id');
        const projects = todoManager.getProjects();

        const project = projects.find(p => p.id == originId);
        todoManager.removeTaskFromProject(project,taskId);
        
        console.log("deleted");
        uiControlller.renderTasks();
    }

    return{
        handleAddProject,
        handleAddTask,
        handleEditTask,
        handleEditTaskSubmit,
        handleDeleteTask,
        handleProjectSelection,
        handleProjectDeletion,
        handleTaskForm,
        handleTaskComplete,
        handleTaskPriority,
    }
})();
export default eventHandler;