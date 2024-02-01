import todoManager from "./todoManager";
import pubsub from "./pubsubManager";

const uiControlller = (() => {
  const createProjectBtn = document.getElementById("createProjectBtn");
  const revealCompletedBtn = document.getElementById("showDoneTasksBtn");
  const dialogModal = document.querySelector(".dialog-modal");

  const displayProject = (project, collection) => {
    const menus = document.querySelector(".menus-section");
    const workspaces = document.querySelector(".workspaces");

    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectNav = document.createElement("div");
    projectNav.textContent = project.name;
    projectNav.classList.add("project-nav");

    projectNav.addEventListener("click", (event) => {
      pubsub.publish("SelectProject", event);
    });
    projectCard.appendChild(projectNav);

    if (collection === "projects") {
      const editProjectBtn = document.createElement("div");
      editProjectBtn.textContent = "Edit";

      const deleteProjectBtn = document.createElement("div");
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
      ".tasks-completed-container",
    );

    const cardLeft = document.createElement("div");
    cardLeft.classList.add("card-left");

    const cardRight = document.createElement("div");
    cardRight.classList.add("card-right");

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskCheck = document.createElement("div");
    taskCheck.classList.add("task-check");

    const taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    taskTitle.classList.add("task-title");

    const taskDate = document.createElement("p");
    taskDate.textContent = task.date;
    taskDate.classList.add("task-date");

    const editTaskBtn = document.createElement("button");
    editTaskBtn.textContent = "E";
    editTaskBtn.classList.add("editTask-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "D";
    deleteBtn.classList.add("delete-btn");

    if (task.completed === true) {
      taskCard.classList.add("task-done");
      taskCheck.classList.add("task-checked");
    }

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

    cardLeft.appendChild(taskCheck);
    cardLeft.appendChild(taskTitle);

    cardRight.appendChild(taskDate);
    cardRight.appendChild(editTaskBtn);
    cardRight.appendChild(deleteBtn);

    taskCard.appendChild(cardLeft);
    taskCard.appendChild(cardRight);

    if (task.completed === true) {
      completedTasksContainer.appendChild(taskCard);
    } else {
      tasksContainer.appendChild(taskCard);
    }
  };

  const createAddTaskBtn = () => {
    const addTaskContainer = document.querySelector(".tasks-add-popup");
    addTaskContainer.innerHTML = "";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.classList.add("addTask-btn");

    addTaskBtn.addEventListener("click", (event) => {
      pubsub.publish("TaskForm", event);
    });

    addTaskContainer.appendChild(addTaskBtn);
  };

  const createRadioButton = (id, name, value, path) => {
    const label = document.createElement("label");
    label.classList.add("radio-label");

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = id;
    radioInput.name = name;
    radioInput.value = value;
    radioInput.style.display = "none";

    const icon = document.createElement("p");
    // icon.src = iconSrc;
    // icon.alt = "icon";
    icon.textContent = path;

    label.appendChild(radioInput);
    label.appendChild(icon);

    return label;
  };

  const createProjectForm = (action, project) => {
    dialogModal.innerHTML = "";

    const projectForm = document.createElement("form");
    projectForm.id = "projectForm";

    const projectIcons = document.createElement("div");
    projectIcons.classList.add("project-icons");

    const projectNameLabel = document.createElement("p");
    projectNameLabel.textContent = "Project Name";

    const projectNameInput = document.createElement("input");
    projectNameInput.type = "text";
    projectNameInput.id = "projectNameInput";
    projectNameInput.name = "Project Name";

    const projectIconLabel = document.createElement("p");
    projectIconLabel.textContent = "Project Icon";

    const defaultLabel = createRadioButton(
      "project-default",
      "project-icon",
      "default",
      "D",
    );
    const personalLabel = createRadioButton(
      "project-personal",
      "project-icon",
      "personal",
      "P",
    );
    const workLabel = createRadioButton(
      "project-work",
      "project-icon",
      "work",
      "W",
    );
    const studyLabel = createRadioButton(
      "project-study",
      "project-icon",
      "study",
      "S",
    );
    const homeLabel = createRadioButton(
      "project-home",
      "project-icon",
      "home",
      "H",
    );
    const socialLabel = createRadioButton(
      "project-social",
      "project-icon",
      "social",
      "S",
    );

    projectIcons.appendChild(defaultLabel);
    projectIcons.appendChild(personalLabel);
    projectIcons.appendChild(workLabel);
    projectIcons.appendChild(studyLabel);
    projectIcons.appendChild(homeLabel);
    projectIcons.appendChild(socialLabel);

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

      const radioButtons = projectIcons.querySelectorAll(
        'input[type="radio"][name="project-icon"]',
      );
      radioButtons.forEach((radioButton) => {
        if (radioButton.value === project.category) {
          radioButton.checked = true;
        }
      });

      actionBtn.textContent = "Edit project";

      actionBtn.addEventListener("click", (event) => {
        pubsub.publish("EditProject", event);
      });
    }

    projectForm.appendChild(projectNameLabel);
    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(projectIconLabel);
    projectForm.appendChild(projectIcons);
    projectForm.appendChild(actionBtn);

    dialogModal.appendChild(projectForm);
  };

  const createTaskForm = (action, task) => {
    const tasksAddPopup = document.querySelector(".tasks-add-popup");

    const taskForm = document.createElement("form");
    taskForm.classList.add("task-form");

    const topPanel = document.createElement("div");
    topPanel.classList.add("top-panel");

    const taskCheck = document.createElement("div");
    taskCheck.classList.add("task-check");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "titleInput";
    titleInput.name = "title";

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");

    const editTaskBtn = document.createElement("button");
    editTaskBtn.textContent = "E";
    editTaskBtn.classList.add("editTask-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "D";
    deleteBtn.classList.add("delete-btn");

    const topLeft = document.createElement("div");
    topLeft.classList.add("card-left");

    const topRight = document.createElement("div");
    topRight.classList.add("card-right");

    topLeft.appendChild(titleInput);
    topRight.appendChild(taskDate);
    topRight.appendChild(editTaskBtn);
    topRight.appendChild(deleteBtn);

    topPanel.appendChild(topLeft);

    const bottomPanel = document.createElement("div");
    bottomPanel.classList.add("bottom-panel");

    const leftPanel = document.createElement("div");
    leftPanel.classList.add("left-panel");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.id = "descriptionInput";
    descriptionInput.name = "description";

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

      topLeft.insertBefore(taskCheck, topLeft.firstChild);
      topPanel.appendChild(topRight);

      titleInput.value = task.title;
      taskDate.textContent = task.date;
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

    const actionPanel = document.createElement("div");
    actionPanel.classList.add("action-panel");

    actionPanel.appendChild(cancelBtn);
    actionPanel.appendChild(actionBtn);

    rightPanel.appendChild(dueDateLabel);
    rightPanel.appendChild(dateInput);
    rightPanel.appendChild(priorityLabel);
    rightPanel.appendChild(prioritySelect);
    rightPanel.appendChild(actionPanel);

    bottomPanel.appendChild(leftPanel);
    bottomPanel.appendChild(rightPanel);

    taskForm.appendChild(topPanel);
    taskForm.appendChild(bottomPanel);

    if (action === "add") {
      taskForm.id = "taskFormAdd";
      tasksAddPopup.appendChild(taskForm);
    }

    if (action === "edit") {
      taskForm.id = "taskFormEdit";
      const taskCard = document.querySelector(`[data-task-id= "${task.id}"]`);

      taskCard.parentElement.replaceChild(taskForm, taskCard);
    }
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
      ".tasks-completed-container",
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
      ".tasks-completed-container",
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
