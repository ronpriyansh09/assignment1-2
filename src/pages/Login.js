import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Default to true

  // Validation schema using Yup
  const validationSchema = Yup.object({
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
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, you would validate credentials with an API
    console.log('Login values:', values);
    
    // Simulate successful login
    setTimeout(() => {
      setSubmitting(false);
      // Store user info in localStorage if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem('userEmail', values.email);
        // In a real app, never store passwords in plain text
        localStorage.setItem('userPassword', values.password);
      } else {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
      }
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>Securelytix</h1>
          <h2>Login</h2>
        </div>
        
        <Formik
          initialValues={{
            email: localStorage.getItem('userEmail') || '',
            password: localStorage.getItem('userPassword') || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
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
                <div className="password-field">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="password-toggle-text">{showPassword ? 'Hide' : 'Show'}</span>
                    <span className={`eye-icon ${showPassword ? 'eye-open' : 'eye-closed'}`}></span>
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkmark"></span>
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="form-footer">
                <p>Don't have an account? <a href="/signup" className="form-link">Sign Up</a></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;