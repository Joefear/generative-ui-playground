/**
 * Calculator data layer for the UI Protocols Demo.
 * Simple expression evaluation and history tracking.
 */
export interface CalculatorState {
    id: string;
    display: string;
    expression: string;
    history: CalculatorEntry[];
    memory: number;
    createdAt: string;
}
export interface CalculatorEntry {
    expression: string;
    result: string;
    timestamp: string;
}
export interface CalculatorResult {
    success: boolean;
    message: string;
    state?: CalculatorState;
    result?: string;
}
/**
 * Create a new calculator session.
 */
export declare function createCalculator(): CalculatorState;
/**
 * Get calculator state by ID.
 */
export declare function getCalculator(calculatorId: string): CalculatorState | undefined;
/**
 * Input a character or operation to the calculator.
 */
export declare function inputCalculator(calculatorId: string, input: string): CalculatorResult;
/**
 * Evaluate a full expression directly.
 */
export declare function evaluateExpression(calculatorId: string, expression: string): CalculatorResult;
/**
 * Get calculation history.
 */
export declare function getHistory(calculatorId: string): CalculatorEntry[];
/**
 * Clear calculation history.
 */
export declare function clearHistory(calculatorId: string): CalculatorResult;
