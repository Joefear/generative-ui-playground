/**
 * Todo list data layer for the UI Protocols Demo.
 * Simple CRUD operations for todo items.
 */
export type Priority = "low" | "medium" | "high";
export type TodoStatus = "pending" | "in_progress" | "completed";
export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    status: TodoStatus;
    dueDate?: string;
    tags: string[];
    createdAt: string;
    completedAt?: string;
}
export interface TodoList {
    id: string;
    name: string;
    items: TodoItem[];
    createdAt: string;
}
export interface TodoResult {
    success: boolean;
    message: string;
    list?: TodoList;
    item?: TodoItem;
}
/**
 * Create a new todo list.
 */
export declare function createTodoList(name?: string): TodoList;
/**
 * Get todo list by ID.
 */
export declare function getTodoList(listId: string): TodoList | undefined;
/**
 * Add a new item to a todo list.
 */
export declare function addTodoItem(listId: string, item: {
    title: string;
    description?: string;
    priority?: Priority;
    dueDate?: string;
    tags?: string[];
}): TodoResult;
/**
 * Update an existing todo item.
 */
export declare function updateTodoItem(listId: string, itemId: string, updates: Partial<Omit<TodoItem, "id" | "createdAt">>): TodoResult;
/**
 * Mark a todo item as complete.
 */
export declare function completeTodoItem(listId: string, itemId: string): TodoResult;
/**
 * Mark a todo item as incomplete (reopen).
 */
export declare function reopenTodoItem(listId: string, itemId: string): TodoResult;
/**
 * Delete a todo item.
 */
export declare function deleteTodoItem(listId: string, itemId: string): TodoResult;
/**
 * Get items filtered by status.
 */
export declare function getItemsByStatus(listId: string, status: TodoStatus): TodoItem[];
/**
 * Get items filtered by priority.
 */
export declare function getItemsByPriority(listId: string, priority: Priority): TodoItem[];
/**
 * Get items filtered by tag.
 */
export declare function getItemsByTag(listId: string, tag: string): TodoItem[];
/**
 * Get overdue items.
 */
export declare function getOverdueItems(listId: string): TodoItem[];
/**
 * Reorder items in the list.
 */
export declare function reorderItems(listId: string, itemId: string, newPosition: number): TodoResult;
/**
 * Clear all completed items.
 */
export declare function clearCompleted(listId: string): TodoResult;
/**
 * Get list statistics.
 */
export declare function getListStats(listId: string): {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
} | undefined;
