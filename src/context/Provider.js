import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);
  const [URL, setURL] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(URL);
        const responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchResults();
  }, [URL]);

  const contextValue = {
    setPageTitle,
    pageTitle,
    searchPageButton,
    setSearchPageButton,
    setURL,
    URL,
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
