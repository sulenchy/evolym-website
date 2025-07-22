import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } 
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);
  return { data, error };
}