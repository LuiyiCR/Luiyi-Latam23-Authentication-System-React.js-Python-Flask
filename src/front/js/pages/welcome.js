import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const Welcome = () => {
  const { store, actions } = useContext(Context);

  const handleLogoutClick = () => {
    actions.logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome, {store.user.email}!</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};
