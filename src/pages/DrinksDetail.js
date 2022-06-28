import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import './DetailsStyle.css';

function DrinksDetail() {
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const title = 'DrinksDetail';
  const SEIS = 6;

  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

  const requestFetch = async () => {
    const idURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
    setDrinkCard(responseJson.drinks);
  };

  const getRecomendation = async () => {
    // const DOZE = 12;
    const recomendURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(recomendURL);
    const responseJson = await response.json();
    setRecomendations(responseJson.meals);
    console.log(responseJson.meals);
  };

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();
    getRecomendation();

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
      {drinkCard.map((details) => (
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

          <div>
            Recomendations
            <div className="wrapper">
              { recomendations.length >= 1
                ? (recomendations
                  .filter((element2, index2) => index2 < SEIS)
                  .map((resultado, index3) => (
                    <div
                      key={ index3 }
                      data-testid={ `${index3}-recomendation-card` }
                      className="recomendation-card"
                    >
                      <div
                        data-testid={ `${index3}-recomendation-title` }
                      >
                        {resultado.strMeal}
                      </div>
                      {/* <img src={ resultado.strMealThumb } alt="DrinkRecomendation" /> */}
                    </div>)))
                : <p>Recomendations</p>}
            </div>
          </div>

          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </div>
      ))}
    </section>
  );
}

export default DrinksDetail;
