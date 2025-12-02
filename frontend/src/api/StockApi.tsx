import type { StockData, DailyCandle } from "../types/stockTypes";

export async function fetchStock(symbol: string): Promise<StockData | { error: string }> {
    try {
        const res = await fetch(`/api/stock/${symbol}`);
        const json = await res.json();

        if (json.error) {
            return { error: json.error };
        }

        return json as StockData;
    } catch {
        return { error: "서버 요청 실패" };
    }
}

export async function fetchStockDaily(symbol: string): Promise<{ symbol: string; count: number; daily: DailyCandle[] } | { error: string }> {
    try {
        const res = await fetch(`/api/stock/daily/${symbol}`);
        const json = await res.json();
        
        if (json.error) {
        return { error: json.error };
    }
    return json;
    
    } catch {
        return { error: "서버 요청 실패" };
    }
}