import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [usuario, setUsuario] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUsuario(email);
  }, []);

  // const clickToProfile = () => {
  //   const history = useHistory;
  //   console.log('Profile');
  //   history.push('/profile');
  // };

  const clickToSearch = () => {
    console.log('search');
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <button
        name="btnProfile"
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="foto-de-perfil" />
      </button>
      <h2 data-testid="page-title">{ usuario }</h2>
      <button
        name="btnSearch"
        type="button"
        data-testid="search-top-btn"
        onClick={ clickToSearch }
      >
        <img src={ searchIcon } alt="imagem-de-busca" />
      </button>
      {
        isSearching
          && <input type="text" placeholder="Insert Your Search" />
      }
    </div>
  );
}

export default Header;
