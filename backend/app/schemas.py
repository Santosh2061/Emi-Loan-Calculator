from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class EMIRequest(BaseModel):
    principal: float = Field(
        ...,
        gt=0,
        le=1_000_000_000_000,
        description="Loan amount must be greater than zero",
    )
    interest_rate: float = Field(
        ...,
        gt=0,
        le=100,
        description="Annual interest rate must be greater than 0 and at most 100",
    )
    years: int = Field(
        ...,
        gt=0,
        le=50,
        description="Loan duration must be a positive whole number up to 50 years",
    )

    @field_validator("principal")
    @classmethod
    def validate_principal(cls, value: float) -> float:
        if value <= 0:
            raise ValueError("Loan amount must be greater than zero")
        return value

    @field_validator("interest_rate")
    @classmethod
    def validate_interest_rate(cls, value: float) -> float:
        if value <= 0:
            raise ValueError("Interest rate must be greater than zero")
        if value > 100:
            raise ValueError("Interest rate cannot exceed 100%")
        return value

    @field_validator("years")
    @classmethod
    def validate_years(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("Loan duration must be a positive whole number")
        if isinstance(value, float) and not value.is_integer():
            raise ValueError("Loan duration must be a whole number")
        return value


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
