/**
 * MCP Server source modules for UI Protocols Demo.
 * Re-exports all data layer modules.
 */
// Flight booking
export * from "./flights.js";
// Hotel booking
export * from "./hotels.js";
// Stock trading simulator
export * from "./stocks.js";
// Kanban board (rename Priority to avoid conflict with todo)
export { createBoard, getBoard, addCard, updateCard, moveCard, deleteCard, } from "./kanban.js";
// Calculator
export * from "./calculator.js";
// Todo list (rename Priority to avoid conflict with kanban)
export { createTodoList, getTodoList, addTodoItem, updateTodoItem, completeTodoItem, reopenTodoItem, deleteTodoItem, getItemsByStatus, getItemsByPriority, getItemsByTag, getOverdueItems, reorderItems, clearCompleted, getListStats, } from "./todo.js";
