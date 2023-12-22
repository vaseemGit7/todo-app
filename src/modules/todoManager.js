import { compareAsc, isToday, isThisISOWeek } from "date-fns";
import Task from "./task";
import Project from "./project";

const todoManager = (() =>{
    let taskBins = [];
    let projects = [];
    let taskBinCounter = 1;
    let projectIdCounter = 1;
    let todoIdCounter = 1;

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

    const createTaskBin = (name) =>{
        const newTaskBin = new Project(taskBinCounter,name);
        taskBins.push(newTaskBin);
        taskBinCounter++;
        return newTaskBin;
    }
    
    const deleteProject = (projectId) => {
        projects = projects.filter(p => p.id != projectId);
    }

    const addTaskToProject = (project,task) =>{
        project.addTask(task);
        sortTasksByPriority(project);
        updateInbox();
        updateToday();
        updateThisWeek();
    }

    const editTaskInProject = (project,taskId,title,description,priority,date) =>{
        let selectedTask = project.tasks.find(task => task.id == taskId);
        selectedTask.editTask(title,description,priority,date);
    }

    const removeTaskFromProject = (project,task) =>{
        project.removeTask(task);
        updateInbox();
        updateToday();
        updateThisWeek();
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

    const getTaskBins = () =>{
        return taskBins;
    }

    const inbox = createTaskBin("Inbox");
    const today = createTaskBin("Today");
    const thisWeek = createTaskBin("This Week");

    let currentProject = inbox;
    
    const setCurrentProject = (project,collection) =>{
        if(collection === 'project'){
            currentProject = projects.find(p => p.id == project); 
        }
        
        if(collection === 'menu'){
            currentProject = taskBins.find(p => p.id == project);
        }
    }
    
    const getCurrentProject = () =>{
        return currentProject;
    }

    const sortTasksByPriority = (project) =>{
        const priorityOrder = {'high':3, 'medium':2, 'low':1};

        let sortedByPriority = project.tasks.sort((taskA,taskB)=> priorityOrder[taskB.priority]-priorityOrder[taskA.priority]);
        project.setTask(sortTasksByDate(sortedByPriority));
    }

    const sortTasksByDate = (sortedByPriority) => {
        let sortedByDate = sortedByPriority.sort((taskA,taskB)=>compareAsc(new Date(taskA.getDate()),new Date(taskB.getDate())));
        return sortedByDate;
    }

    const updateInbox = () =>{
        inbox.tasks = [];

        projects.forEach((project)=>{
            project.tasks.forEach((task)=>{
                inbox.tasks.push(task);
            })
        })

        sortTasksByPriority(inbox);
    }

    const updateToday = () =>{
        today.tasks = [];

        today.tasks = inbox.tasks.filter((task) => isToday(new Date(task.getDate())));

        sortTasksByPriority(today);
    }

    const updateThisWeek = () =>{
        thisWeek.tasks = [];

        thisWeek.tasks = inbox.tasks.filter((task) => isThisISOWeek(new Date(task.getDate())));

        sortTasksByPriority(thisWeek);
    }

    return{
        createTask,
        createProject,
        deleteProject,
        addTaskToProject,
        editTaskInProject,
        removeTaskFromProject,
        setTaskPriority,
        setTaskCompleteStatus,
        getProjects,
        getTaskBins,
        setCurrentProject,
        getCurrentProject,
    }
})();

export default todoManager;