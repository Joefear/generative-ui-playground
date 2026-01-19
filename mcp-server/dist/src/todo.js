/**
 * Todo list data layer for the UI Protocols Demo.
 * Simple CRUD operations for todo items.
 */
// In-memory storage for todo lists
const todoLists = new Map();
function generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
/**
 * Create a new todo list.
 */
export function createTodoList(name = "My Tasks") {
    const id = generateId("list");
    const list = {
        id,
        name,
        items: [],
        createdAt: new Date().toISOString(),
    };
    todoLists.set(id, list);
    return list;
}
/**
 * Get todo list by ID.
 */
export function getTodoList(listId) {
    return todoLists.get(listId);
}
/**
 * Add a new item to a todo list.
 */
export function addTodoItem(listId, item) {
    const list = todoLists.get(listId);
    if (!list) {
        return { success: false, message: "Todo list not found" };
    }
    const newItem = {
        id: generateId("todo"),
        title: item.title,
        description: item.description,
        priority: item.priority || "medium",
        status: "pending",
        dueDate: item.dueDate,
        tags: item.tags || [],
        createdAt: new Date().toISOString(),
    };
    list.items.push(newItem);
    return {
        success: true,
        message: `Added "${item.title}" to ${list.name}`,
        list,
        item: newItem,
    };
}
/**
 * Update an existing todo item.
 */
export function updateTodoItem(listId, itemId, updates) {
    const list = todoLists.get(listId);
    if (!list) {
        return { success: false, message: "Todo list not found" };
    }
    const itemIndex = list.items.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
        return { success: false, message: "Todo item not found" };
    }
    // Handle completion timestamp
    if (updates.status === "completed" && list.items[itemIndex].status !== "completed") {
        updates.completedAt = new Date().toISOString();
    }
    else if (updates.status && updates.status !== "completed") {
        updates.completedAt = undefined;
    }
    list.items[itemIndex] = { ...list.items[itemIndex], ...updates };
    return {
        success: true,
        message: `Updated "${list.items[itemIndex].title}"`,
        list,
        item: list.items[itemIndex],
    };
}
/**
 * Mark a todo item as complete.
 */
export function completeTodoItem(listId, itemId) {
    return updateTodoItem(listId, itemId, { status: "completed" });
}
/**
 * Mark a todo item as incomplete (reopen).
 */
export function reopenTodoItem(listId, itemId) {
    return updateTodoItem(listId, itemId, { status: "pending" });
}
/**
 * Delete a todo item.
 */
export function deleteTodoItem(listId, itemId) {
    const list = todoLists.get(listId);
    if (!list) {
        return { success: false, message: "Todo list not found" };
    }
    const itemIndex = list.items.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
        return { success: false, message: "Todo item not found" };
    }
    const [deleted] = list.items.splice(itemIndex, 1);
    return {
        success: true,
        message: `Deleted "${deleted.title}"`,
        list,
        item: deleted,
    };
}
/**
 * Get items filtered by status.
 */
export function getItemsByStatus(listId, status) {
    const list = todoLists.get(listId);
    if (!list)
        return [];
    return list.items.filter((item) => item.status === status);
}
/**
 * Get items filtered by priority.
 */
export function getItemsByPriority(listId, priority) {
    const list = todoLists.get(listId);
    if (!list)
        return [];
    return list.items.filter((item) => item.priority === priority);
}
/**
 * Get items filtered by tag.
 */
export function getItemsByTag(listId, tag) {
    const list = todoLists.get(listId);
    if (!list)
        return [];
    return list.items.filter((item) => item.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}
/**
 * Get overdue items.
 */
export function getOverdueItems(listId) {
    const list = todoLists.get(listId);
    if (!list)
        return [];
    const now = new Date();
    return list.items.filter((item) => {
        if (item.status === "completed" || !item.dueDate)
            return false;
        return new Date(item.dueDate) < now;
    });
}
/**
 * Reorder items in the list.
 */
export function reorderItems(listId, itemId, newPosition) {
    const list = todoLists.get(listId);
    if (!list) {
        return { success: false, message: "Todo list not found" };
    }
    const currentIndex = list.items.findIndex((i) => i.id === itemId);
    if (currentIndex === -1) {
        return { success: false, message: "Todo item not found" };
    }
    const [item] = list.items.splice(currentIndex, 1);
    const targetIndex = Math.max(0, Math.min(newPosition, list.items.length));
    list.items.splice(targetIndex, 0, item);
    return {
        success: true,
        message: `Moved "${item.title}" to position ${targetIndex + 1}`,
        list,
        item,
    };
}
/**
 * Clear all completed items.
 */
export function clearCompleted(listId) {
    const list = todoLists.get(listId);
    if (!list) {
        return { success: false, message: "Todo list not found" };
    }
    const completedCount = list.items.filter((i) => i.status === "completed").length;
    list.items = list.items.filter((i) => i.status !== "completed");
    return {
        success: true,
        message: `Cleared ${completedCount} completed item(s)`,
        list,
    };
}
/**
 * Get list statistics.
 */
export function getListStats(listId) {
    const list = todoLists.get(listId);
    if (!list)
        return undefined;
    const now = new Date();
    const overdue = list.items.filter((item) => {
        if (item.status === "completed" || !item.dueDate)
            return false;
        return new Date(item.dueDate) < now;
    }).length;
    return {
        total: list.items.length,
        pending: list.items.filter((i) => i.status === "pending").length,
        inProgress: list.items.filter((i) => i.status === "in_progress").length,
        completed: list.items.filter((i) => i.status === "completed").length,
        overdue,
    };
}
