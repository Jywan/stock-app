import type { StockData, DailyCandle, NewsArticle } from "../types/StockTypes";
import type { ExchangeData } from "../types/ExchangeType";
import type { MarketOverviewResponse } from "../types/MarketType";

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

export async function fetchExchangeRates() {
    const resp = await fetch("/api/exchange/latest")
    if (!resp.ok) {
        throw new Error("환율 API 오류")
    }
    const json = await resp.json();
    
    const data: ExchangeData = {
        base: json.base,
        rates: {
            KRW: json.rates?.KRW,
            EUR: json.rates?.EUR,
            JPY: json.rates?.JPY,
            CNY: json.rates?.CNY,
        },
    };

    return data;
}

export async function fetchMarketOverview(): Promise<MarketOverviewResponse | { error: string }> {
    
    try {
        const res = await fetch("/api/market/overview");
        if (!res.ok) {
            const body = await res.json().catch(() => null)
            const msg = body?.error || `HTTP ${res.status}`
            throw new Error(msg);
        }

        const data = (await res.json()) as MarketOverviewResponse;
        return data
    } catch (e:any) {
        return { error: e.massage ?? "시장 요약조회 실패" }
    }
}