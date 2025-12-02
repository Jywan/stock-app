from flask import jsonify
from .api_error import ApiError

def register_error_handlers(app):

    # 커스텀 예외 처리
    @app.errorhandler(ApiError)
    def handle_api_error(e: ApiError):
        response = jsonify(e.to_dict())
        response.status_code = e.status_code
        return response
    
    # Flask 예상치 못한 예외 처리
    @app.errorhandler(Exception)
    def handle_general_error(e):
        print(f"[!] 서버 에러 발생: {e}")
        response = jsonify({
            "error": "서버 내부 오류",
            "details": str(e)
        })
        response.status_code = 500
        return response