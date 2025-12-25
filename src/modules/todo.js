// Factory function for creating Todo items

export function createTodo(title, description, dueDate, priority, completed = false) {

    const unicId = crypto.randomUUID();

    return {
        id: unicId,
        title,
        description,
        dueDate,
        priority,
        completed,
    }
}