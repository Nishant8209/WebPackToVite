import React, { useEffect, useState } from 'react';

async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  retryDelay = 1000,
  retriableStatusCodes: number[] = [500, 502, 503, 504, 404]
): Promise<T> {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url, options);
      if (!retriableStatusCodes.includes(response.status) || response.ok) {
        return response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      attempt++;
      await new Promise((res) => setTimeout(res, retryDelay));
    }
  }

  // This should never happen, but is required for TypeScript return
  throw new Error('Unexpected fetch retry failure');
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWithRetry<any>('https://dummyjson.com/produc')
      .then(setData)
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed after retries: {error.message}</div>;

  return (
    <div>
      <h1>Data Loaded</h1>
      <ul>
                {data?.products?.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
    </div>
  );
};

export default MyComponent;
