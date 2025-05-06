import React from 'react';
import useSWR from 'swr';
import { useRetrySWR } from '../../hooks/useRetrySWR';

// lib/fetcher.ts
export const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }
    return res.json();
  };
  

function UserData() {
    const key = 'https://jsonplaceholder.typicode.com/user'; // Broken for testing
    // const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/user', fetcher);
    const { data, isLoading, isFinalError ,isValidating} = useRetrySWR(key, fetcher); 

  if (isLoading  || isValidating) return <div>Loading...</div>;
  if (isFinalError) return <div>Failed to load. Retrying...</div>;

  return (
    <div>
    
      <ul>
        {data?.map((user: any) => (
          <li key={user.id}>{user.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default UserData;
