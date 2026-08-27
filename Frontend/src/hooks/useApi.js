import { useState, useEffect, useCallback, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useApi(path, options = {}) {
  const { interval = null, immediate = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetch_ = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data ?? json);
    } catch (e) {
      setError(e.message || 'Erro ao conectar com a API');
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    if (immediate) fetch_();
    if (interval) {
      intervalRef.current = setInterval(fetch_, interval);
    }
    return () => clearInterval(intervalRef.current);
  }, [fetch_, interval, immediate]);

  return { data, loading, error, refetch: fetch_ };
}

export function useTimezone() {
  const [tz, setTz] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const lookup = useCallback(async (timezone) => {
    if (!timezone.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_URL_LOCAL}/api/datetime/timezone/${encodeURIComponent(timezone.trim())}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Fuso inválido');
      setResult(json.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL_LOCAL]);

  return { tz, setTz, result, loading, error, lookup };
}
