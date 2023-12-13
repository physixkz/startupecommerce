import React, { useState } from "react";
import './login.css';

export const Login = ({ onLogin, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAction = () => {
    if (isSignUp) {
      // Simulate sign-up logic (replace with actual sign-up)
      onSignUp(username, password);
      setIsSignUp(false); // Switch back to login mode after sign-up
    } else {
      // Simulate authentication logic (replace with actual authentication)
      if (username === "exampleUser" && password === "examplePassword") {
        onLogin(username);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleAction}>
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </span>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;