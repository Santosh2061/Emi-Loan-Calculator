import { useState } from 'react';
import {
  formatAmountWithCommas,
  sanitizeInterestInput,
  sanitizeYearsInput,
} from '../utils/formatters';
import { toApiPayload, validateLoanForm } from '../utils/validation';

function EMIForm({ onCalculate, loading }) {
  const [formData, setFormData] = useState({
    principal: '',
    interest_rate: '',
    years: '',
  });
  const [errors, setErrors] = useState({});

  const clearFieldError = (name) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePrincipalChange = (e) => {
    const formatted = formatAmountWithCommas(e.target.value);
    setFormData((prev) => ({ ...prev, principal: formatted }));
    clearFieldError('principal');
  };

  const handlePrincipalBlur = () => {
    if (formData.principal) {
      setFormData((prev) => ({
        ...prev,
        principal: formatAmountWithCommas(prev.principal),
      }));
    }
  };

  const handleInterestChange = (e) => {
    const value = sanitizeInterestInput(e.target.value);
    setFormData((prev) => ({ ...prev, interest_rate: value }));
    clearFieldError('interest_rate');
  };

  const handleYearsChange = (e) => {
    const value = sanitizeYearsInput(e.target.value);
    setFormData((prev) => ({ ...prev, years: value }));
    clearFieldError('years');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoanForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onCalculate(toApiPayload(formData));
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-2.5 text-slate-800 outline-none transition focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 sm:p-8"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Enter Loan Details
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="principal"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Loan Amount (₹)
          </label>
          <input
            id="principal"
            name="principal"
            type="text"
            inputMode="numeric"
            value={formData.principal}
            onChange={handlePrincipalChange}
            onBlur={handlePrincipalBlur}
            placeholder="e.g. 5,00,000"
            aria-invalid={!!errors.principal}
            aria-describedby={errors.principal ? 'principal-error' : undefined}
            className={inputClass('principal')}
          />
          {errors.principal && (
            <p id="principal-error" className="mt-1 text-sm text-red-500">
              {errors.principal}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="interest_rate"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Interest Rate (% per year)
          </label>
          <input
            id="interest_rate"
            name="interest_rate"
            type="text"
            inputMode="decimal"
            value={formData.interest_rate}
            onChange={handleInterestChange}
            placeholder="e.g. 8 or 8.5"
            aria-invalid={!!errors.interest_rate}
            aria-describedby={
              errors.interest_rate ? 'interest_rate-error' : undefined
            }
            className={inputClass('interest_rate')}
          />
          {errors.interest_rate && (
            <p id="interest_rate-error" className="mt-1 text-sm text-red-500">
              {errors.interest_rate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="years"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Loan Duration (years)
          </label>
          <input
            id="years"
            name="years"
            type="text"
            inputMode="numeric"
            value={formData.years}
            onChange={handleYearsChange}
            placeholder="e.g. 20"
            aria-invalid={!!errors.years}
            aria-describedby={errors.years ? 'years-error' : undefined}
            className={inputClass('years')}
          />
          {errors.years && (
            <p id="years-error" className="mt-1 text-sm text-red-500">
              {errors.years}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Calculating...' : 'Calculate EMI'}
      </button>
    </form>
  );
}

export default EMIForm;
