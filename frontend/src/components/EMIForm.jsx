import { useState } from 'react';

const FORM_FIELDS = [
  {
    name: 'principal',
    label: 'Loan Amount (₹)',
    type: 'number',
    placeholder: 'e.g. 500000',
    step: '1000',
    min: '1',
    max: '1000000000000',
  },
  {
    name: 'interest_rate',
    label: 'Interest Rate (% per year)',
    type: 'number',
    placeholder: 'e.g. 8.5',
    step: '0.1',
    min: '0.01',
    max: '100',
  },
  {
    name: 'years',
    label: 'Loan Duration (years)',
    type: 'number',
    placeholder: 'e.g. 20',
    step: '1',
    min: '1',
    max: '50',
  },
];

function EMIForm({ onCalculate, loading }) {
  const [formData, setFormData] = useState({
    principal: '',
    interest_rate: '',
    years: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const principal = parseFloat(formData.principal);
    const interestRate = parseFloat(formData.interest_rate);
    const years = parseInt(formData.years, 10);

    if (!formData.principal || principal <= 0 || principal > 1_000_000_000_000) {
      newErrors.principal = 'Loan amount must be between 1 and 1,000,000,000,000';
    }
    if (!formData.interest_rate || interestRate <= 0 || interestRate > 100) {
      newErrors.interest_rate =
        'Interest rate must be greater than 0 and at most 100';
    }
    if (!formData.years || years <= 0 || years > 50) {
      newErrors.years = 'Duration must be between 1 and 50 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onCalculate({
      principal: parseFloat(formData.principal),
      interest_rate: parseFloat(formData.interest_rate),
      years: parseInt(formData.years, 10),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 sm:p-8"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Enter Loan Details
      </h2>

      <div className="space-y-5">
        {FORM_FIELDS.map(({ name, label, type, placeholder, step, min, max }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              step={step}
              min={min}
              max={max}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className={`w-full rounded-lg border px-4 py-2.5 text-slate-800 outline-none transition focus:ring-2 ${
                errors[name]
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            />
            {errors[name] && (
              <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
                {errors[name]}
              </p>
            )}
          </div>
        ))}
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
