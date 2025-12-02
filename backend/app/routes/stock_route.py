from flask import Blueprint, jsonify
from ..services.alphavantage_service import AlphaVantageService

stock_bp = Blueprint('stock', __name__)

@stock_bp.get("/stock/<symbol>")
def get_stock(symbol: str):
    data, _ = AlphaVantageService.global_quote(symbol)
    quote = data.get("Global Quote", {})

    return jsonify({
        "symbol": quote.get("01. symbol", ""),
        "open": quote.get("02. open", ""),
        "high": quote.get("03. high", ""),
        "low": quote.get("04. low", ""),
        "price": quote.get("05. price", ""),
        "volume": quote.get("06. volume", ""),
        "latest_trading_day": quote.get("07. latest trading day", ""),
        "previous_close": quote.get("08. previous close", ""),
        "change": quote.get("09. change", ""),
        "change_percent": quote.get("10. change percent", ""),
    })

@stock_bp.get("/stock/daily/<symbol>")
def get_daily_stock(symbol: str):
    data, _ = AlphaVantageService.daily_price(symbol)

    ts = data["Time Series (Daily)"]
    rows = []

    for date_str in sorted(ts.keys()):
        candle = ts[date_str]
        rows.append({
            "date": date_str,
            "open": float(candle["1. open"]),
            "high": float(candle["2. high"]),
            "low": float(candle["3. low"]),
            "close": float(candle["4. close"]),
            "volume": int(candle["5. volume"]),
        })

    return jsonify({
        "symbol": symbol,
        "count": len(rows),
        "daily": rows
    })
