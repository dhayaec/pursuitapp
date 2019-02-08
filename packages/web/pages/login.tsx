import { emailSchema } from '@pursuitapp/common';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import Layout from '../components/Layout';
import { LoginComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

export default () => {
  return (
    <Layout title="Login page">
      <HeaderNavMenu />
      <LoginComponent>
        {register => (
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={emailSchema}
            onSubmit={async (
              { email: emailValue, password },
              { setErrors },
            ) => {
              try {
                const res = await register({
                  variables: {
                    email: emailValue,
                    password,
                  },
                });
                if (res) {
                  const {
                    data: {
                      login: { name, email },
                    },
                  } = res;
                  console.log(name);
                  console.log(email);
                }
              } catch (err) {
                displayErrors(err, setErrors);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="default" component={ErrorField} />

                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                  autoComplete="off"
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button disabled={isSubmitting} type="submit">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
