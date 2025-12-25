// Factory function for creating Project 

export function createProject(name) {

    const id = crypto.randomUUID();
    let todos = [];

    return {
        id,
        name,
        todos,
    }
}