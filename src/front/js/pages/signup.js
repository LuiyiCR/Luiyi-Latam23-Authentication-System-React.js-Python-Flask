import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUpClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    if (!password || password !== confirmPassword) {
      alert('Passwords do not match or are empty');
      return;
    }

    try {
      const response = await fetch(
        'https://psychic-funicular-9v7rwx5xr5j3j5r-3001.preview.app.github.dev/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        navigate('/login');
        alert('User created successfully, please login!');
      } else {
        const data = await response.json();
        alert(data.msg || 'Error creating user');
      }
    } catch (error) {
      console.log('Error creating user', error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#82a7e3',
      }}
    >
      <div
        className="text-center p-4"
        style={{
          backgroundColor: '#233465',
          color: 'white',
          borderRadius: '10px',
          width: '300px',
        }}
      >
        <h1>Sign Up</h1>

        <div>
          <input
            type="text"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleSignUpClick}
            className="btn btn-primary"
            style={{
              backgroundImage:
                'linear-gradient(to right, #8C4BC0, #663CB8, #4B6ED2)',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};
