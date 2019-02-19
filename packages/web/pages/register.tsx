import { userSchema } from '@pursuitapp/common';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'reakit';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { RegisterComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

export default () => {
  return (
    <div>
      <HeaderNavMenu />
      <RegisterComponent>
        {register => (
          <Formik
            initialValues={{
              email: '',
              name: '',
              mobile: '',
              password: '',
            }}
            validationSchema={userSchema}
            onSubmit={async (data, { setErrors, resetForm, setSubmitting }) => {
              try {
                const res = await register({
                  variables: {
                    data,
                  },
                });
                if (res) {
                  const {
                    data: {
                      register: { name, email },
                    },
                  } = res;
                  console.log(name);
                  console.log(email);
                  resetForm();
                }
                setSubmitting(false);
              } catch (err) {
                displayErrors(err, setErrors, setSubmitting);
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <Field component={ErrorField} />
                  <Field
                    name="name"
                    placeholder="full name"
                    component={InputField}
                  />
                  <Field
                    name="email"
                    placeholder="email"
                    component={InputField}
                  />
                  <Field
                    name="mobile"
                    placeholder="mobile"
                    component={InputField}
                  />
                  <Field
                    name="password"
                    placeholder="password"
                    type="password"
                    component={InputField}
                  />
                  <Button disabled={isSubmitting} type="submit">
                    Register
                  </Button>
                </Form>
              );
            }}
          </Formik>
        )}
      </RegisterComponent>
    </div>
  );
};
