import type { StockData } from "../../types/StockTypes";
import StockTable from "../StockTable/StockTable"

interface Props {
    loading: boolean;
    error: string | null;
    data: StockData | null;
}

function RealtimeQuotePanel({ loading, error, data }: Props) {
    return (
        <div className="panel">
            <h2 className="panel-title">실시간 시세</h2>
                {loading && <p>로딩 중...</p>}
                {error && <p className="error-text">에러: {error}</p>}
                {data && (
                    <div className="fade-in" key={data.symbol}>
                        <StockTable data={data}/>
                    </div>
                )}
                {!loading && !error && !data && (
                    <p className="placeholder-text">
                        좌측에서 종목을 검색하면 이 영역에 시세가 표시됩니다.
                    </p>
                )}
        </div>
    )
}

export default RealtimeQuotePanel;