import { useState, useEffect } from "react";

function useFetcher(fetcher) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await fetcher();
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [fetcher, setLoading, setError, setData]);

  return { loading, error, data };
}

export default useFetcher;
