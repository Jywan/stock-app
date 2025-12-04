import type { StockData, DailyCandle, NewsArticle } from "../types/StockTypes";

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

export type Timeframe = "DAILY" | "WEEKLY" | "MONTHLY";

export async function fetchStockSeries(symbol: string, timeframe: Timeframe): Promise<{ symbol: string; count: number; daily: DailyCandle[] } | { error: string }> {

    const path = 
        timeframe === "DAILY"
        ? "daily"
        : timeframe === "WEEKLY"
        ? "weekly"
        : "monthly";

    try { 
        const res = await fetch(`/api/stock/${path}/${symbol}`);
        const json = await res.json();

        if (json.error) {
            return { error : json.error };
        }
        return json;
    } catch {
        return { error: "서버 요청 실패" };
    }
}

export async function fetchStockNews(symbol: string): Promise<{ symbol: string, count: number, articles: NewsArticle[] } | { error: string }> {
    try {
        const res = await fetch(`/api/stock/news/${symbol}`);
        const json = await res.json();

        if (json.error) {
            return { error: json.error };
        }
        return json;
    } catch {
        return { error: "서버 요청 실패" };
    }
}