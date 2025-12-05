import {Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend} from "chart.js";
import { Line } from "react-chartjs-2";
import type { DailyCandle } from "../../types/StockTypes";
import type { ChartData } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface Props {
    symbol: string;
    data: DailyCandle[];
    sma5?: (number | null)[];
    sma20?: (number | null)[];
    sma60?: (number | null)[];
    ema5?: (number | null)[];
    ema20?: (number | null)[];
    ema60?: (number | null)[];
    darkMode?: boolean;
}

function StockChart({ symbol, data, sma5, sma20, sma60, ema5, ema20, ema60, darkMode = true}: Props) {
    const labels = data.map((d) => d.date);
    const prices = data.map((d) => d.close);
    
    const baseDataset = {
        label: `${symbol} 종가`,
        data: prices,
        borderColor: darkMode ? "#3b82f6" : "#2563eb",
        backGroundColor: darkMode ? "rgba(59,130,246,0.15)" : "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.25, // 곡선정도
        pointRadius: 2.5,
        pointHoverRadius: 5,
    }
    
    const datasets: ChartData<"line">["datasets"] = [baseDataset]; 
    
    if (sma5) {
        datasets.push({
            label: "SMA5",
            data: sma5,
            borderColor: "#ef4444",
            borderWidth: 1.2,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true
        });
    }

    if (sma20) {
        datasets.push({
            label: "SMA20",
            data: sma20,
            borderColor: "#10b981",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true,
        });
    }

    if (sma60) {
        datasets.push({
            label: "SMA60",
            data: sma60,
            borderColor: "#fbbf24",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true,
        });
    }

    if (ema5) {
        datasets.push({
            label: "EMA5",
            data: ema5,
            borderColor: "#f97316",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true,
        })
    }

    if (ema20) {
        datasets.push({
            label: "EMA20",
            data: ema20,
            borderColor: "#8b5cf6",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true,
        })
    }

    if (ema60) {
        datasets.push({
            label: "EMA60",
            data: ema60,
            borderColor: "#06b6d4",
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.2,
            spanGaps: true,
        })
    }

    const chartData: ChartData<"line"> = {
        labels,
        datasets,
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