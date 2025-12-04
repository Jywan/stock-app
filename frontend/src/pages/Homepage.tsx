import { useState } from "react";
import { fetchStock, fetchStockSeries } from "../api/StockApi";
import type { StockData, DailyCandle } from "../types/StockTypes";
import type { Timeframe } from "../api/StockApi";
import StockForm from "../components/StockForm/StockForm";
import RealtimeQuotePanel from "../components/RealtimeQuotePanel/RealtimeQuotePanel"
import StockChart from "../components/StockChart/StockChart";
import "./Hompage.css";  

function HomePage() {
    const [data, setData] = useState<StockData | null>(null);
    const [daily, setDaily] = useState<DailyCandle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [timeframe, setTimeframe] = useState<Timeframe>("DAILY");

    const handleSearch = async (symbol: string) => {
        
        setLoading(true);
        setError(null);

        const result = await fetchStock(symbol);
        if ("error" in result) {
            setError(result.error);
            setData(null);
            setDaily([]);
            setLoading(false);
            return;
        } else {
            setData(result);
        }
        
        const seriesRes = await fetchStockSeries(symbol, timeframe);
        if ("error" in seriesRes) {
            setError(seriesRes.error);
            setDaily([]);
            setLoading(false);
            return;
        } else {
            setDaily(seriesRes.daily);  
        }

        setLoading(false);
    };

    // TimeFrame 버튼 클릭시 상태변경, 이미 심볼이 존재하면 차트 재조회
    const handleTimeframeChange = async (next: Timeframe) => {
        setTimeframe(next);
        // 아직 종목 조회 전이면 API 조회 불필요        
        if (!data) return;
        
        setLoading(true);
        setError(null);

        const seriesRes = await fetchStockSeries(data.symbol, next);
        if ("error" in seriesRes) {
            setError(seriesRes.error);
            setDaily([]);
            setLoading(false);
            return;
        }
        setDaily(seriesRes.daily);
        setLoading(false);
    }

    return (
        <div className="page-root">
            <header className="page-header">
                <h1>주식 조회 서비스</h1>
                <p className="page-subtitle">좌측은 종목검색, 중앙은 시세·그래프, 우측은 뉴스(추후 추가) 영역입니다.</p>
            </header>

            <div className="page-content">
                {/* 좌측: 검색/옵션 */}
                <section className="page-left panel">
                    <h2 className="panel-title">종목 검색</h2>
                    <StockForm onSearch={handleSearch} />

                    <h3 className="panel-subtitle" style={{ marginTop: 20 }}>옵션 (추후 추가)</h3>
                    <ul className="option-list">
                        <li>기간 선택</li>
                        <li>일/주/월 봉 선택</li>
                        <li>지표 추가 (추후)</li>
                    </ul>
                </section>

                {/* 중앙: 시세 + 차트 */}
                <section className="page-center">
                    <RealtimeQuotePanel loading={loading} error={error} data={data} />

                    <div className="panel" style={{ marginTop: 16 }}>
                        <div className="panel-header-row">
                            <h2 className="panel-title">차트</h2>
                            <div className={`timeframe-toggle timeframe-${timeframe.toLowerCase()}`}>
                                <div className="timeframe-indicator" />

                                <button
                                    className={`tf-btn ${timeframe === "DAILY" ? "active" : ""}`}
                                    onClick={() => handleTimeframeChange("DAILY")}
                                >
                                    일간
                                </button>
                                <button
                                    className={`tf-btn ${timeframe === "WEEKLY" ? "active" : ""}`}
                                    onClick={() => handleTimeframeChange("WEEKLY")}
                                >
                                    주간
                                </button>
                                <button
                                    className={`tf-btn ${timeframe === "MONTHLY" ? "active" : ""}`}
                                    onClick={() => handleTimeframeChange("MONTHLY")}
                                >
                                    월간
                                </button>
                            </div>
                        </div>
                        
                        {daily.length > 0 && data ? (
                            <div className="fade-in" key={`${data.symbol}-${timeframe}`}>
                                <StockChart symbol={data.symbol} data={daily} darkMode={true} />
                            </div>
                        ) : (
                            <div className="chart-placeholder">
                                좌측에서 종목을 검색하면 기간별 차트가 표시됩니다.
                            </div>
                        )}
                    </div>
                </section>

                {/* 우측: 뉴스/리스트(추후) */}
                <section className="page-right panel">
                    <h2 className="panel-title">관련 뉴스 (추후)</h2>
                    <p className="placeholder-text">
                        향후 Finnhub, MarketAux 등의 API를 연동해
                        <br />
                        해당 종목 관련 뉴스 목록을 출력할 예정입니다.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default HomePage;