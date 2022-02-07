import { useCallback, useEffect, useState } from "react";

function useFetch<T>(url: string): {
  isLoading: boolean;
  apiData: T | null;
  error: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setApiData(data);
      setIsLoading(false);
    } catch (error: any) {
      setError(true);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [url, fetchData]);

  return { isLoading, apiData, error };
}

export default useFetch;
