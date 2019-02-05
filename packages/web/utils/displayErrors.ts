import { FormikErrors } from 'formik';

type SetErrorsFn = (errors: FormikErrors<any>) => void;

export function displayErrors(err: any, setErrors: SetErrorsFn) {
  const errors: {
    [key: string]: string;
  } = {};

  console.info(JSON.stringify(err));

  if (err.graphQLErrors && err.graphQLErrors.length) {
    const exception = err.graphQLErrors[0].extensions.exception;

    if (exception.errors) {
      exception.errors.forEach(x => {
        errors[x.path] = x.message;
      });
    } else {
      errors.default = err.graphQLErrors[0].message;
    }
  } else {
    errors.default = err.message;
  }

  setErrors(errors);
}
