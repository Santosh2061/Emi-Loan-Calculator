from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Path, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from . import crud, schemas, utils
from .config import APP_TITLE, CORS_ORIGINS, DOCS_ENABLED
from .database import Base, engine, get_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title=APP_TITLE,
    lifespan=lifespan,
    docs_url="/docs" if DOCS_ENABLED else None,
    redoc_url="/redoc" if DOCS_ENABLED else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
):
    messages = []
    for error in exc.errors():
        field = error.get("loc", ["value"])[-1]
        message = error.get("msg", "Invalid value")
        if message.startswith("Value error, "):
            message = message.replace("Value error, ", "")
        if field == "body":
            messages.append(message)
        else:
            messages.append(f"{message}")
    return JSONResponse(
        status_code=422,
        content={"detail": messages[0] if len(messages) == 1 else "; ".join(messages)},
    )


@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={"detail": "A database error occurred. Please try again."},
    )


@app.get("/health", response_model=schemas.HealthResponse)
def health_check():
    return schemas.HealthResponse(status="ok")


@app.post("/calculate", response_model=schemas.EMIResponse)
def calculate_emi(request: schemas.EMIRequest, db: Session = Depends(get_db)):
    result = utils.calculate_emi(
        request.principal, request.interest_rate, request.years
    )
    return crud.create_calculation(db, request, result)


@app.get("/history", response_model=list[schemas.EMIResponse])
def get_history(db: Session = Depends(get_db)):
    return crud.get_all_history(db)


@app.delete("/history/{record_id}", response_model=schemas.DeleteResponse)
def delete_history(
    record_id: int = Path(..., gt=0),
    db: Session = Depends(get_db),
):
    deleted = crud.delete_calculation(db, record_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Record not found")
    return schemas.DeleteResponse(message="Record deleted successfully")


@app.get("/statistics", response_model=schemas.StatisticsResponse)
def get_statistics(db: Session = Depends(get_db)):
    return crud.get_statistics(db)
