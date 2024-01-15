import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    actions.getProfile().then((data) => setProfileData(data));
  }, [actions]);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {store.user.email}!</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};
