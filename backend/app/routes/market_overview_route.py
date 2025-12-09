from flask import Blueprint, jsonify
from app.services.market_overview_service import MarketOverviewService

market_bp = Blueprint("market", __name__)

@market_bp.get("/market/overview")
def get_market_overview():
    data = MarketOverviewService.get_market_snapshot()
    return jsonify(data)