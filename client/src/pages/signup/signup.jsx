import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import quantumThreadsImage from '../../assets/logo/QuantumThreads-logos_black.png';
import './signup.css';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [createUser] = useMutation(CREATE_USER);

  const handleSignUp = async () => {
    try {
      const { data } = await createUser({ variables: { email, username, password } });
      console.log('User created successfully:', data);

      // Assuming the token is received in the response from createUser mutation
      if (data && data.createUser && data.createUser.token) {
        Auth.login(data.createUser.token); // Log the user in after successful signup
      }

      // Optionally, handle any additional logic after signup

    } catch (error) {
      setError('Something went wrong');
      console.error('Error while creating user:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <img src={quantumThreadsImage} alt="Quantum Threads" className="signup-image" />
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
      </div>
      <button onClick={handleSignUp} className="signup-button">
        Sign Up
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignUp;
