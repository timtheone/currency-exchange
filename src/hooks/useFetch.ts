import { useEffect, useState } from "react";

function useFetch<T>(url: string): {
  isLoading: boolean;
  apiData: T | null;
  error: Error | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, error };
}

export default useFetch;
