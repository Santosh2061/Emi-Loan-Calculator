from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Float, Index, Integer

from .database import Base


class EMIHistory(Base):
    __tablename__ = "emi_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    principal = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    years = Column(Integer, nullable=False)
    emi = Column(Float, nullable=False)
    total_interest = Column(Float, nullable=False)
    total_payment = Column(Float, nullable=False)
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    __table_args__ = (Index("ix_emi_history_created_at", "created_at"),)
