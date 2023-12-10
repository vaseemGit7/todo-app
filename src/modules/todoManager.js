import Task from "./task";
import Project from "./project";

const todoManager = (() =>{
    let projects = [];
    let projectIdCounter = 1;
    let todoIdCounter = 1;

    let currentProject = undefined;

    const setCurrentProject = (project) =>{
        currentProject = projects.find(p => p.id == project); 
    }

    const getCurrentProject = () =>{
        return currentProject;
    }

    const createTask = (title,description,priority,date) =>{
        const newTask = new Task(todoIdCounter,title,description,priority,date);
        todoIdCounter++;
        return newTask;
    }

    const createProject = (name) =>{
        const newProject = new Project(projectIdCounter,name);
        projects.push(newProject);
        projectIdCounter++;
        return newProject;
    }
    
    const deleteProject = (projectId) => {
        projects = projects.filter(p => p.id != projectId);
    }

    const addTaskToProject = (project,task) =>{
        project.addTask(task);
    }

    const removeTaskFromProject = (project,task) =>{
        project.removeTask(task);
    }

    const setTaskPriority = (project,taskId,priorityValue) =>{
        let selectedTask = project.tasks.find(task => task.id == taskId);
        selectedTask.setPriority(priorityValue);
    }

    const setTaskCompleteStatus = (project,taskId) =>{
        let selectedTask = project.tasks.find(task => task.id == taskId);
        selectedTask.setCompleted();
        console.log(selectedTask);
    }

    const getProjects = () =>{
        return projects;
    }

    return{
        createTask,
        createProject,
        deleteProject,
        addTaskToProject,
        removeTaskFromProject,
        setTaskPriority,
        setTaskCompleteStatus,
        getProjects,
        setCurrentProject,
        getCurrentProject,
    }
})();

export default todoManager;