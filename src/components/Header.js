import React, { useState } from 'react';
import PropTypes from 'prop-types';
import img1 from '../images/profileIcon.svg';
import img2 from '../images/searchIcon.svg';

function Header({ history }) {
  const [isSearching, setIsSearching] = useState(false);

  const clickToProfile = () => {
    console.log('Profile');
    history.push('/profile');
  };

  const clickToSearch = () => {
    console.log('search');
    setIsSearching(true);
  };

  return (
    <div>
      <button
        name="btnProfile"
        data-testid="profile-top-btn"
        type="button"
        onClick={ clickToProfile }
      >
        <img src={ img1 } alt="foto-de-perfil" />
      </button>
      <h2 data-testid="page-title">HEADER123</h2>
      <button
        name="btnSearch"
        type="button"
        data-testid="search-top-btn"
        onClick={ clickToSearch }
      >
        <img src={ img2 } alt="imagem-de-busca" />
      </button>
      {
        isSearching
          && <input type="text" placeHolder="Insert Your Search" />
      }
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  // isSearching: PropTypes.bool.isRequired,
};

export default Header;
