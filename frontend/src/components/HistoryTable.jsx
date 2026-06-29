import { useMemo, useState } from 'react';
import { useAsyncData } from '../hooks/useAsyncData';
import { deleteRecord, getApiErrorMessage, getHistory } from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatters';
import ErrorAlert from './ErrorAlert';

function HistoryTable() {
  const { data: records, loading, error, setData, setError } = useAsyncData(
    getHistory,
    'Failed to load history. Make sure the backend is running.'
  );
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filtered = useMemo(() => {
    if (!records) return [];
    const query = search.toLowerCase();
    return records.filter(
      (record) =>
        record.principal.toString().includes(query) ||
        record.interest_rate.toString().includes(query) ||
        record.years.toString().includes(query) ||
        record.emi.toString().includes(query)
    );
  }, [records, search]);

  const handleDelete = async (id, principal) => {
    const confirmed = window.confirm(
      `Delete calculation for ${formatCurrency(principal)}?`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteRecord(id);
      setData((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete record.'));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div
        aria-busy="true"
        className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200"
      >
        <p className="text-slate-500">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Calculation History
        </h2>
        <input
          id="history-search"
          type="search"
          aria-label="Search history"
          placeholder="Search by amount, rate, years, EMI..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:max-w-xs"
        />
      </div>

      <ErrorAlert message={error} className="mb-4" />

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-slate-500">
          {!records || records.length === 0
            ? 'No calculations yet. Go to Home to calculate your first EMI.'
            : 'No records match your search.'}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th scope="col" className="pb-3 pr-4 font-medium">
                  Date
                </th>
                <th scope="col" className="pb-3 pr-4 font-medium">
                  Principal
                </th>
                <th scope="col" className="pb-3 pr-4 font-medium">
                  Rate
                </th>
                <th scope="col" className="pb-3 pr-4 font-medium">
                  Years
                </th>
                <th scope="col" className="pb-3 pr-4 font-medium">
                  EMI
                </th>
                <th scope="col" className="pb-3 pr-4 font-medium">
                  Total Interest
                </th>
                <th scope="col" className="pb-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 pr-4 text-slate-600">
                    {formatDate(record.created_at)}
                  </td>
                  <td className="py-3 pr-4 font-medium text-slate-800">
                    {formatCurrency(record.principal)}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {record.interest_rate}%
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{record.years}</td>
                  <td className="py-3 pr-4 font-medium text-indigo-600">
                    {formatCurrency(record.emi)}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {formatCurrency(record.total_interest)}
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(record.id, record.principal)}
                      disabled={deletingId === record.id}
                      aria-label={`Delete calculation for ${formatCurrency(record.principal)}`}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      {deletingId === record.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;
