import { useAsyncData } from '../hooks/useAsyncData';
import { getStatistics } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import ErrorAlert from './ErrorAlert';

const STAT_CARDS = [
  {
    label: 'Total Calculations',
    key: 'total_calculations',
    isCurrency: false,
    cardClass: 'ring-blue-200',
    valueClass: 'text-blue-600',
  },
  {
    label: 'Highest Loan',
    key: 'highest_loan',
    isCurrency: true,
    cardClass: 'ring-emerald-200',
    valueClass: 'text-emerald-600',
  },
  {
    label: 'Lowest Loan',
    key: 'lowest_loan',
    isCurrency: true,
    cardClass: 'ring-amber-200',
    valueClass: 'text-amber-600',
  },
  {
    label: 'Average EMI',
    key: 'average_emi',
    isCurrency: true,
    cardClass: 'ring-indigo-200',
    valueClass: 'text-indigo-600',
  },
  {
    label: 'Average Interest',
    key: 'average_interest',
    isCurrency: true,
    cardClass: 'ring-purple-200',
    valueClass: 'text-purple-600',
  },
];

function StatisticsCard() {
  const { data: stats, loading, error } = useAsyncData(
    getStatistics,
    'Failed to load statistics. Make sure the backend is running.'
  );

  if (loading) {
    return (
      <div
        aria-busy="true"
        className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200"
      >
        <p className="text-slate-500">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
        <ErrorAlert message={error} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Loan Statistics
      </h2>

      {stats.total_calculations === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200">
          <p className="text-slate-500">
            No data yet. Calculate an EMI to see statistics.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAT_CARDS.map(({ label, key, isCurrency, cardClass, valueClass }) => (
            <div
              key={key}
              className={`rounded-2xl bg-white p-6 shadow-md ring-1 ${cardClass}`}
            >
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className={`mt-2 text-3xl font-bold ${valueClass}`}>
                {isCurrency ? formatCurrency(stats[key]) : stats[key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatisticsCard;
