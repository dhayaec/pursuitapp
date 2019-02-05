import { Field, Formik } from 'formik';
import React from 'react';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import Layout from '../components/Layout';
import { LoginComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

export default () => {
  return (
    <Layout title="Login page">
      <LoginComponent>
        {register => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
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
            initialValues={{
              email: '',
              name: '',
              mobile: '',
              password: '',
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="default" component={ErrorField} />

                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">Login</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
