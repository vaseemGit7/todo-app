import "./style.css";
import uiControlller from "./modules/uiController";
import todoManager from "./modules/todoManager";
import eventHandler from "./modules/eventHandler";

todoManager.loadData();

uiControlller.renderTaskBins();
uiControlller.renderProjects();
eventHandler.init();
