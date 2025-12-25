import { getProjects, addProject, addTodoToProject, deleteProject, deleteTodo } from '../modules/app.js';
import { renderProjects, renderTodos } from './render.js';

let currentProjectId = null;

const projectDialog = document.getElementById('project-dialog');
const todoDialog = document.getElementById('todo-dialog');

export function initHandlers() {
    const projects = getProjects();
    renderProjects(projects);

    if (projects.length > 0) {
        currentProjectId = projects[0].id;
        document.getElementById('current-project-title').textContent = projects[0].name;
        renderTodos(projects[0].todos);
    }

    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('add-project-btn').addEventListener('click', () => {
        projectDialog.showModal();
    });

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        if (!currentProjectId) return;
        todoDialog.showModal();
    });

    document.getElementById('cancel-project-btn').addEventListener('click', () => {
        projectDialog.close();
    });

    document.getElementById('cancel-todo-btn').addEventListener('click', () => {
        todoDialog.close();
    });

    document.getElementById('project-dialog').addEventListener('submit', handleAddProject);
    document.getElementById('todo-dialog').addEventListener('submit', handleAddTodo);

    // Клики по спискам
    document.getElementById('projects-list').addEventListener('click', handleProjectClick);
    document.getElementById('todos-list').addEventListener('click', handleTodoClick);

    // Закрытие диалогов при клике на backdrop
    projectDialog.addEventListener('click', (e) => {
        if (e.target === projectDialog) projectDialog.close();
    });

    todoDialog.addEventListener('click', (e) => {
        if (e.target === todoDialog) todoDialog.close();
    });
}

function handleAddProject(e) {
    e.preventDefault();

    const nameInput = document.getElementById('project-name-input');
    const name = nameInput.value.trim();

    if (name) {
        addProject(name);
        renderProjects(getProjects());
        nameInput.value = '';
        projectDialog.close();
    }
}

function handleAddTodo(e) {
    e.preventDefault();

    if (!currentProjectId) return;

    const titleInput = document.getElementById('todo-title-input');
    const descInput = document.getElementById('todo-description-input');
    const dateInput = document.getElementById('todo-date-input');
    const priorityInput = document.getElementById('todo-priority-input');

    const title = titleInput.value.trim();
    if (!title) return;

    const description = descInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;

    addTodoToProject(currentProjectId, title, description, dueDate, priority);

    const projects = getProjects();
    const currentProject = projects.find(p => p.id === currentProjectId);
    renderTodos(currentProject.todos);

    // Очистить форму
    titleInput.value = '';
    descInput.value = '';
    dateInput.value = '';
    priorityInput.value = 'low';

    todoDialog.close();
}

function handleProjectClick(e) {
    const target = e.target;

    if (target.classList.contains('delete-project-btn')) {
        const projectId = target.dataset.id;
        deleteProject(projectId);

        const projects = getProjects();
        renderProjects(projects);

        // Если удалили текущий проект, переключиться на первый
        if (projectId === currentProjectId && projects.length > 0) {
            currentProjectId = projects[0].id;
            document.getElementById('current-project-title').textContent = projects[0].name;
            renderTodos(projects[0].todos);
        } else if (projects.length === 0) {
            currentProjectId = null;
            document.getElementById('current-project-title').textContent = 'No Projects';
            renderTodos([]);
        }
        return;
    }

    const li = target.closest('li');
    if (li && li.dataset.id) {
        currentProjectId = li.dataset.id;

        const projects = getProjects();
        const currentProject = projects.find(p => p.id === currentProjectId);

        document.getElementById('current-project-title').textContent = currentProject.name;
        renderTodos(currentProject.todos);
    }
}

function handleTodoClick(e) {
    const target = e.target;

    if (target.classList.contains('delete-todo-btn')) {
        const todoId = target.dataset.id;
        deleteTodo(currentProjectId, todoId);

        const projects = getProjects();
        const currentProject = projects.find(p => p.id === currentProjectId);
        renderTodos(currentProject.todos);
    }
}
