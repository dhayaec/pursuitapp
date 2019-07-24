import React from 'react';
import { emailSchema } from '@pursuitapp/common';
import { Field, Form, Formik } from 'formik';
import { Button, Heading } from 'reakit';
import { ErrorField } from '../components/fields/ErrorField';
import { InputField } from '../components/fields/InputField';
import { FormContainer } from '../components/ui/FormContainer';
import Header from '../components/ui/Header';
import { LoginComponent } from '../generated/apolloComponents';
import { displayErrors } from '../utils/displayErrors';

const Login = () => {
  return (
    <div>
      <Header />
      <FormContainer>
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
                { setErrors, setSubmitting },
              ) => {
                setSubmitting(true);
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
                    setSubmitting(false);
                  }
                } catch (err) {
                  displayErrors(err, setErrors, setSubmitting);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Heading use="h2">Login</Heading>
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
                  <Button disabled={isSubmitting} type="submit">
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </LoginComponent>
      </FormContainer>
    </div>
  );
};

export default Login;
