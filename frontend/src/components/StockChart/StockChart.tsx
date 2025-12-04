import {Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, plugins} from "chart.js"
import { Line } from "react-chartjs-2"
import type { DailyCandle } from "../../types/StockTypes"
ChartJS.register(
    LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, plugins
);

interface Props {
    symbol: string;
    data: DailyCandle[];
    darkMode?: boolean;
}

function StockChart({ symbol, data, darkMode = true}: Props) {
    const labels = data.map((d) => d.date);
    const prices = data.map((d) => d.close);

    const chartData = {
        labels,
        datasets : [
            {
                label: `${symbol} 종가`,
                data: prices,
                borderColor: darkMode ? "#3b82f6" : "#2563eb",
                backGroundColor: darkMode ? "rgba(59,130,246,0.15)" : "rgba(37,99,235,0.2)",
                fill: true,
                tension: 0.25, // 곡선정도
                pointRadius: 2.5,
                pointHoverRadius: 5,
            },
        ],
    };

    const textColor = darkMode ? "#e5e7eb" : "#111827";
    const gridColor = darkMode ? "rgba(75,85,99,0.6)" : "rgba(209,213,219,0.8)";

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: "easeOutQuart" as const,
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor
                },
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        const value = ctx.parsed.y;
                        return `종가: ${value.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                    maxTickLimit:8,
                },
                grid: {
                    color: gridColor
                },
            },
            y: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: gridColor
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: 320}}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default StockChart;