import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function FoodsInProgress() {
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
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

  useEffect(() => {
    requestFetch();
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
                  {`${measure[i]} ${ingredient}`}
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
export default FoodsInProgress;
