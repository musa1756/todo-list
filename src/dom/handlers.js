import { getProjects, addProject, addTodoToProject, deleteProject, deleteTodo } from '../modules/app.js';
import { renderProjects, renderTodos } from './render.js';

let currentProjectId = null;

export function initHandlers() {
    const projects = getProjects();
    renderProjects(projects);

    if (projects.length > 0) {
        currentProjectId = projects[0].id;
        renderTodos(projects[0].todos);
    }

    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('add-project-btn').addEventListener('click', handleAddProject);
    document.getElementById('add-todo-btn').addEventListener('click', handleAddTodo);
    document.getElementById('projects-list').addEventListener('click', handleProjectClick);
    document.getElementById('todos-list').addEventListener('click', handleTodoClick);
}

function handleAddProject() {
    const name = prompt(`Enter project name`);

    if (name && name.trim()) {
        addProject(name.trim());
        renderProjects(getProjects());
    }
}

function handleAddTodo() {
    if (!currentProjectId) return;

    const title = prompt('Enter todo title:');
    if (!title || !title.trim()) return;

    const description = prompt('Enter description:') || '';
    const dueDate = prompt('Enter due date (YYYY-MM-DD):') || '';
    const priority = prompt('Enter priority (low/medium/high):') || 'low';

    addTodoToProject(currentProjectId, title.trim(), description, dueDate, priority);

    const projects = getProjects();
    const currentProject = projects.find(p => p.id === currentProjectId);
    renderTodos(currentProject.todos);
}

function handleProjectClick(e) {
    const target = e.target;

    if (target.classList.contains('delete-project-btn')) {
        const projectId = target.dataset.id;
        deleteProject(projectId);
        renderProjects(getProjects());
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