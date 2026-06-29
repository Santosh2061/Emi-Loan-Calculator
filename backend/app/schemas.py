from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class EMIRequest(BaseModel):
    principal: float = Field(
        ...,
        gt=0,
        le=1_000_000_000_000,
        description="Loan amount must be positive",
    )
    interest_rate: float = Field(
        ...,
        gt=0,
        le=100,
        description="Annual interest rate (greater than 0, up to 100%)",
    )
    years: int = Field(..., gt=0, le=50, description="Loan duration in years (1-50)")


class EMIResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    principal: float
    interest_rate: float
    years: int
    emi: float
    total_interest: float
    total_payment: float
    created_at: datetime


class StatisticsResponse(BaseModel):
    total_calculations: int
    average_emi: float
    highest_loan: float
    lowest_loan: float
    average_interest: float


class DeleteResponse(BaseModel):
    message: str


class HealthResponse(BaseModel):
    status: str
