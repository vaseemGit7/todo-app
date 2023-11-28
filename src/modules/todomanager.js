import Task from "./task";
import Project from "./project";

const todoManager = (() =>{
    const projects = [];

    const createTask = (title,description,date) =>{
        const newTask = new Task(title,description,date);
        return newTask;
    }

    const createProject = () =>{
        const newProject = new Project();
        projects.push(newProject);
        return newProject;
    }

    const addTaskToProject = (project,task) =>{
        project.addTask(task);
    }

    const getProjects = () =>{
        return projects;
    }

    return{
        createTask,
        createProject,
        addTaskToProject,
        getProjects,
    }
})();

export default todoManager;