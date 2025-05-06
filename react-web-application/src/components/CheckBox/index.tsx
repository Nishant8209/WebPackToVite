import React from 'react';
import './checkbox.css';

interface CheckBoxProps {
  label: string;
  linkText: string;
  linkUrl: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, linkText, linkUrl, checked, onChange }) => {
  const checkboxId = 'terms-checkbox'; // Use a unique id if used multiple times

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="checkbox-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={handleCheckboxChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onChange(!checked);
          }
        }}
        aria-describedby={`${checkboxId}-description`}
      />
      <label htmlFor={checkboxId} id={`${checkboxId}-description`} style={{ marginLeft: '8px' }}>
        {label}{' '}
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
          {linkText}
        </a>
      </label>
    </div>
  );
};

export default CheckBox;
