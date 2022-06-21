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

  const clickToSearch = () => {
    console.log('search');
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <header>
      <h3>Receitas Grupo 14</h3>
      <label htmlFor="btnProfile">
        <button
          name="btnProfile"
          type="button"
          id="btnProfile"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="foto-de-perfil" />
        </button>
        <span data-testid="page-title">
          { usuario }
        </span>
      </label>
      <br />
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
          && (
            <div>
              <input data-testid="search-input" type="text" placeholder="Search here" />
              <select data-testid="ingredient-search-radio">
                <option data-testid="name-search-radio">Name</option>
                <option data-testid="ingredient-search-radio">Ingredient</option>
                <option data-testid="first-letter-search-radio">First-Letter</option>
              </select>
              <button type="button" data-testid="exec-search-btn">Go!</button>
            </div>)
      }
      <br />
    </header>
  );
}

export default Header;
