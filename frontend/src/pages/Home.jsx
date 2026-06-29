import { useState } from 'react';
import EMIForm from '../components/EMIForm';
import ErrorAlert from '../components/ErrorAlert';
import ResultCard from '../components/ResultCard';
import { calculateEMI, getApiErrorMessage } from '../services/api';

function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await calculateEMI(data);
      setResult(response);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          'Failed to calculate EMI. Make sure the backend is running.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Calculate Your EMI</h2>
        <p className="mt-1 text-slate-500">
          Enter your loan details to compute monthly EMI, total interest, and
          total payment.
        </p>
      </div>

      <ErrorAlert message={error} />

      <div className="grid gap-6 lg:grid-cols-2">
        <EMIForm onCalculate={handleCalculate} loading={loading} />
        <ResultCard result={result} />
      </div>
    </div>
  );
}

export default Home;
