import { useState } from "react";
import { fetchStock, fetchStockDaily } from "../api/StockApi";
import type { StockData, DailyCandle } from "../types/stockTypes";
import StockForm from "../components/StockForm/StockForm";
import StockTable from "../components/StockTable/StockTable";
import StockChart from "../components/StockChart/StockChart";
import "./Hompage.css";  

function HomePage() {
    const [data, setData] = useState<StockData | null>(null);
    const [daily, setDaily] = useState<DailyCandle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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

        const dailyRes = await fetchStockDaily(symbol);
        if ("error" in dailyRes) {
            setDaily([]);
        } else {
            setDaily(dailyRes.daily);
        }

        setLoading(false);
    };

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
                    <div className="panel">
                        <h2 className="panel-title">실시간 시세</h2>
                        {loading && <p>로딩 중...</p>}
                        {error && <p className="error-text">에러: {error}</p>}
                        {data && <StockTable data={data} />}
                        {!loading && !error && !data && (
                            <p className="placeholder-text">좌측에서 종목을 검색하면 이 영역에 시세가 표시됩니다.</p>
                        )}
                    </div>

                    <div className="panel" style={{ marginTop: 16 }}>
                        <h2 className="panel-title">차트</h2>
                        {daily.length > 0 && data ? (
                            <StockChart symbol={data.symbol} data={daily} darkMode={true} />
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