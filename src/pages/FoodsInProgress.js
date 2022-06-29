import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsInProgress() {
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [finishBtn, setFinishBtn] = useState(true);
  const [ingredCount, setIngredCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toClipBoard, setToClipboard] = useState('');
  const [favorite, setFavorite] = useState(false);
  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');
  const requestFetch = async () => {
    const idURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
    // console.log(responseJson.meals);
    setFoodCard(responseJson.meals);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);

    if (favorite === false) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = foodCard[0];
      const favObj = {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (favoritesData !== null) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...favoritesData, favObj]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
      }
    }
  };

  useEffect(() => {
    requestFetch();
    setToClipboard(pathname.toString());
  }, []);

  useEffect(() => {
    const NOVE = 9;
    const VINTE_OITO = 28;
    const newArray = foodCard.map((ingredient) => (
      Object.values(ingredient).slice(NOVE, VINTE_OITO)))[0];
    console.log(newArray);
    setIngredients(newArray?.filter((details) => details));
    const TRINTA_E_DOIS = 29;
    const CINQUENTA_E_UM = 49;
    const newArray2 = foodCard.map((measures) => (
      Object.values(measures).slice(TRINTA_E_DOIS, CINQUENTA_E_UM)))[0];
    console.log(newArray2);
    setMeasure(newArray2?.filter((details) => details !== ' '));
  }, [foodCard]);

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

  return (
    <section>
      { foodCard.map((details, index) => (
        <div key={ index }>
          <img
            src={ details.strMealThumb }
            data-testid="recipe-photo"
            alt="recipe"
            className="imagem-comida-progresso"
          />
          <h1 data-testid="recipe-title">{details.strMeal}</h1>

          <button type="button" data-testid="share-btn" onClick={ () => { copy(`http://localhost:3000${toClipBoard}`); setCopied('true'); } }>
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
                  {`${measure[i]} ${ingredient}`}
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
      >
        Finalizar Receita
      </button>

    </section>
  );
}
export default FoodsInProgress;
