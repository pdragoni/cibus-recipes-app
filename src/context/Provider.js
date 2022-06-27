import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredR, setFilteredR] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [explorer, setExplorer] = useState(false);

  const contextValue = {
    pageTitle,
    searchPageButton,
    results,
    toggle,
    filteredR,
    setResults,
    setPageTitle,
    setSearchPageButton,
    setToggle,
    setFilteredR,
    filteredArray,
    setFilteredArray,
    explorer,
    setExplorer,
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
