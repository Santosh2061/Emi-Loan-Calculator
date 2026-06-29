import StatisticsCard from '../components/StatisticsCard';

function Statistics() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Statistics</h2>
        <p className="mt-1 text-slate-500">
          Overview of all your loan calculations.
        </p>
      </div>
      <StatisticsCard />
    </div>
  );
}

export default Statistics;
