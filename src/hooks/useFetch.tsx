import { transformKeys } from "../lib/snakeToCamel";
import { useState, useEffect } from "react";

interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH";
  searchParams?: Record<string, string>;
  body?: any;
  headers?: HeadersInit;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export const useFetch = <T,>(
  url: string,
  options: UseFetchOptions = {},
): UseFetchResult<T> => {
  const { method = "GET", searchParams, body, headers } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParamsString = new URLSearchParams(searchParams).toString();
  const urlWithSearchParams = `${url}?${searchParamsString}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestOptions: RequestInit = {
          method,
          headers,
        };

        if (body) {
          requestOptions.body =
            typeof body === "string" ? body : JSON.stringify(body);
          if (!headers) {
            if (!requestOptions.headers) {
              requestOptions.headers = new Headers();
              requestOptions.headers.set("Content-type", "application/json");
            }
          }
        }

        const response = await fetch(urlWithSearchParams, requestOptions);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const json = await response.json();
        const data = transformKeys(json.data) as T;
        setData(data);
        setLoading(false);
      } catch (e) {
        const error = e as Error;
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};
