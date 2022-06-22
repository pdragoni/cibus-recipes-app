import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Profile() {
  const title = 'Profile';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [usuario, setUsuario] = useState('');
  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    if (email) {
      setUsuario(email.email);
    }
  }, []);

  const logoutFunction = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header />
      <body>
        <div data-testid="profile-email">
          {usuario}
        </div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutFunction }
        >
          Logout
        </button>
      </body>
      <Footer />
    </div>);
}

export default Profile;
