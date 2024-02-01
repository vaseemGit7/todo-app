import todoManager from "./todoManager";
import pubsub from "./pubsubManager";

const eventHandler = (() => {
  let cachedTaskCard = undefined;
  const dialogModal = document.querySelector(".dialog-modal");

  const handleProjectSelection = (event) => {
    const currentProjectName = document.querySelector("#currentProjectName");

    const projectCard = event.target.closest(".project-card");
    const isProjectCollection =
      projectCard.parentElement.classList.contains("workspaces");
    const isMenuCollection =
      projectCard.parentElement.classList.contains("menus-section");

    if (isProjectCollection) {
      const projectId = projectCard.getAttribute("data-project-id");
      todoManager.setCurrentProject(projectId, "project");
      console.log(`Current Project: ${projectId}`);
      pubsub.publish("CreateAddTaskBtn");
    }

    if (isMenuCollection) {
      const menuId = projectCard.getAttribute("data-menu-id");
      todoManager.setCurrentProject(menuId, "menu");
      console.log(`Current Menu: ${menuId}`);
    }

    const currentProject = todoManager.getCurrentProject();
    currentProjectName.textContent = currentProject.name;

    pubsub.publish("UpdateTasks");
  };

  const handleEditProject = (event) => {
    event.preventDefault();

    const projectCard = event.target.closest(".project-card");
    const projectId = projectCard.getAttribute("data-project-id");
    const projects = todoManager.getProjects();

    const project = projects.find((p) => p.id === Number(projectId));
    pubsub.publish("CreateProjectForm", { action: "edit", project });

    dialogModal.showModal();
  };

  const handleEditProjectSubmit = (event) => {
    event.preventDefault();

    const projectForm = event.target.closest("#projectForm");
    const projectId = projectForm.getAttribute("data-project-id");

    const projectName = document.querySelector("#projectNameInput").value;

    todoManager.updateProject(projectId, projectName);

    dialogModal.close();
    pubsub.publish("UpdateProjects");
  };

  const handleProjectDeletion = (event) => {
    const projectCard = event.target.closest(".project-card");
    const projectId = projectCard.getAttribute("data-project-id");

    todoManager.deleteProject(projectId);
    todoManager.setCurrentProject(undefined);
    pubsub.publish("UpdateProjects");
  };

  const handleTaskComplete = (event) => {
    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.getAttribute("data-task-id");

    const project = todoManager.getCurrentProject();
    todoManager.setTaskCompleteStatus(project, taskId);
    pubsub.publish("UpdateTasks");
  };

  const handleTaskPriority = (event) => {
    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.getAttribute("data-task-id");
    const priorityValue = event.target.value;

    const project = todoManager.getCurrentProject();
    todoManager.setTaskPriority(project, taskId, priorityValue);
    pubsub.publish("UpdateTasks");
  };

  const handleTaskForm = () => {
    pubsub.publish("CreateTaskForm", { action: "add" });

    const taskForm = document.querySelector(".task-form");
    taskForm.classList.remove("disabled");

    const addTaskBtn = document.querySelector(".addTask-btn");
    addTaskBtn.classList.add("disabled");

    console.log("FORM CREATED");
  };

  const handleAddProject = (event) => {
    event.preventDefault();

    const projectForm = document.querySelector("#projectForm");
    const projectName = document.querySelector("#projectNameInput").value;
    const projectCategory = document.querySelector(
      'input[type="radio"][name="project-icon"]:checked',
    ).value;

    todoManager.createProject(projectName, projectCategory);
    pubsub.publish("UpdateProjects");

    projectForm.reset();
    dialogModal.close();
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    const title = document.querySelector("#titleInput").value;
    const description = document.querySelector("#descriptionInput").value;
    const priority = document.querySelector("#priorityInput").value;
    const date = document.querySelector("#dateInput").value;

    const currentProject = todoManager.getCurrentProject();
    const newTask = todoManager.createTask(
      title,
      description,
      priority,
      date,
      currentProject.id,
    );

    todoManager.addTaskToProject(currentProject, newTask);

    const taskForm = document.querySelector(".task-form");
    taskForm.classList.add("disabled");

    const addTaskBtn = document.querySelector(".addTask-btn");
    addTaskBtn.classList.remove("disabled");

    pubsub.publish("UpdateTasks");
    console.log("It clicked");
    console.log(currentProject.tasks);
  };

  const handleEditTask = (event) => {
    const currentlyDisplayedForm = document.getElementById("taskFormEdit");

    if (currentlyDisplayedForm) {
      const taskCardParent = currentlyDisplayedForm.parentElement;
      taskCardParent.replaceChild(cachedTaskCard, currentlyDisplayedForm);
    }

    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.getAttribute("data-task-id");
    const project = todoManager.getCurrentProject();

    cachedTaskCard = taskCard;

    const task = project.tasks.find((t) => t.id === Number(taskId));
    pubsub.publish("CreateTaskForm", { action: "edit", task });
  };

  const handleEditTaskSubmit = (event) => {
    event.preventDefault();

    const taskForm = event.target.closest(".task-form");
    const taskId = taskForm.getAttribute("data-task-id");
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
    const project = todoManager.getCurrentProject();

    const editedTitle = document.querySelector("#titleInput").value;
    const editedDescription = document.querySelector("#descriptionInput").value;
    const editedPriority = document.querySelector("#priorityInput").value;
    const editedDate = document.querySelector("#dateInput").value;
    todoManager.editTaskInProject(
      project,
      taskId,
      editedTitle,
      editedDescription,
      editedPriority,
      editedDate,
    );

    pubsub.publish("UpdateTasks");
  };

  const handleDeleteTask = (event) => {
    const taskCard = event.target.closest(".task-card");
    const taskId = taskCard.getAttribute("data-task-id");
    const originId = taskCard.getAttribute("data-origin-id");
    const projects = todoManager.getProjects();

    const project = projects.find((p) => p.id === Number(originId));
    todoManager.removeTaskFromProject(project, taskId);

    console.log("deleted");
    pubsub.publish("UpdateTasks");
  };

  const init = () => {
    pubsub.subscribe("AddProject", (event) => handleAddProject(event));
    pubsub.subscribe("EditProject", (event) => handleEditProjectSubmit(event));
    pubsub.subscribe("DeleteProject", (event) => handleProjectDeletion(event));
    pubsub.subscribe("TriggerEditProject", (event) => handleEditProject(event));
    pubsub.subscribe("SelectProject", (event) => handleProjectSelection(event));
    pubsub.subscribe("AddTask", (event) => handleAddTask(event));
    pubsub.subscribe("EditTask", (event) => handleEditTaskSubmit(event));
    pubsub.subscribe("DeleteTask", (event) => handleDeleteTask(event));
    pubsub.subscribe("TriggerEditTask", (event) => handleEditTask(event));
    pubsub.subscribe("ChangePriority", (event) => handleTaskPriority(event));
    pubsub.subscribe("CompletekTask", (event) => handleTaskComplete(event));
    pubsub.subscribe("TaskForm", (event) => handleTaskForm(event));
  };

  window.onload = () => {
    const currentProjectName = document.querySelector("#currentProjectName");

    const currentProject = todoManager.getCurrentProject();
    currentProjectName.textContent = currentProject.name;

    pubsub.publish("UpdateTasks");
  };
  return {
    init,
  };
})();
export default eventHandler;
