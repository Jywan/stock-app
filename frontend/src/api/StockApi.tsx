import type { StockData } from "../types/StockTypes";

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
