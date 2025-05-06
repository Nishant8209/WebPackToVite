import React from 'react';

interface Option {
  id: string;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

const AccessibleRadioButton: React.FC<Props> = ({ name, options, selected, onChange }) => {
  return (
    <fieldset role="radiogroup" aria-label={name} className="radio-group">
      {options.map((option) => (
        <label key={option.id} className="radio-option">
          <input
            type="radio"
            name={name}
            value={option.id}
            checked={selected === option.id}
            onChange={() => onChange(option.id)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default AccessibleRadioButton;
