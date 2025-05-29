import { Button, Form, Row, Spinner } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../../api/auth';

const LoginForm = ({login}) => {

  const navigate = useNavigate();
  const location = useLocation();

  // Get email from URL query param
  const queryParams = new URLSearchParams(location.search);
  const emailFromUrl = queryParams.get('email') || '';

  // Define the initial values for the form fields, use email from URL if available
  const initialValues = {
    email: emailFromUrl,
    password: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    checkbox: Yup.boolean().oneOf([true], 'You must accept the terms'),
  });


const onSubmit = async (values, { setSubmitting }) => {
  try {
    const data = await loginUser(values.email, values.password);

    const token = data.access_token;
    localStorage.setItem('token', token);
    login(token);

    Swal.fire({
      title: 'Success!',
      text: 'You have successfully logged in.',
      icon: 'success',
    });

    setSubmitting(false);
    navigate('/dashboard', { replace: true });

  } catch (error) {
    setSubmitting(false);
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
    });
  }
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
              <h2 className="loginHeading">Login</h2>
          </Row>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              as={Form.Control}
            />
            <ErrorMessage
              name="password"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>
         
          <p className="forgot-password">
            <Link to="/forgot-password" >
              Forgot password?
            </Link>
          </p>
        <Button
  variant="primary"
  type="submit"
  className="ButtonFrame-viewMoreImage"
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="me-2"
      />
      Logging in...
    </>
  ) : (
    "Submit"
  )}
</Button>

          
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;