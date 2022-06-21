import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [foods, setFoods] = useState('{}');
  const [drinks, setDrinks] = useState('{}');
  // const [radio, setRadio] = useState('');
  const [URL, setURL] = useState('');

  const contentProvided = {
    drinks,
    foods,
    setURL,
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
