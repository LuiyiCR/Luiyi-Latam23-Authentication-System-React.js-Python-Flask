import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSignUpClick = () => {};

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
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
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
