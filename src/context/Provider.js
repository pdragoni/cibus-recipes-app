import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);
  const [URL, setURL] = useState('');
  // const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(URL);
        const responseJson = await response.json();
        // console.log(responseJson);
        // setData(responseJson); // responseJson.meals //.drinks
        const array = Object.values(responseJson)[0];
        // console.log(array);
        setResults(array);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchResults();
  }, [URL]);

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
