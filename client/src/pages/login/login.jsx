import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import quantumThreadsImage from '../../assets/logo/QuantumThreads-logos_black.png';
import './login.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const [loginUser] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setError('Invalid credentials'); // Display a generic error message for security reasons
      console.error('Error logging in:', error);
    },
    onCompleted: (data) => {
      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
        console.log('Login successful!');
        // Redirect or handle successful login here
      } else {
        setError('Invalid credentials');
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
        console.log('Login successful!');
        // Redirect or handle successful login here
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Something went wrong');
      console.error('Error logging in:', error);
    }

    // Clear form values after submission
    setFormState({ email: '', password: '' });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <img src={quantumThreadsImage} alt="Quantum Threads" className="signup-image" />
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
