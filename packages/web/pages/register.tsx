import { Field, Formik } from 'formik';
import React from 'react';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import Layout from '../components/Layout';
import { RegisterComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

export default () => {
  return (
    <Layout title="Register page">
      <RegisterComponent>
        {register => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                const res = await register({
                  variables: {
                    data
                  }
                });
                if (res) {
                  const {
                    data: {
                      register: { name, email }
                    }
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
              password: ''
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="default" component={ErrorField} />

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
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};
