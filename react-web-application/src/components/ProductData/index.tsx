// ProductData.tsx
import useSWR from 'swr';
import { useEffect } from 'react';

import {  useRetrySWR } from '../../hooks/useRetrySWR';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error: any = new Error('Failed to fetch');
        error.status = res.status;
        throw error;
    }
    return res.json();
};
function ProductData() {
    const key = 'https://dummyjson.com/produc'; // Broken for testing
    const { data, isLoading, isFinalError ,isValidating} = useRetrySWR(key, fetcher);
    useEffect(() => {
        if ( isFinalError) {
            // Only log/show error after all retries are done
            console.error('Final error after retries:', isFinalError);
        }
    }, [isFinalError]);

    // If still retrying, don't show error
    if (isLoading || isValidating ) {
        return <div>⏳ Loading or retrying...</div>;
    }

    if (isFinalError) {
        return <div>❌ Final failure. Could not load.</div>;
    }

    return (
        <div>
         
            <ul>
                {data?.products?.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductData;
