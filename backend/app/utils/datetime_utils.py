from datetime import datetime
from typing import Optional

def format_alphavantage_time(raw: Optional[str]) -> str:
    """알파밴티지 관련뉴스 API 내 기사등록일자 포맷 유틸"""

    if not raw:
        return ""
    
    try:
        dt = datetime.strptime(raw, "%Y%m%dT%H%M%S")
        return dt.strftime("%Y-%m-%d %H:%M")
    except Exception:
        return raw