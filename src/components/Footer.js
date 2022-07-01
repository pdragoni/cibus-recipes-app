import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const history = useHistory();
  const { setExplorer } = useContext(Context);

  const handleToDrinks = () => {
    setExplorer(false);
    history.push('/drinks');
  };

  const handleToFoods = () => {
    setExplorer(false);
    history.push('/foods');
  };

  const handleToExplorer = () => {
    history.push('/explore');
  };

  return (
    <footer className={ style.container } data-testid="footer">
      <div className="footer-div">
        <button
          data-testid="drinks-bottom-btn"
          onClick={ () => handleToDrinks() }
          type="button"
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="drinkIcon" />
        </button>
        <button
          data-testid="explore-bottom-btn"
          onClick={ () => handleToExplorer() }
          type="button"
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="exploreIcon" />
        </button>
        <button
          data-testid="food-bottom-btn"
          onClick={ () => handleToFoods() }
          type="button"
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="mealIcon" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
