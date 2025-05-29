import { Button,  Form, Row } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const ResetPasswordForm = () => {
  // Define the initial values for the form fields
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
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
          
              <h2 className="reset-password-heading">Reset Password</h2>
          </Row>
          <p className="reset-password-text">
            Enter your new password and confirm it.
          </p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Field
              type="password"
              name="password"
              placeholder="Enter new password"
              as={Form.Control}
            />
            <ErrorMessage
              name="password"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              as={Form.Control}
            />
            <ErrorMessage
              name="confirmPassword"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>
          <          Button variant="primary" type="submit"
            className={`ButtonFrame-viewMoreImage ${
              isSubmitting ? "disabled" : ""
            }`}
            disabled={isSubmitting}>
            {/* Reset Password */}
            {isSubmitting
              ? "Please wait"
              : "Reset Password"}
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

export default ResetPasswordForm;