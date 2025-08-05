import React, { FormEvent, ReactNode } from 'react';

type FormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
  submitButton?: ReactNode; // Optional custom submit button
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className,
  style,
  autoComplete = 'off',
  submitButton,
}) => (
  <form
    onSubmit={onSubmit}
    className={className}
    style={style}
    autoComplete={autoComplete}
  >
    {children}
    {/* If there is no custom button passed in then use this default */}
    {submitButton ? (
      submitButton
    ) : (
      <button type="submit" className="default-submit-button">
        Submit
      </button>
    )}
  </form>
);

export default Form;