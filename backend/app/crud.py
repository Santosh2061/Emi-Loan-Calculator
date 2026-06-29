from sqlalchemy import func
from sqlalchemy.orm import Session

from . import models, schemas


def create_calculation(
    db: Session, request: schemas.EMIRequest, result: dict
) -> models.EMIHistory:
    db_record = models.EMIHistory(
        principal=request.principal,
        interest_rate=request.interest_rate,
        years=request.years,
        emi=result["emi"],
        total_interest=result["total_interest"],
        total_payment=result["total_payment"],
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def get_all_history(db: Session) -> list[models.EMIHistory]:
    return (
        db.query(models.EMIHistory)
        .order_by(models.EMIHistory.created_at.desc())
        .all()
    )


def delete_calculation(db: Session, record_id: int) -> bool:
    record = db.get(models.EMIHistory, record_id)
    if not record:
        return False
    db.delete(record)
    db.commit()
    return True


def get_statistics(db: Session) -> schemas.StatisticsResponse:
    stats = db.query(
        func.count(models.EMIHistory.id),
        func.avg(models.EMIHistory.emi),
        func.max(models.EMIHistory.principal),
        func.min(models.EMIHistory.principal),
        func.avg(models.EMIHistory.total_interest),
    ).first()

    total, avg_emi, highest, lowest, avg_interest = stats

    return schemas.StatisticsResponse(
        total_calculations=total or 0,
        average_emi=round(avg_emi, 2) if avg_emi else 0.0,
        highest_loan=highest or 0.0,
        lowest_loan=lowest or 0.0,
        average_interest=round(avg_interest, 2) if avg_interest else 0.0,
    )
