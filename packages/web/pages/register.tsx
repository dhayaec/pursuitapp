import { userSchema } from '@pursuitapp/common';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import Layout from '../components/Layout';
import { RegisterComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

export default () => {
  return (
    <Layout title="Register page">
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
            onSubmit={async (data, { setErrors, resetForm }) => {
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
              } catch (err) {
                displayErrors(err, setErrors);
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
                  <button disabled={isSubmitting} type="submit">
                    Register
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};
