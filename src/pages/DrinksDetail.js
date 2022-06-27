import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function DrinksDetail() {
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const title = 'DrinksDetail';

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

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();

    // const NOVE = 9;
    // const VINTE_OITO = 28;
    // const newArray = drinkCard.map((ingredient) => (
    //   Object.values(ingredient).slice(NOVE, [VINTE_OITO]))[0]);
    // setIngredients(newArray?.filter((details) => details));
  }, []);

  useEffect(() => {
    const DEZESSETE = 17;
    const VINTE_OITO = 28;
    const newArray = drinkCard.map((ingredient) => (
      Object.values(ingredient).slice(DEZESSETE, VINTE_OITO)))[0];
    setIngredients(newArray?.filter((details) => details));
    console.log(newArray?.filter((details) => details));
  }, [drinkCard]);

  return (
    <section>
      {drinkCard.map((details, index) => (
        <div key={ details.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ details.strDrinkThumb }
            alt={ details.strDrink }
          />
          <h1 data-testid="recipe-title">{details.strDrink}</h1>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{details.strCategory}</p>
          <p data-testid="recipe-category">{details.strAlcoholic}</p>
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>))}
          </ul>
          <p data-testid="instructions">{details.strInstructions}</p>
          <div data-testid={ `${index}-recomendation-card` }>
            Recomendation
            <h1 data-testid={ `${index}-recomendation-title` }>{details.strDrink}</h1>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default DrinksDetail;
