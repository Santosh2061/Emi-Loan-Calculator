import HistoryTable from '../components/HistoryTable';

function History() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">History</h2>
        <p className="mt-1 text-slate-500">
          View and manage all your previous EMI calculations.
        </p>
      </div>
      <HistoryTable />
    </div>
  );
}

export default History;
