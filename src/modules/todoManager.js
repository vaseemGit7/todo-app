import Task from "./task";
import Project from "./project";

const todoManager = (() =>{
    const projects = [];
    let projectIdCounter = 1;
    let todoIdCounter = 1;

    let currentProject = undefined;

    const setCurrentProject = (project) =>{
        currentProject = projects.find(p => p.id == project); 
    }

    const getCurrentProject = () =>{
        return currentProject;
    }

    const createTask = (title,description,date) =>{
        const newTask = new Task(todoIdCounter,title,description,date);
        todoIdCounter++;
        return newTask;
    }

    const createProject = (name) =>{
        const newProject = new Project(projectIdCounter,name);
        projects.push(newProject);
        projectIdCounter++;
        return newProject;
    }

    const addTaskToProject = (project,task) =>{
        project.addTask(task);
    }

    const removeTaskFromProject = (project,task) =>{
        project.removeTask(task);
    }

    const getProjects = () =>{
        return projects;
    }

    return{
        createTask,
        createProject,
        addTaskToProject,
        removeTaskFromProject,
        getProjects,
        setCurrentProject,
        getCurrentProject,
    }
})();

export default todoManager;