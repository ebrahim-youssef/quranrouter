import { useState, useEffect, useCallback } from 'react';
import { API_CONFIGS } from '../configs/providers';

export const useQuranRouter = (surah, ayah, sourceId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = API_CONFIGS[sourceId];
      let url = config.endpoint(surah, ayah);
      
      // Use CORS proxy if configured for this provider
      if (config.useProxy) {
        url = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Source unavailable`);
      }

      let rawData;
      if (config.isRawText) {
        rawData = await response.text();
      } else {
        rawData = await response.json();
      }

      const unified = config.transform(rawData);
      setData({
        unified,
        raw: rawData
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [surah, ayah, sourceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
