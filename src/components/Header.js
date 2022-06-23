import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SurpriseFetch from '../Fetch/SurpriseFood';

const EMPTY_RESULTS = `${'Sorry, we haven'}'${'t found any recipes for these filters.'}`;
function Header() {
  const { pageTitle, setResults, searchPageButton } = useContext(Context);
  const [isSearching, setIsSearching] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [query, setQuery] = useState('');
  const [radio, setRadio] = useState('Name');
  const history = useHistory();

  const clickToSearch = () => {
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };
  const fetchResults = async (URL) => {
    try {
      const response = await fetch(URL);
      const responseJson = await response.json();
      const array = Object.values(responseJson)[0];
      if (array.length === 1) {
        if (pageTitle === 'Foods') {
          history.push(`/foods/${array[0].idMeal}`);
        } else if (pageTitle === 'Drinks') {
          history.push(`/drinks/${array[0].idDrink}`);
        }
      } else if (array.length > 1) {
        setResults(array);
      }
    } catch (error) {
      global.alert(EMPTY_RESULTS);
    }
  };
  const handleFetch = () => {
    let baseUrl = '';
    let baseFilter = '';
    if (pageTitle === 'Drinks') {
      baseUrl = 'thecocktaildb';
    } else {
      baseUrl = 'themealdb';
    }
    if (radio === 'Name') {
      baseFilter = 'search.php?s';
    } else if (radio === 'Ingredients') {
      baseFilter = 'filter.php?i';
    } else if (radio === 'First-Letter') {
      baseFilter = 'search.php?f';
    }
    const URL = `https://www.${baseUrl}.com/api/json/v1/1/${baseFilter}=${query}`;
    fetchResults(URL);
  };
  const handleSearch = () => {
    if (radio === 'First-Letter' && query.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      handleFetch();
      console.log(pageTitle);
      console.log(radio);
      console.log(query);
    }
  };

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    if (email) {
      setUsuario(email.email);
    }
    if (pageTitle === 'Foods') {
      fetchResults('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchResults('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    SurpriseFetch();
  }, [pageTitle]);

  return (
    <header>
      <h3>Receitas Grupo 14</h3>
      <span data-testid="page-title">
        { pageTitle }
      </span>
      <label htmlFor="btnProfile">
        <button
          name="btnProfile"
          type="button"
          id="btnProfile"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="foto-de-perfil" />
        </button>
        <span>{ usuario }</span>
      </label>
      <br />
      {/* <button
        name="btnSearch"
        type="button"
        data-testid="search-top-btn"
        src={ searchIcon }
        onClick={ clickToSearch }
      >
        <img src={ searchIcon } alt="imagem-de-busca" />
      </button> */}
      { searchPageButton && (
        <button
          name="btnSearch"
          type="button"
          data-testid="search-top-btn"
          onClick={ clickToSearch }
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="imagem-de-busca" />
        </button>)}
      {
        isSearching
          && (
            <div>
              <input
                onChange={ ({ target }) => setQuery(target.value) }
                data-testid="search-input"
                type="text"
                placeholder="Search here"
              />
              <label htmlFor="ingredients">
                Ingredients
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="Ingredients"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="categories"
                />
              </label>
              <label
                htmlFor="name"
              >
                Name
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="Name"
                  type="radio"
                  data-testid="name-search-radio"
                  name="categories"
                />
              </label>
              <label
                htmlFor="first-letter"
              >
                First letter
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="First-Letter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="categories"
                />
              </label>
              <button
                type="button"
                onClick={ handleSearch }
                data-testid="exec-search-btn"
              >
                Go!
              </button>
            </div>)
      }
      <br />
    </header>
  );
}
export default Header;
