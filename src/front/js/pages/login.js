import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(
      'https://super-duper-engine-9v7rwx5xgqw3p99x-3001.preview.app.github.dev/api/token',
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert('There is an error');
      })
      .then()
      .catch((error) => {
        console.error('There is an error!', error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
};
