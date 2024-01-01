import './style.css';
import uiControlller from './modules/uiController';
import todoManager from './modules/todoManager';

todoManager.loadData();

uiControlller.renderTaskBins();
uiControlller.renderProjects();
