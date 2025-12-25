// Main application logic

import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";

let projects = [];

function init() {
    const savedProjects = loadProjects();

    if (savedProjects) {
        projects = savedProjects;
    } else {
        const defaultProject = createProject(`Inbox`);
        projects.push(defaultProject);
    }
}

export function addProject(name) {
    const getUserProject = createProject(name);
    projects.push(getUserProject);
    saveProjects(projects);
}

export function getProjects() {
    return projects;
}

export function addTodoToProject(projectId, title, description, dueDate, priority) {
    const project = projects.find(p => p.id === projectId);
    const todo = createTodo(title, description, dueDate, priority);
    project.todos.push(todo);
    saveProjects(projects);
}

export function deleteTodo(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    project.todos = project.todos.filter(todo => todo.id !== todoId);
    saveProjects(projects);
}

export function deleteProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects(projects);
}

init();