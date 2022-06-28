import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function DrinksDetail() {
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // const [measure, setMeasure] = useState([]);
  const title = 'DrinksDetail';

  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

  const requestFetch = async () => {
    const idURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
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
    // const DEZESSETE = 17;
    // const VINTE_OITO = 26;
    // const newArray = drinkCard.map((ingredient) => (
    //   Object.values(ingredient).slice(DEZESSETE, VINTE_OITO)))[0];
    // setIngredients(newArray?.filter((details) => details));

    // const TRINTA_E_DOIS = 32;
    // const CINQUENTA_E_UM = 49;
    // const newArray2 = drinkCard.map((measures) => (
    //   Object.values(measures).slice(TRINTA_E_DOIS, CINQUENTA_E_UM)))[0];
    // console.log(newArray2);
    // setMeasure(newArray2?.filter((details) => details !== ' '));
    const ingredMeasures = setIngredMeasures(drinkCard);
    setIngredients(ingredMeasures);
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
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => setIngredMeasures(drinkCard) }
          >
            Favorite
          </button>
          <p data-testid="recipe-category">{details.strCategory}</p>
          <p data-testid="recipe-category">{details.strAlcoholic}</p>
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${ingredient}`}
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
