# EMI Loan Calculator

[![GitHub](https://img.shields.io/badge/GitHub-Emi--Loan--Calculator-181717?logo=github)](https://github.com/Santosh2061/Emi-Loan-Calculator)
[![Live Demo](https://img.shields.io/badge/Live-Demo-22c55e?logo=vercel)](https://emi-loan-calculator-nine.vercel.app/)
[![API](https://img.shields.io/badge/API-Render-46E3B7?logo=render)](https://emi-loan-calculator-backend-nx2t.onrender.com/docs)

A modern full-stack EMI Loan Calculator built using React, FastAPI, and SQLite.

Calculate monthly EMI, total interest, and total payment for any loan. Every calculation is saved to a SQLite database with full history management and aggregate statistics.

---

## Features

- Calculate Monthly EMI
- Calculate Total Interest
- Calculate Total Payment
- Save Calculation History
- Delete History
- Statistics Dashboard
- Responsive UI
- Fast API Backend
- SQLite Database

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- SQLite

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | https://emi-loan-calculator-nine.vercel.app/ |
| **Backend** | https://emi-loan-calculator-backend-nx2t.onrender.com |
| **API Documentation** | https://emi-loan-calculator-backend-nx2t.onrender.com/docs |

---

## Project Structure

```
Emi-Loan-Calculator/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py          # Environment configuration
│   │   ├── crud.py            # Database CRUD operations
│   │   ├── database.py        # SQLAlchemy engine and session
│   │   ├── main.py            # FastAPI routes and middleware
│   │   ├── models.py          # ORM models
│   │   ├── schemas.py         # Pydantic request/response schemas
│   │   └── utils.py           # EMI calculation logic
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── EMIForm.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── HistoryTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── StatisticsCard.jsx
│   │   ├── hooks/
│   │   │   └── useAsyncData.js
│   │   ├── pages/
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Statistics.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── formatters.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── LICENSE
├── PROJECT_HEALTH_REPORT.md
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Santosh2061/Emi-Loan-Calculator.git
cd Emi-Loan-Calculator
```

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm

### Backend Setup

```bash
cd backend
python -m venv venv
```

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
cp .env.example .env
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

---

## Running the Project

### Backend

From the `backend/` directory:

```bash
uvicorn app.main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend

From the `frontend/` directory:

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/calculate` | Calculate EMI and save to history |
| `GET` | `/history` | Get all calculation records |
| `DELETE` | `/history/{id}` | Delete a record by ID |
| `GET` | `/statistics` | Get aggregate statistics |

### Example Request

```http
POST /calculate
Content-Type: application/json

{
  "principal": 500000,
  "interest_rate": 8.5,
  "years": 20
}
```

### Example Response

```json
{
  "id": 1,
  "principal": 500000.0,
  "interest_rate": 8.5,
  "years": 20,
  "emi": 4339.12,
  "total_interest": 541387.88,
  "total_payment": 1041387.88,
  "created_at": "2026-06-29T17:27:40.355426"
}
```

---

## Database

Single table `emi_history`:

| Column | Type | Description |
|--------|------|-------------|
| `id` | Integer | Primary key |
| `principal` | Float | Loan amount |
| `interest_rate` | Float | Annual interest rate (%) |
| `years` | Integer | Loan duration in years |
| `emi` | Float | Monthly EMI |
| `total_interest` | Float | Total interest paid |
| `total_payment` | Float | Principal + total interest |
| `created_at` | DateTime | Record timestamp |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./emi.db` | Database connection string |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Comma-separated allowed origins |
| `APP_TITLE` | `EMI Loan Calculator` | API title |
| `DOCS_ENABLED` | `true` | Enable Swagger UI at `/docs` |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API base URL |

---

## Future Improvements

- PDF Export
- Loan Comparison
- Authentication
- PostgreSQL Support
- Dark Mode
- Charts & Analytics
- Amortization Schedule
- Pagination for History
- Docker Containerization
- Automated Test Suite

---

## Developer

**Santosh Sah**

- GitHub: https://github.com/Santosh2061
- Repository: https://github.com/Santosh2061/Emi-Loan-Calculator

---

## License

This project is licensed under the [MIT License](LICENSE).
