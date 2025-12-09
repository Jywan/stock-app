from flask import Blueprint, jsonify
from ..services.exchange_rate_service import ExchangeRateService

exchange_bp = Blueprint("exchange", __name__)

@exchange_bp.get("/exchange/latest")
def get_latest_exchange():
    """10분마다 스케쥴러 캐시가 갱신"""
    data = ExchangeRateService.get_cached_rates(auto_fetch=True)
    return jsonify(data)