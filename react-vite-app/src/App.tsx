// src/App.tsx
import React, { useEffect, useState } from 'react';

type PaymentWidgetProps = {
  onClickCallback: (data: { paymentMethod: string; acceptedTerms: boolean }) => void;
};


declare global {
  interface Window {
    ExternalApp?: {
      PaymentWidget?: React.ComponentType<PaymentWidgetProps>;

    };
  }
}

const App: React.FC = () => {
  const [Remote, setRemote] = useState<React.ComponentType<PaymentWidgetProps> | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'http://localhost:3000/bundle.js';
    s.onload = () => {
      if (window.ExternalApp?.PaymentWidget) {
        setRemote(() => window.ExternalApp?.PaymentWidget!);

      } else {
        console.error('PaymentWidget not found on window.ExternalApp');
      }
    };
    s.onerror = () => console.error('Failed to load remote bundle');
    document.body.appendChild(s);
    return () => void document.body.removeChild(s);
  }, []);

  return (
    <div >
      <h2 >User Details</h2>
      <div >
        <label >First Name:</label>
        <input
          type="text"

          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div >
        <label >Last Name:</label>
        <input
          type="text"

          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <h2 >Payment Widget</h2>
      {Remote ? (
        <Remote
          onClickCallback={(data) => {
            console.log('Form Data:', { firstName, lastName });
            console.log('Payment Data:', data);
          }}
        />
      ) : (
        <p>Loading remote widget…</p>
      )}


    </div>
  );
};

export default App;
