import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import rigoImageUrl from '../../img/rigo-baby.jpg';
import '../../styles/home.css';

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Authentication Project!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        {store.message || (
          <>
            Please{' '}
            <Link
              to="/login"
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              login
            </Link>
            !
          </>
        )}
      </div>
    </div>
  );
};
