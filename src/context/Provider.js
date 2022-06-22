import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';

// const EMPTY_RESULTS = 'Sorry, we haven\'t found any recipes for these filters.';
const DRINKS = 'drinks';
const FOODS = 'foods';
function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);
  const [URL, setURL] = useState('');
  // const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(URL);
        const responseJson = await response.json();
        // console.log(responseJson);
        // setData(responseJson); // responseJson.meals //.drinks
        const array = Object.values(responseJson)[0];
        // console.log(responseJson.length);
        setResults(array);
        if (array.length === 1) history.push(`/foods/${array[0].idMeal}`);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchResults();
  }, [URL]);

  useEffect(() => {
    if (results !== null) {
      switch (pageTitle) {
      case DRINKS:
        // if (results.length === 1) return history.push(`/drinks/${results[0].idDrink}`);
        if (results.length === 1) setIdDrink(results[0].idDrink);
        break;
      case FOODS:
        // if (results.length === 1) return history.push(`/foods/${results[0].idMeal}`);
        if (results.length === 1) setIdMeals(results[0].idMeal);
        break;
      default:
        return undefined;
      }
    } // else global.alert(EMPTY_RESULTS);
  }, [results]);

  const contextValue = {
    pageTitle,
    searchPageButton,
    URL,
    results,
    setPageTitle,
    setSearchPageButton,
    setURL,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.node), PropTypes.node],
  ).isRequired,
};

export default Provider;
