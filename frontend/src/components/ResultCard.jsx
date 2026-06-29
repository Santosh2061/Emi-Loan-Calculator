import { formatCurrency } from '../utils/formatters';

function ResultCard({ result }) {
  if (!result) return null;

  const items = [
    { label: 'Monthly EMI', value: result.emi, highlight: true },
    { label: 'Total Interest', value: result.total_interest },
    { label: 'Total Payment', value: result.total_payment },
  ];

  return (
    <div
      aria-live="polite"
      className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 sm:p-8"
    >
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Calculation Result
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`rounded-xl p-4 ${
              highlight
                ? 'bg-indigo-50 ring-1 ring-indigo-200'
                : 'bg-slate-50 ring-1 ring-slate-200'
            }`}
          >
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p
              className={`mt-1 text-2xl font-bold ${
                highlight ? 'text-indigo-600' : 'text-slate-800'
              }`}
            >
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-2 text-sm text-slate-500 sm:grid-cols-3">
        <p>
          <span className="font-medium text-slate-700">Principal:</span>{' '}
          {formatCurrency(result.principal)}
        </p>
        <p>
          <span className="font-medium text-slate-700">Rate:</span>{' '}
          {result.interest_rate}% / year
        </p>
        <p>
          <span className="font-medium text-slate-700">Duration:</span>{' '}
          {result.years} years
        </p>
      </div>
    </div>
  );
}

export default ResultCard;
