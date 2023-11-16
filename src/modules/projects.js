import getTasks from "./tasks";

const myTasks = [];

function addTasks(){
    myTasks.push(getTasks());
}

addTasks();

export default myTasks;
