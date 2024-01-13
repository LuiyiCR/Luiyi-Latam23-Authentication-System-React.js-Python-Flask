import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log('This is the token', store.token);

  const handleSignUpClick = () => {};

  const handleLoginClick = () => {
    actions.login(email, password);
  };

  if (store.token && store.token !== '' && store.token !== undefined)
    navigate('/');

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
        <h1>Login</h1>
        {store.token && store.token !== '' && store.token !== 'undefined' ? (
          'You are logged in with this token' + store.token
        ) : (
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
            <button
              onClick={handleLoginClick}
              className="btn btn-primary"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #8C4BC0, #663CB8, #4B6ED2)',
                borderRadius: '10px',
                width: '100%',
              }}
            >
              LOGIN
            </button>
            <p className="text-center m-3">OR</p>
            <button
              onClick={handleSignUpClick}
              className="btn btn-primary"
              style={{
                backgroundColor: '#233465',
                borderRadius: '10px',
                width: '100%',
              }}
            >
              SIGN UP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
