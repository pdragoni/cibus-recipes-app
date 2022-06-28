import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import './DetailsStyle.css';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton,
  } = useContext(Context);
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [toClipBoard, setToClipboard] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const title = 'Foods Detail';
  const SEIS = 6;

  const location = useLocation();
  const { pathname } = location;
  const locationId = pathname.replace(/\D/g, '');

  const requestFetch = async () => {
    const idURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${locationId}`;
    const response = await fetch(idURL);
    const responseJson = await response.json();
    setFoodCard(responseJson.meals);
  };

  const getRecomendation = async () => {
    const recomendURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(recomendURL);
    const responseJson = await response.json();
    setRecomendations(responseJson.drinks);
  };
  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();
    getRecomendation();
    setToClipboard(pathname.toString());
    if (favoritesData !== null) {
      const favoriteData = favoritesData.filter((fav) => fav.id === locationId);
      if (favoriteData.length > 0) {
        setFavorite('true');
      }
    }
  }, []);

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
    const NOVE = 9;
    const VINTE_OITO = 28;
    const newArray = foodCard.map((ingredient) => (
      Object.values(ingredient).slice(NOVE, VINTE_OITO)))[0];
    setIngredients(newArray?.filter((details) => details));

    const TRINTA_E_DOIS = 29;
    const CINQUENTA_E_UM = 49;
    const newArray2 = foodCard.map((measures) => (
      Object.values(measures).slice(TRINTA_E_DOIS, CINQUENTA_E_UM)))[0];
    setMeasure(newArray2?.filter((details) => details !== ' '));
  }, [foodCard]);

  return (
    <section>
      {foodCard.map((details, index) => (
        <div key={ index }>
          <img src={ details.strMealThumb } data-testid="recipe-photo" alt="recipe" />
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
                        {resultado.strDrink}
                      </div>
                      {/* <img
                        src={ resultado.strDrinkThumb }
                        alt="DrinkRecomendation"
                        className="recomendation-image"
                      /> */}
                    </div>)))
                : <p>Recomendations</p>}
            </div>
          </div>

          <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
        </div>))}
    </section>
  );
}

export default FoodsDetail;
