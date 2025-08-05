import React from 'react';

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} style={{ display: 'block', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <select id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div style={{ color: 'red', marginTop: 4, fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;