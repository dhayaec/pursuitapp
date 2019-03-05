import { FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Input } from 'reakit';
import { ErrorDiv, InputHolder } from '../ui/ErrorField';

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
    <InputHolder>
      <Input autoComplete="false" {...field} {...props} />
      {errorMessage && <ErrorDiv>{errorMessage}</ErrorDiv>}
    </InputHolder>
  );
};
