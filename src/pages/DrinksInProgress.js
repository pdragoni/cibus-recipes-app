import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksInProgress() {
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copied, setCopied] = useState(false);
  const [toClipBoard, setToClipboard] = useState('');
  const [finishBtn, setFinishBtn] = useState(true);
  const [ingredCount, setIngredCount] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const requestFetch = async () => {
    const idURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
    console.log(responseJson.drinks);
    setDrinkCard(responseJson.drinks);
  };

  const setIngredMeasures = (drink) => {
    const VINTE = 20;
    const ingredMeasures = [];
    if (drink.length !== 0) {
      for (let i = 1; i <= VINTE; i += 1) {
        if (drink[0][`strIngredient${i}`]) {
          ingredMeasures
            .push(`${drink[0][`strMeasure${i}`]} ${drink[0][`strIngredient${i}`]}`);
        }
      }
      console.log(ingredMeasures);
      return ingredMeasures;
    }
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    console.log(drinkCard[0]);
    if (favorite === false) {
      const { idDrink,
        strCategory,
        strAlcoholic,
        strDrink,
        strDrinkThumb } = drinkCard[0];
      const favObj = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      if (favoritesData !== null) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...favoritesData, favObj]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
      }
    }
  };

  const checkboxClick = ({ target }) => {
    console.log(ingredients.length);
    if (target.checked === true) {
      const newCount = ingredCount + 1;
      setIngredCount(newCount);
    } else if (target.checked === false) {
      const newCount = ingredCount - 1;
      setIngredCount(newCount);
    }

    if (ingredients.length - 1 === ingredCount) {
      console.log('if funciona');
      setFinishBtn(false);
    } else {
      setFinishBtn(true);
    }
  };

  const handleFinishRecipe = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipe = drinkCard[0];
    let tag = [];
    if (recipe.strTags !== null) tag = recipe.strTags;
    const newObject = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: recipe.dateModified,
      tags: tag,
    };
    const finishRecipe = storage.push(newObject);
    console.log(finishRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    history.push('/done-recipes');
  };

  useEffect(() => {
    requestFetch();
    setToClipboard(pathname.toString().replace('/in-progress', ''));
    if (favoritesData !== null) {
      const favoriteData = favoritesData.filter((fav) => fav.id === locationId);
      if (favoriteData.length > 0) {
        setFavorite('true');
      }
    }
  }, []);

  useEffect(() => {
    const ingredMeasures = setIngredMeasures(drinkCard);
    setIngredients(ingredMeasures);
  }, [drinkCard]);

  return (
    <section>
      { drinkCard.map((details, index) => (
        <div key={ index }>
          <img src={ details.strDrinkThumb } data-testid="recipe-photo" alt="recipe" />
          <h1 data-testid="recipe-title">{details.strDrink}</h1>

          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => { copy(`http://localhost:3000${toClipBoard}`); setCopied('true'); } }
          >
            <img src={ Share } alt="Share button" />
          </button>

          {copied && <p>Link copied!</p>}

          {favorite
            ? (
              <button
                type="button"
                onClick={ handleFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  alt="button favorite"
                />
              </button>)
            : (
              <button
                type="button"
                onClick={ handleFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="button favorite"
                />
              </button>)}
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                <label
                  htmlFor="checkboxIngredient"
                  data-testid={ `${i}-ingredient-step` }
                  name={ `checkbox-${i}` }
                  onChange={ checkboxClick }

                >
                  <input type="checkbox" className="checkboxIngredient" />
                  {`${ingredient}`}
                </label>
              </li>))}
          </ul>
          <p data-testid="recipe-category">{details.strCategory}</p>
          <p data-testid="instructions">{ details.strInstructions }</p>
        </div>))}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishBtn }
        onClick={ handleFinishRecipe }
      >
        Finish Recipe

      </button>

    </section>
  );
}

export default DrinksInProgress;
