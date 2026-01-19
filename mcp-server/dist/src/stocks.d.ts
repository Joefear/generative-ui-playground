/**
 * Stock trading/investment simulator data layer for the UI Protocols Demo.
 * Contains mock stock data, portfolio management, and trade execution.
 */
export type Sector = "technology" | "healthcare" | "finance" | "consumer" | "energy" | "industrial";
export type TradeType = "buy" | "sell";
export interface Stock {
    symbol: string;
    name: string;
    sector: Sector;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: string;
}
export interface Holding {
    symbol: string;
    name: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    value: number;
    gain: number;
    gainPercent: number;
}
export interface Portfolio {
    id: string;
    name: string;
    cashBalance: number;
    holdings: Holding[];
    totalValue: number;
    totalGain: number;
    totalGainPercent: number;
    createdAt: string;
}
export interface Trade {
    id: string;
    portfolioId: string;
    type: TradeType;
    symbol: string;
    shares: number;
    price: number;
    total: number;
    timestamp: string;
}
export interface TradeResult {
    success: boolean;
    message: string;
    trade?: Trade;
    portfolio?: Portfolio;
}
export declare const portfolios: Map<string, Portfolio>;
export declare const trades: Map<string, Trade[]>;
export declare function getStocks(): Stock[];
export declare function getStock(symbol: string): Stock | undefined;
export declare function getStocksBySector(sector: Sector): Stock[];
export declare function createPortfolio(params: {
    name?: string;
    initialBalance: number;
    riskTolerance?: "conservative" | "moderate" | "aggressive";
    focus?: Sector;
}): Portfolio;
export declare function getPortfolio(portfolioId: string): Portfolio | undefined;
export declare function executeTrade(portfolioId: string, type: TradeType, symbol: string, shares: number): TradeResult;
export declare function getTradeHistory(portfolioId: string): Trade[];
export declare function refreshPrices(portfolioId: string): Portfolio | undefined;
