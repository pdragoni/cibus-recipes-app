import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredR, setFilteredR] = ([]);
  // const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const contextValue = {
    pageTitle,
    searchPageButton,
    results,
    setResults,
    setPageTitle,
    setSearchPageButton,
    toggle,
    setToggle,
    filteredR,
    setFilteredR,
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
