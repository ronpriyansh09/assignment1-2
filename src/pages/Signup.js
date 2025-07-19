import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.css'; // We'll reuse the login styles

const Signup = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
        'Password must contain at least one letter and one number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Store user info in localStorage
    localStorage.setItem('userName', values.name);
    localStorage.setItem('userEmail', values.email);
    localStorage.setItem('userPassword', values.password); // Note: In a real app, never store passwords in plain text
    
    console.log('Signup values:', values);
    
    // Simulate account creation
    setTimeout(() => {
      setSubmitting(false);
      // Redirect to login page
      navigate('/');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>Securelytix</h1>
          <h2>Sign Up</h2>
        </div>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control"
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@securelytix.com"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="form-control"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className="form-footer">
                <p>Already have an account? <a href="/" className="form-link">Login</a></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;