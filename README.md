# EMI Loan Calculator

[![GitHub Repository](https://img.shields.io/badge/GitHub-Emi--Loan--Calculator-181717?logo=github)](https://github.com/Santosh2061/Emi-Loan-Calculator)

A full-stack web application for calculating Equated Monthly Installments (EMI) on loans, storing calculation history, and viewing aggregate statistics.

## Description

Enter loan details (amount, interest rate, duration) and instantly compute your monthly EMI, total interest, and total payment. Every calculation is saved to a SQLite database so you can review history, search past records, delete entries, and track statistics over time.

## Features

- EMI calculation using the standard amortization formula
- Input validation on frontend and backend
- Persistent calculation history with search
- Delete individual history records
- Aggregate statistics (total calculations, average EMI, highest/lowest loan, average interest)
- Responsive UI built with Tailwind CSS
- REST API with FastAPI

## Screenshots

> Add screenshots of the Home, History, and Statistics pages here after deployment.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS, Axios, React Router |
| Backend | FastAPI, Uvicorn |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Config | python-dotenv |

## Folder Structure

```
emi-loan-calculator/
├── backend/
│   ├── app/
│   │   ├── config.py       # Environment configuration
│   │   ├── crud.py         # Database operations
│   │   ├── database.py     # SQLAlchemy engine and session
│   │   ├── main.py         # FastAPI routes
│   │   ├── models.py       # ORM models
│   │   ├── schemas.py      # Pydantic schemas
│   │   └── utils.py        # EMI calculation logic
│   ├── .env.example
│   ├── requirements.txt
│   └── emi.db              # Created at runtime
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route pages
│   │   ├── services/       # API client
│   │   └── utils/          # Shared formatters
│   ├── .env.example
│   └── package.json
├── .gitignore
├── LICENSE
├── PROJECT_HEALTH_REPORT.md
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Santosh2061/Emi-Loan-Calculator.git
cd Emi-Loan-Calculator
```

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+

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
cp .env.example .env   # optional — defaults work for local dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # optional — defaults work for local dev
```

## Running the Project

Start the backend (from `backend/`):

```bash
uvicorn app.main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

Start the frontend (from `frontend/`):

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/calculate` | Calculate EMI and save to history |
| GET | `/history` | Get all calculation records |
| DELETE | `/history/{id}` | Delete a record by ID |
| GET | `/statistics` | Get aggregate statistics |

Interactive API docs: `http://127.0.0.1:8000/docs`

### Example Request

```bash
POST /calculate
Content-Type: application/json

{
  "principal": 500000,
  "interest_rate": 8.5,
  "years": 20
}
```

## Database

Single table `emi_history`:

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| principal | Float | Loan amount |
| interest_rate | Float | Annual rate (%) |
| years | Integer | Loan duration |
| emi | Float | Monthly EMI |
| total_interest | Float | Total interest paid |
| total_payment | Float | Principal + interest |
| created_at | DateTime | Timestamp |

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./emi.db` | Database connection string |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Allowed frontend origins |
| `APP_TITLE` | `EMI Loan Calculator` | API title |
| `DOCS_ENABLED` | `true` | Enable Swagger UI |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API URL |

## Future Improvements

- User authentication and per-user history
- Pagination for large history lists
- Export history to CSV/PDF
- Amortization schedule breakdown
- Database migrations with Alembic
- Docker containerization
- Unit and integration tests

## License

This project is licensed under the [MIT License](LICENSE).

## Developer

**Santosh2061**

- GitHub: [Santosh2061/Emi-Loan-Calculator](https://github.com/Santosh2061/Emi-Loan-Calculator)
- Repository: https://github.com/Santosh2061/Emi-Loan-Calculator.git
