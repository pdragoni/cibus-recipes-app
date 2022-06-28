import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import Carousel from '../components/Carousel';

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton,
  } = useContext(Context);
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const title = 'Foods Detail';

  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

  const requestFetch = async () => {
    const idURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
    console.log(responseJson.meals);
    setFoodCard(responseJson.meals);
  };

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
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
      {console.log(ingredients)}
      {console.log(measure)}
      {foodCard.map((details, index) => (
        <div key={ index }>
          <img src={ details.strMealThumb } data-testid="recipe-photo" alt="recipe" />
          <h1 data-testid="recipe-title">{details.strMeal}</h1>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{details.strCategory}</p>
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${measure[i]} ${ingredient}`}
              </li>))}
          </ul>
          <p data-testid="instructions">{ details.strInstructions }</p>
          <video data-testid="video" controls>
            <source src={ details.strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="english_captions" />
            Your browser does not support the video tag.
          </video>
          <div data-testid={ `${index}-recomendation-card` }>
            Recomendation
            <h1 data-testid={ `${index}-recomendation-title` }>{details.strMeal}</h1>
            <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
          </div>
        </div>))}
      <Carousel />
    </section>
  );
}

export default FoodsDetail;
