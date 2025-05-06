import React from 'react';
import './button.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset'; // optional with valid HTML button types
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type = 'button' }) => {
  return (
    <button className="submit-button" onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
