// DOM rendering functions

export function renderProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.dataset.id = project.id;

        li.innerHTML = `
         <span class="project-name">${project.name}</span>
         <button class="delete-project-btn" data-id="${project.id}">✕</button>
        `;

        projectsList.appendChild(li);
    });
}

export function renderTodos(todos) {
    const todosList = document.getElementById('todos-list');
    todosList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-title">${todo.title}</span>
            <span class="todo-date">${todo.dueDate}</span>
            <span class="todo-priority ${todo.priority}">${todo.priority}</span>
            <button class="delete-todo-btn" data-id="${todo.id}">✕</button>
        `;

        todosList.appendChild(li);
    });
}