import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const history = useHistory();

  return (
    <footer className={ style.container } data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        type="button"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        type="button"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="exploreIcon" />
      </button>

      <button
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        type="button"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}

export default Footer;
