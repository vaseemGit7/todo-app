import { compareAsc, isToday, isThisISOWeek } from "date-fns";
import Task from "./task";
import Project from "./project";
import storageManager from "./storageManager";

const todoManager = (() => {
  const taskBins = [];
  let projects = [];
  let taskBinCounter = 1;

  const generateUniqueId = () => Date.now();

  const saveData = () => {
    storageManager.saveToLocalStorage({ projects });
  };

  const createTask = (title, description, priority, date, originId) => {
    const completed = false;
    const todoIdCounter = generateUniqueId();
    const newTask = new Task(
      todoIdCounter,
      title,
      description,
      priority,
      date,
      originId,
      completed,
    );
    saveData();
    return newTask;
  };

  const createProject = (name, category) => {
    const projectIdCounter = generateUniqueId();
    const newProject = new Project(projectIdCounter, name, category);
    projects.push(newProject);
    saveData();
    return newProject;
  };

  const createTaskBin = (name, category) => {
    const newTaskBin = new Project(taskBinCounter, name, category);
    taskBins.push(newTaskBin);
    taskBinCounter += 1;
    return newTaskBin;
  };

  const sortTasksByPriority = (project) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };

    const sortTasksByDate = (sortedByPriority) => {
      const sortedByDate = sortedByPriority.sort((taskA, taskB) =>
        compareAsc(new Date(taskA.getDate()), new Date(taskB.getDate())),
      );
      return sortedByDate;
    };

    const sortedByPriority = project.tasks.sort(
      (taskA, taskB) =>
        priorityOrder[taskB.priority] - priorityOrder[taskA.priority],
    );
    project.setTask(sortTasksByDate(sortedByPriority));
  };

  const inbox = createTaskBin("Inbox", "inbox");
  const today = createTaskBin("Today", "today");
  const thisWeek = createTaskBin("This Week", "week");

  const updateInbox = () => {
    inbox.tasks = [];

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        inbox.tasks.push(task);
      });
    });

    sortTasksByPriority(inbox);
  };

  const updateToday = () => {
    today.tasks = [];

    today.tasks = inbox.tasks.filter((task) =>
      isToday(new Date(task.getDate())),
    );

    sortTasksByPriority(today);
  };

  const updateThisWeek = () => {
    thisWeek.tasks = [];

    thisWeek.tasks = inbox.tasks.filter((task) =>
      isThisISOWeek(new Date(task.getDate())),
    );

    sortTasksByPriority(thisWeek);
  };

  const updateAndSaveData = () => {
    updateInbox();
    updateToday();
    updateThisWeek();
    saveData();
  };

  const updateProject = (projectId, name, category) => {
    const selectedProject = projects.find((p) => p.id === Number(projectId));
    selectedProject.editProject(name, category);
    updateAndSaveData();
  };

  const deleteProject = (projectId) => {
    projects = projects.filter((p) => p.id !== Number(projectId));
    updateAndSaveData();
  };

  const addTaskToProject = (project, task) => {
    project.addTask(task);
    sortTasksByPriority(project);
    updateAndSaveData();
  };

  const editTaskInProject = (
    project,
    taskId,
    title,
    description,
    priority,
    date,
  ) => {
    const selectedTask = project.tasks.find(
      (task) => task.id === Number(taskId),
    );
    selectedTask.editTask(title, description, priority, date);
    updateAndSaveData();
  };

  const removeTaskFromProject = (project, task) => {
    project.removeTask(task);
    updateAndSaveData();
  };

  const setTaskPriority = (project, taskId, priorityValue) => {
    const selectedTask = project.tasks.find(
      (task) => task.id === Number(taskId),
    );
    selectedTask.setPriority(priorityValue);
  };

  const setTaskCompleteStatus = (project, taskId) => {
    const selectedTask = project.tasks.find(
      (task) => task.id === Number(taskId),
    );
    selectedTask.setCompleted();
    updateAndSaveData();
  };

  const getProjects = () => projects;

  const getTaskBins = () => taskBins;

  let currentProject = inbox;

  const setCurrentProject = (projectId, collection) => {
    if (collection === "project") {
      currentProject = projects.find((p) => p.id === Number(projectId));
    }

    if (collection === "menu") {
      currentProject = taskBins.find((p) => p.id === Number(projectId));
    }
  };

  const loadData = () => {
    const loadedData = storageManager.loadFromLocalStorage();
    if (loadedData) {
      projects = loadedData.projects.map((projectData) => {
        const project = new Project(
          projectData.id,
          projectData.name,
          projectData.category,
        );
        projectData.tasks.forEach((taskData) => {
          const task = new Task(
            taskData.id,
            taskData.title,
            taskData.description,
            taskData.priority,
            taskData.date,
            taskData.originId,
            taskData.completed,
          );
          project.addTask(task);
        });

        return project;
      });
      updateAndSaveData();
    }
  };

  const getCurrentProject = () => currentProject;

  return {
    createTask,
    createProject,
    updateProject,
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
    loadData,
  };
})();

export default todoManager;
