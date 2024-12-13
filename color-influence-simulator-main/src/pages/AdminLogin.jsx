import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === '' || password === '') {
      setError('Both fields are required.');
      return;
    }

    // Simple login logic, you can add your authentication logic here
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin-feedback'); // Navigate to AdminFeedback page after successful login
    } else {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className="admin-login-container">
      <style>
        {`
          .admin-login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #0a0c2c;
          }

          .admin-login-card {
            background-color: #ffffff;
            border-radius: 20px;
            padding: 30px;
            width: 350px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            text-align: center;
          }

          .admin-login-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #000000;
          }

          .admin-login-input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border-radius: 10px;
            border: 1px solid #ddd;
            outline: none;
            margin-bottom: 20px;
            font-family: Arial, sans-serif;
            color: #000000;
            background-color: #ffffff;
          }

          .admin-login-input::placeholder {
            color: #888;
          }

          .admin-login-button {
            background-color: #00e6c3;
            border: none;
            color: #000;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
          }

          .admin-login-button:hover {
            background-color: #00ccac;
          }

          .admin-login-error {
            color: red;
            margin-top: 10px;
            font-size: 14px;
          }
        `}
      </style>
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <input
          type="text"
          className="admin-login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="admin-login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="admin-login-button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="admin-login-error">{error}</p>} {/* Show error message */}
      </div>
    </div>
  );
};

export default AdminLogin;
