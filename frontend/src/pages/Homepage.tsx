import { useState } from "react";
import { fetchStock } from "../api/StockApi";
import type { StockData } from "../types/StockTypes";
import StockForm from "../components/StockForm/StockForm";
import StockTable from "../components/StockTable/StockTable";
import "./Hompage.css";  

function HomePage() {
    const [data, setData] = useState<StockData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (symbol: string) => {
        setLoading(true);
        setError(null);

        const result = await fetchStock(symbol);

        if ("error" in result) {
            setError(result.error);
            setData(null);
        } else {
            setData(result);
        }

        setLoading(false);
    };

    return (
        <div className="page-root">
            <header className="page-header">
                <h1>주식 조회 서비스</h1>
                <p className="page-subtitle">
                    좌측에서 종목검색, 우측은 시세, 그래프 도식 출력
                </p>
            </header>

            <div className="page-content">
                {/* 왼쪽: 검색/필터 영역 */}
                <section className="page-left">
                    <div className="panel">
                        <h2 className="panel-title">종목 검색</h2>
                        {/* 검색 폼 실제 렌더링 */}
                        <StockForm onSearch={handleSearch} />
                    </div>

                    <div className="panel">
                        <h3 className="panel-subtitle">옵션 (추후 추가)</h3>
                        <ul className="option-list">
                            <li>기간 선택</li>
                            <li>일/주/월 봉 선택</li>
                            <li>지표 추가 (추후)</li>
                        </ul>
                    </div>
                </section>

                {/* 오른쪽: 결과 영역 */}
                <section className="page-right">
                    <div className="panel">
                        <h2 className="panel-title">실시간 시세</h2>
                        {loading && <p>로딩 중...</p>}
                        {error && <p className="error-text">에러: {error}</p>}
                        {data && <StockTable data={data} />}
                        {!loading && !error && !data && (
                            <p className="placeholder-text">
                                좌측에서 종목을 검색하면 이 영역에 시세가 표시됩니다.
                            </p>
                        )}
                    </div>

                    <div className="panel">
                        <h2 className="panel-title">차트 (예정)</h2>
                        <div className="chart-placeholder">
                            기간별 데이터를 도식화할 그래프 영역입니다.
                            <br />
                            이후 AlphaVantage DAILY API + 차트 라이브러리(예: Recharts / Chart.js)를 연결하시면 됩니다.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePage;