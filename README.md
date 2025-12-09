# STOCK-APP

이 프로젝트는 Python 기반 backend와 TypeScript 기반 frontend로 구성된 주식 정보 조회 프로젝트입니다.

## Structure
- `backend/` : Python backend
- `frontend/` : TypeScript + Vite frontend

## Backend
- Python 3.9.6
- Flask 

## Frontend
- TypeScript
- Vite
- Node.js v22.16.0

## 실행 방법
- # Backend
- 1. cd backend
- 2. source .venv/bin/activate
- 3. python run.py

- # Frontend
- 1. cd frontend
- 2. npm install
- 3. npm run dev

## 사용 API
- 알파밴티지 (Alpha Vantage) 무료버전 - 심볼로 주식데이터 출력
- exchangerate - 환율정보 API + 스케쥴러 

## Environment Variables
`.env` 파일은 Git에 포함되지 않습니다.
backend/.env 파일은 직접 로컬에서 관리하십시오.