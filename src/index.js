import Projects from "./modules/projects";

const newProject = new Projects();

newProject.getTasks();

newProject.createTask();

newProject.addTasks();

console.log(newProject.myTasks);