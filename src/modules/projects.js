const projects = (()=>{
    class Project {
        constructor(){
            this.projectTasks = [];
        }
    }

    const newProject = new Project(); 

    return{
        newProject,
    }
})()

export default projects;
