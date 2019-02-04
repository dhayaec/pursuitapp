import { FieldProps } from 'formik';
import React from 'react';

export const ErrorField = ({ form: { errors } }: FieldProps) => {
  const errorMessage = errors.default;
  if (!errorMessage) {
    return null;
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};
