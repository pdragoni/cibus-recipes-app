import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const EMPTY_RESULTS = `${'Sorry, we haven'}'${'t found any recipes for these filters.'}`;
function Header() {
  const {
    pageTitle,
    setResults,
    searchPageButton,
    setFilteredArray,
    explorer,
  } = useContext(Context);
  const [isSearching, setIsSearching] = useState(false);
  // const [usuario, setUsuario] = useState('');
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
        // setResults(array);
        return array;
      }
    } catch (error) {
      global.alert(EMPTY_RESULTS);
    }
  };
  const handleFetch = async () => {
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
    const result = await fetchResults(URL);
    if (result !== undefined) setResults(result);
  };
  const handleSearch = () => {
    if (radio === 'First-Letter' && query.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      handleFetch();
    }
  };
  useEffect(() => {
    const teste = async () => {
      // const email = JSON.parse(localStorage.getItem('user'));
      // if (email) {
      //   setUsuario(email.email);
      // }
      if (explorer === false) {
        if (pageTitle === 'Foods' || pageTitle === 'Explore Nationalities') {
          const resultMeal = await fetchResults('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          setResults(resultMeal);
          setFilteredArray(resultMeal);
        } else {
          const resultDrink = await fetchResults('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
          setResults(resultDrink);
          setFilteredArray(resultDrink);
        }
      }
    };
    teste();
  }, [pageTitle]);

  return (
    <header className="header">
      <h3 className="app-name">Cibus Recipes</h3>
      <div className="profile-header">
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
      </div>
      {
        isSearching
          && (
            <div className="search-div">
              <input
                onChange={ ({ target }) => setQuery(target.value) }
                data-testid="search-input"
                type="text"
                placeholder="Search here"
              />
              <label htmlFor="ingredients">
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="ingredients"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="categories"
                />
                Ingredients
              </label>
              <label
                htmlFor="name"
              >
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="name"
                  type="radio"
                  data-testid="name-search-radio"
                  name="categories"
                />
                Name
              </label>
              <label
                htmlFor="first-letter"
              >
                <input
                  onChange={ ({ target }) => setRadio(target.id) }
                  id="first-Letter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="categories"
                />
                First letter
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
      <p className="page-title" data-testid="page-title">
        {
          `You are on
        ${pageTitle}
        `
        }
      </p>
    </header>
  );
}
export default Header;
