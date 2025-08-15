import React, { forwardRef } from 'react';

interface InputProps {
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  [key: string]: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', placeholder, required, disabled, fullWidth, className = '', ...props }, ref) => {
    const baseClasses = 'block px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors';
    const errorClasses = error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : '';
    const disabledClasses = disabled ? 'bg-secondary-50 cursor-not-allowed' : '';
    const fullWidthClasses = fullWidth ? 'w-full' : '';

    const inputClasses = [
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
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';