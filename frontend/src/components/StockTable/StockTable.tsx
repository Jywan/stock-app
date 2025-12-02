import type { StockData } from "../../types/StockTypes";
import './StockTable.css';

interface Props {
    data: StockData;
}

function StockTable({ data }: Props) {
    return (
        <table className="stock-table">
            <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td className="stock-table-key">{key}</td>
                        <td className="stock-table-value">{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default StockTable;