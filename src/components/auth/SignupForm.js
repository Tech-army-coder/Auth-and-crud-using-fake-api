import { Button, Form, Row, Spinner } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { SignUpUser } from '../../api/auth';

const SignUpForm = () => {
  // Define the initial values for the form fields
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const navigate = useNavigate();
  
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    checkbox: Yup.boolean().oneOf([true], 'You must accept the terms'),
  });


const onSubmit = async (values, { setSubmitting, resetForm }) => {
  const userData = {
    name: `${values.firstName} ${values.lastName}`,
    email: values.email,
    password: values.password,
    avatar: 'https://picsum.photos/800',
  };


  try {
    await SignUpUser(userData); // Call the signup function

    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'Your account has been successfully created.',
    });

    resetForm();

    // Redirect to login page and pass email via state
    navigate(`/login?email=${encodeURIComponent(values.email)}`);

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Signup Failed',
      text: error.message || 'Unexpected error occurred. Please try again.',
    });
  } finally {
    setSubmitting(false);
  }
};




  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <FormikForm className="user-form " onSubmit={handleSubmit}>
          <Row >
              <h2 className="loginHeading">Sign Up</h2>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Field
              type="text"
              name="firstName"
              placeholder="Enter first name"
              as={Form.Control}
            />
            <ErrorMessage
              name="firstName"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Field
              type="text"
              name="lastName"
              placeholder="Enter last name"
              as={Form.Control}
            />
            <ErrorMessage
              name="lastName"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              as={Form.Control}
            />
            <ErrorMessage
              name="confirmPassword"
              component={Form.Text}
              className="text-danger"
            />
          </Form.Group>

        
          <Button variant="primary" type="submit"
          className={`ButtonFrame-viewMoreImage ${
            isSubmitting ? "disabled" : ""
          }`}
           disabled={isSubmitting}>
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
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
           
          </Button>


       
        </FormikForm>
      )}
    </Formik>
  );
};

export default SignUpForm;