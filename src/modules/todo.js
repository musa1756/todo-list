// Factory function for creating Todo items

export function createTodo(title, description, dueDate, priority, completed) {

    const unicId = crypto.randomUUID();

    return {
        id: unicId,
        title,
        description,
        dueDate,
        priority,
        completed: completed || false,
    }
}