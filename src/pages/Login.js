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
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
    history.push('/foods');
  };

  return (
    <div>
      <section className="section-login">
        <h1 className="app-title">CIBUS App</h1>
        <h5 className="app-subtitle">The best recipes for you</h5>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="Insert your email"
          onChange={ onInputChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="*******"
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
      <div className="group-info">
        <p className="developed-by">developed by:</p>
        <p className="group-14-minds">
          Group14 Minds
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
