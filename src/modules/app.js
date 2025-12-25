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
