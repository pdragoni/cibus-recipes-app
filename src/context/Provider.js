import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [URL, setURL] = useState('');

  const contentProvided = {
    setURL,
    URL,
  };

  return (
    <Context.Provider value={ contentProvided }>
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
