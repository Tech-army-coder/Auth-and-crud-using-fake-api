import { Button, Form, Row } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const initialValues = {
    email: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Define the onSubmit function to handle form submission
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <FormikForm className="user-form" onSubmit={handleSubmit}>
          <Row >
              <h2 className="forgot-password-heading">Forgot Password</h2>
          </Row>
          <p className="forgot-password-text">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email"
              as={Form.Control}
            />
            <ErrorMessage
              name="email"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>
          <Button variant="primary" type="submit"
            className={`ButtonFrame-viewMoreImage ${
              isSubmitting ? "disabled" : ""
            }`}
            disabled={isSubmitting}>
            {isSubmitting
              ? "Please wait"
              : "Send Reset Link"}
          </Button>
          <p className="login-link">
            <Link to="/login">
              Back to Login
            </Link>
          </p>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;