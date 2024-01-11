import todoManager from "./todoManager";
import pubsub from "./pubsubManager";

const uiControlller = (() => {
  const createProjectBtn = document.getElementById("createProjectBtn");
  const revealCompletedBtn = document.getElementById("revealCompleted");
  const dialogModal = document.querySelector(".dialog-modal");

  const displayProject = (project, collection) => {
    const menus = document.querySelector(".menus");
    const workspaces = document.querySelector(".workspaces");

    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectNav = document.createElement("button");
    projectNav.textContent = project.name;
    projectNav.classList.add("project-nav");

    projectNav.addEventListener("click", (event) => {
      pubsub.publish("SelectProject", event);
    });
    projectCard.appendChild(projectNav);

    if (collection === "projects") {
      const editProjectBtn = document.createElement("button");
      editProjectBtn.textContent = "Edit";

      const deleteProjectBtn = document.createElement("button");
      deleteProjectBtn.textContent = "Delete";

      editProjectBtn.addEventListener("click", (event) => {
        pubsub.publish("TriggerEditProject", event);
      });

      deleteProjectBtn.addEventListener("click", (event) => {
        pubsub.publish("DeleteProject", event);
      });

      projectCard.setAttribute("data-project-id", project.id);
      projectCard.appendChild(editProjectBtn);
      projectCard.appendChild(deleteProjectBtn);
      workspaces.appendChild(projectCard);
    }

    if (collection === "taskBins") {
      projectCard.setAttribute("data-menu-id", project.id);
      menus.appendChild(projectCard);
    }
  };

  const displayTask = (task) => {
    const tasksContainer = document.querySelector(".tasks-container");
    const completedTasksContainer = document.querySelector(
      ".completed-tasks-container",
    );
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskCheck = document.createElement("div");
    taskCheck.classList.add("task-check");

    const taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    taskTitle.classList.add("task-title");

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    taskDescription.classList.add("task-description");

    const taskPriority = document.createElement("select");
    taskPriority.className = "task-priority";

    const taskDate = document.createElement("p");
    taskDate.textContent = task.date;
    taskDate.classList.add("task-date");

    const taskId = document.createElement("p");
    taskId.textContent = `Task Id: ${task.id}`;

    const editTaskBtn = document.createElement("button");
    editTaskBtn.textContent = "Edit Button";
    editTaskBtn.classList.add("editTask-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Button";
    deleteBtn.classList.add("delete-btn");

    const priorityOptions = ["high", "medium", "low"];

    priorityOptions.forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent =
        optionValue.charAt(0).toUpperCase() + optionValue.slice(1);

      if (optionValue === task.priority) {
        option.selected = true;
      }

      taskPriority.appendChild(option);
    });

    if (task.completed === true) {
      taskCard.classList.add("task-done");
      taskCheck.classList.add("task-checked");
    }

    taskPriority.addEventListener("change", (event) => {
      pubsub.publish("ChangePriority", event);
    });

    taskCheck.addEventListener("click", (event) => {
      pubsub.publish("CompletekTask", event);
    });

    editTaskBtn.addEventListener("click", (event) => {
      pubsub.publish("TriggerEditTask", event);
    });

    deleteBtn.addEventListener("click", (event) => {
      pubsub.publish("DeleteTask", event);
    });

    taskCard.setAttribute("data-task-id", task.id);
    taskCard.setAttribute("data-origin-id", task.originId);

    taskCard.appendChild(taskCheck);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskId);
    taskCard.appendChild(editTaskBtn);
    taskCard.appendChild(deleteBtn);

    if (task.completed === true) {
      completedTasksContainer.appendChild(taskCard);
    } else {
      tasksContainer.appendChild(taskCard);
    }
  };

  const createAddTaskBtn = () => {
    const addTaskContainer = document.querySelector(".add-task-container");
    addTaskContainer.innerHTML = "";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.classList.add("addTask-btn");

    addTaskBtn.addEventListener("click", (event) => {
      pubsub.publish("TaskForm", event);
    });

    addTaskContainer.appendChild(addTaskBtn);
  };

  const createProjectForm = (action, project) => {
    dialogModal.innerHTML = "";

    const projectForm = document.createElement("form");
    projectForm.id = "projectForm";

    const projectLabel = document.createElement("label");
    projectLabel.textContent = "Project Name";

    const projectNameInput = document.createElement("input");
    projectNameInput.type = "text";
    projectNameInput.id = "projectNameInput";
    projectNameInput.name = "Project Name";

    const actionBtn = document.createElement("button");

    if (action === "add") {
      actionBtn.textContent = "Add Project";

      actionBtn.addEventListener("click", (event) => {
        pubsub.publish("AddProject", event);
      });
    }

    if (action === "edit") {
      projectForm.setAttribute("data-project-id", project.id);
      projectNameInput.value = project.name;

      actionBtn.textContent = "Edit project";

      actionBtn.addEventListener("click", (event) => {
        pubsub.publish("EditProject", event);
      });
    }

    projectForm.appendChild(projectLabel);
    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(actionBtn);

    dialogModal.appendChild(projectForm);
  };

  const createTaskForm = (action, task) => {
    const tasksContainer = document.querySelector(".tasks-container");

    const taskForm = document.createElement("form");
    taskForm.id = "taskForm";
    taskForm.classList.add("task-form");
    taskForm.classList.add("disabled");

    const leftPanel = document.createElement("div");
    leftPanel.classList.add("left-panel");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "titleInput";
    titleInput.name = "title";

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.id = "descriptionInput";
    descriptionInput.name = "description";

    leftPanel.appendChild(titleLabel);
    leftPanel.appendChild(titleInput);
    leftPanel.appendChild(descriptionLabel);
    leftPanel.appendChild(descriptionInput);

    const rightPanel = document.createElement("div");
    rightPanel.classList.add("right-panel");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "dueDate";
    dateInput.id = "dateInput";

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";
    prioritySelect.id = "priorityInput";

    const priorities = ["High", "Medium", "Low"];
    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority.toLowerCase();
      option.textContent = priority;
      prioritySelect.appendChild(option);
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancelBtn";
    cancelBtn.textContent = "Cancel";

    const actionBtn = document.createElement("button");

    if (action === "add") {
      actionBtn.id = "addBtn";
      actionBtn.textContent = "Add";

      actionBtn.addEventListener("click", (event) => {
        pubsub.publish("AddTask", event);
      });
      console.log("Action ADD");
    }

    if (action === "edit") {
      taskForm.setAttribute("data-task-id", task.id);

      titleInput.value = task.title;
      descriptionInput.value = task.description;
      prioritySelect.value = task.priority;
      dateInput.value = task.date;

      actionBtn.id = "editBtn";
      actionBtn.textContent = "Edit";

      actionBtn.addEventListener("click", (event) => {
        pubsub.publish("EditTask", event);
      });
      console.log("Action EDIT");
    }

    rightPanel.appendChild(dueDateLabel);
    rightPanel.appendChild(dateInput);
    rightPanel.appendChild(priorityLabel);
    rightPanel.appendChild(prioritySelect);
    rightPanel.appendChild(cancelBtn);
    rightPanel.appendChild(actionBtn);

    taskForm.appendChild(leftPanel);
    taskForm.appendChild(rightPanel);

    tasksContainer.appendChild(taskForm);
  };

  const renderTaskBins = () => {
    const taskBins = todoManager.getTaskBins();

    for (let i = 0; i < taskBins.length; i++) {
      displayProject(taskBins[i], "taskBins");
    }
  };

  const renderProjects = () => {
    const workspaces = document.querySelector(".workspaces");
    workspaces.innerHTML = "";

    const projects = todoManager.getProjects();

    for (let i = 0; i < projects.length; i++) {
      displayProject(projects[i], "projects");
    }
  };

  const renderTasks = () => {
    const tasksContainer = document.querySelector(".tasks-container");
    const completedTasksContainer = document.querySelector(
      ".completed-tasks-container",
    );
    tasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";

    const project = todoManager.getCurrentProject();
    const { tasks } = project;

    for (let i = 0; i < tasks.length; i++) {
      displayTask(tasks[i]);
    }
  };

  createProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogModal.showModal();
    createProjectForm("add");
  });

  revealCompletedBtn.addEventListener("click", () => {
    const completedTasksContainer = document.querySelector(
      ".completed-tasks-container",
    );
    completedTasksContainer.classList.toggle("disabled");
  });

  pubsub.subscribe("UpdateTasks", renderTasks);
  pubsub.subscribe("UpdateProjects", renderProjects);
  pubsub.subscribe("CreateAddTaskBtn", createAddTaskBtn);
  pubsub.subscribe("CreateTaskForm", ({ action, task }) =>
    createTaskForm(action, task),
  );
  pubsub.subscribe("CreateProjectForm", ({ action, project }) =>
    createProjectForm(action, project),
  );

  return {
    renderProjects,
    renderTaskBins,
  };
})();

export default uiControlller;
