import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function DrinksInProgress() {
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

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

  useEffect(() => {
    requestFetch();
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
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                <label
                  htmlFor="checkboxIngredient"
                  data-testid={ `${i}-ingredient-step` }
                >
                  <input type="checkbox" className="checkboxIngredient" />
                  {`${ingredient}`}
                </label>
              </li>))}
          </ul>
          <p data-testid="recipe-category">{details.strCategory}</p>
          <p data-testid="instructions">{ details.strInstructions }</p>
        </div>))}
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </section>
  );
}

export default DrinksInProgress;
