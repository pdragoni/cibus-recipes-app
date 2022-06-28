import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidateBtn, setIsValidateBtn] = useState(true);

  const onInputChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  useEffect(() => {
    const minPasswordLength = 6;
    if (
      password.length > minPasswordLength
      && email.includes('@')
      && email.includes('.com')
    ) {
      setIsValidateBtn(false);
    } else {
      setIsValidateBtn(true);
    }
  }, [email, password, setIsValidateBtn]);

  const onLoginBtnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('doneRecipes', []);
    localStorage.setItem('inProgressRecipes', { cocktails: {}, meals: {} });
    history.push('/foods');
  };

  return (
    <section>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        onChange={ onInputChange }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        onChange={ onInputChange }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isValidateBtn }
        onClick={ onLoginBtnClick }
      >
        Enter
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
