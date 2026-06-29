import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getApiErrorMessage } from '../services/api';

export function useAsyncData(fetchFn, errorFallback) {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          errorFallback || 'Failed to load data. Make sure the backend is running.'
        )
      );
    } finally {
      setLoading(false);
    }
  }, [fetchFn, errorFallback]);

  useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  return { data, loading, error, refetch, setData, setError };
}
