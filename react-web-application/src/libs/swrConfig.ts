import { SWRConfiguration } from 'swr';

const MAX_RETRIES = 5;

// Define the status codes for which you want to retry
const RETRIABLE_STATUS_CODES = [500, 502, 503,404];

const swrConfig: SWRConfiguration = {
  errorRetryCount: MAX_RETRIES,
  errorRetryInterval: 1000,
  revalidateOnFocus: false,

  onErrorRetry: (error, key, config, revalidate, context) => {
    const status =
      error?.status ||
      error?.response?.status || // axios
      error?.response?.statusCode; // some APIs

    // Store the retry count
    (error as any).__retryCount = context.retryCount;

    // Only retry if status code is in the whitelist
    if (!RETRIABLE_STATUS_CODES.includes(status)) return;

    if (context.retryCount >= MAX_RETRIES) return;

    setTimeout(() => {
      revalidate({ retryCount: context.retryCount });
    }, config.errorRetryInterval || 1000);
  },

  isPaused: () => false,
};

export default swrConfig;
