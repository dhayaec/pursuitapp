import { FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Input } from 'reakit';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      <Input autoComplete="false" {...field} {...props} />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};
