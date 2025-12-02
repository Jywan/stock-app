class ApiError(Exception):
    # 서비스 전면에 사용할 에러 클래스
    def __init__(self, message, status_code=400, details=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.details = details

    def to_dict(self):
        error = {
            "error": self.message
        }
        if self.details:
            error["details"] = self.details
        return error