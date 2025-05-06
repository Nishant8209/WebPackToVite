import React, { useRef } from 'react';
import '../RedioButton/rediobutton.css';

interface PaymentOption {
  id: string;
  label: string;
}

interface RadioButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const paymentOptions: PaymentOption[] = [
  { id: 'gpay', label: 'GPay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'applepay', label: 'ApplePay' },
  { id: 'others', label: 'Others' },
];

const RadioButton: React.FC<RadioButtonProps> = ({ value, onChange }) => {
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % paymentOptions.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + paymentOptions.length) % paymentOptions.length;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      refs.current[nextIndex]?.focus();
      onChange(paymentOptions[nextIndex].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(paymentOptions[index].id);
    }
  };

  return (
    <div
      className="radio-button-container"
      role="radiogroup"
      aria-label="Select a payment method"
    >
      {paymentOptions.map((option, index) => (
        <div
          key={option.id}
          role="radio"
          aria-checked={value === option.id}
          tabIndex={value === option.id || (!value && index === 0) ? 0 : -1}
          ref={(el) => (refs.current[index] = el)}
          className={`radio-button ${value === option.id ? 'selected' : ''}`}
          onClick={() => onChange(option.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          <div className="custom-radio" />
          <span className="label">{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
