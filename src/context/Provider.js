import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [searchPageButton, setSearchPageButton] = useState(false);

  const contextValue = {
    setPageTitle,
    pageTitle,
    searchPageButton,
    setSearchPageButton,
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
