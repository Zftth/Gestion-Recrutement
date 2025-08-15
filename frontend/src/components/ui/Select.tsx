import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  options: SelectOption[];
  className?: string;
  [key: string]: any;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, placeholder, required, disabled, fullWidth, options, className = '', ...props }, ref) => {
    const baseClasses = 'block px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white';
    const errorClasses = error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : '';
    const disabledClasses = disabled ? 'bg-secondary-50 cursor-not-allowed' : '';
    const fullWidthClasses = fullWidth ? 'w-full' : '';

    const selectClasses = [
      baseClasses,
      errorClasses,
      disabledClasses,
      fullWidthClasses,
      className,
    ].join(' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          required={required}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';