import { parseAmount } from './formatters';

const MAX_PRINCIPAL = 1_000_000_000_000;
const MAX_YEARS = 50;

export const validateLoanForm = ({ principal, interest_rate, years }) => {
  const errors = {};

  const principalStr = String(principal).trim();
  const interestStr = String(interest_rate).trim();
  const yearsStr = String(years).trim();

  if (!principalStr) {
    errors.principal = 'Loan amount is required.';
  } else {
    const amount = parseAmount(principalStr);
    if (Number.isNaN(amount) || amount <= 0) {
      errors.principal = 'Loan amount must be greater than zero.';
    } else if (amount > MAX_PRINCIPAL) {
      errors.principal = 'Loan amount is too large.';
    }
  }

  if (!interestStr) {
    errors.interest_rate = 'Interest rate is required.';
  } else {
    const rate = Number(interestStr);
    if (Number.isNaN(rate)) {
      errors.interest_rate = 'Interest rate must be a valid number.';
    } else if (rate <= 0) {
      errors.interest_rate = 'Interest rate must be greater than zero.';
    } else if (rate > 100) {
      errors.interest_rate = 'Interest rate cannot exceed 100%.';
    }
  }

  if (!yearsStr) {
    errors.years = 'Loan duration is required.';
  } else if (!/^\d+$/.test(yearsStr)) {
    errors.years = 'Loan duration must be a positive whole number.';
  } else {
    const duration = parseInt(yearsStr, 10);
    if (duration <= 0) {
      errors.years = 'Loan duration must be a positive whole number.';
    } else if (duration > MAX_YEARS) {
      errors.years = `Loan duration cannot exceed ${MAX_YEARS} years.`;
    }
  }

  return errors;
};

export const toApiPayload = ({ principal, interest_rate, years }) => ({
  principal: parseAmount(String(principal)),
  interest_rate: Number(String(interest_rate)),
  years: parseInt(String(years), 10),
});
