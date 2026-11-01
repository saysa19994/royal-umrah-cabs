import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  optionalText?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = '',
  required = false,
  optional = false,
  optionalText = '(Optional)',
  ...props
}) => {
  return (
    <label
      className={`block text-xs sm:text-sm font-bold text-[#182235] mb-2 tracking-wide select-none ${className}`}
      {...props}
    >
      <span>{children}</span>
      {required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
      {optional && <span className="text-[#687386] font-normal text-xs ms-2">{optionalText}</span>}
    </label>
  );
};
