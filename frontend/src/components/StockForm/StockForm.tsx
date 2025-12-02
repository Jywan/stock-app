import { useState } from 'react';
import "./StockForm.css";

interface Props {
    onSearch: (symbol: string) => void;
}

function StockForm({ onSearch }: Props) {
    const [symbol, setSymbol] = useState("");

    return (
        <div className='stock-form'>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="주식 심볼 입력 (예: AAPL)"
            />
            <button onClick={() => onSearch(symbol)}>검색</button>
        </div>
    );
}

export default StockForm;