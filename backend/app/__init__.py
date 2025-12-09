from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes import register_routes
from .utils.error_handlers import register_error_handlers
from apscheduler.schedulers.background import BackgroundScheduler
from .services.exchange_rate_service import ExchangeRateService

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    register_routes(app)
    register_error_handlers(app)

    # --- 환율 스케쥴러: 10분마다 캐시 갱신 ---
    scheduler = BackgroundScheduler(timezone="UTC")

    # 앱 시작 시 한번 호출 + 이후 10분마다 실행
    def update_exchange_job():
        with app.app_context():
            try:
                ExchangeRateService.update_rates()
            except Exception as e:
                app.logger.error(f"[ExchangeRateScheduler] 업데이트 실패: {e}")

    # 최초 실행
    update_exchange_job()

    # 10분 간격으로 job 실행
    scheduler.add_job(update_exchange_job, "interval", minutes=10, id="exchange_update")
    scheduler.start()

    # 종료 시 스케쥴러도 정리
    @app.teardown_appcontext
    def shutdown_scheduler(exception=None):
        if scheduler.running:
            scheduler.shutdown(wait=False)

    return app