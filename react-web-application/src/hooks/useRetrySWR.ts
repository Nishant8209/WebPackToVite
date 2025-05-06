import useSWR from 'swr';

export function useRetrySWR<T = any, E = any>(
  key: string,
  fetcher: (...args: any[]) => Promise<T>,
  maxRetries = 5
) {
  const { data, error, isValidating } = useSWR<T, E>(key, fetcher);

  const retryCount = (error as any)?.__retryCount || 0;

  const isLoading = !data && !error ;
  const isFinalError = error && retryCount >= maxRetries && !isValidating;

  return { data, error, isFinalError, isLoading, isValidating };
}
