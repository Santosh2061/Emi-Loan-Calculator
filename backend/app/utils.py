def calculate_emi(principal: float, interest_rate: float, years: int) -> dict:
    """
    Calculate EMI using the standard formula:
    EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    where r = monthly interest rate, n = total months
    """
    monthly_rate = interest_rate / 12 / 100
    total_months = years * 12

    if monthly_rate == 0:
        emi = principal / total_months
    else:
        factor = (1 + monthly_rate) ** total_months
        emi = principal * monthly_rate * factor / (factor - 1)

    total_payment = emi * total_months
    total_interest = total_payment - principal

    return {
        "emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_payment, 2),
    }
