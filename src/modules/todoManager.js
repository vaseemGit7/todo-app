import Task from "./task";
import Project from "./project";

const todoManager = (() =>{
    const projects = [];
    let todoIdCounter = 1;

    const getCurrentProject = () =>{
        return projects[0];
    }

    const createTask = (title,description,date) =>{
        const newTask = new Task(todoIdCounter,title,description,date);
        todoIdCounter++;
        return newTask;
    }

    const createProject = (name) =>{
        const newProject = new Project(name);
        projects.push(newProject);
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
        getCurrentProject,
    }
})();

export default todoManager;