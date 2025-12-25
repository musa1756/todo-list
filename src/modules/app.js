// Main application logic

import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

let projects = [];

function init() {
    const defaultProject = createProject(`Inbox`);
    projects.push(defaultProject);
}

export function addProject(name) {
    const getUserProject = createProject(name);
    projects.push(getUserProject);
}

export function getProjects() {
    return projects;
}

export function addTodoToProject(projectId, title, description, dueDate, priority) {
    const project = projects.find(p => p.id === projectId);
    const todo = createTodo(title, description, dueDate, priority);
    project.todos.push(todo);
}

export function deleteTodo(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    project.todos = project.todos.filter(todo => todo.id !== todoId);
}

export function deleteProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);
}

init();