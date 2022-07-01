import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import './DetailsStyle.css';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton,
  } = useContext(Context);
  const history = useHistory();
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [toClipBoard, setToClipboard] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [ifStarted, setIfStarted] = useState(false);
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

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const handleStarted = () => {
    if (recipesInProgress) {
      const idsStarted = Object.keys(recipesInProgress.meals); // array de ids, strings
      const checkStarted = idsStarted?.some((id) => id === locationId); // verifica se o locationId da página é igual a um dos elementos
      setIfStarted(checkStarted);
    }
  };

  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoritesData);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();
    getRecomendation();
    setToClipboard(pathname.toString());
    handleStarted();
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

  const clickToStart = () => {
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipes) {
      storedRecipes.meals[foodCard[0]?.idMeal] = [...ingredients];
      localStorage.setItem('inProgressRecipes', JSON.stringify(storedRecipes));
    }
    history.push(`/foods/${locationId}/in-progress`);
  };

  return (
    <section>
      {/* {console.log(ingredients)}
      {console.log(measure)} */}
      {foodCard.map((details, index) => (
        <div key={ index }>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {details.strCategory}
          </p>
          <img
            data-testid="recipe-photo"
            src={ details.strMealThumb }
            alt={ details.strMeal }
            className="imagem-detalhes-comida"
          />
          <div className="buttons-category">
            <button className="share-button" type="button" data-testid="share-btn" onClick={ () => { copy(`http://localhost:3000${toClipBoard}`); setCopied('true'); } }>
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

          </div>
          <h4 className="recipe-title" data-testid="recipe-title">{details.strMeal}</h4>

          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="ingredient-li"
              >
                {`${measure[i]} ${ingredient}`}
              </li>))}
          </ul>
          <p
            data-testid="instructions"
            className="instructions"
          >
            { details.strInstructions }
          </p>
          <video data-testid="video" controls>
            <source src={ details.strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="english_captions" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h4 className="recommendation-title">Recommendations</h4>
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
                      <p
                        data-testid={ `${index3}-recomendation-title` }
                      >
                        <img
                          src={ resultado.strDrinkThumb }
                          alt="DrinkRecomendation"
                          className="recomendation-image"
                        />
                        {resultado.strDrink}
                      </p>
                    </div>)))
                : <p>There are no recommendations</p>}
            </div>
          </div>
          <button
            type="button"
            className="start-button"
            onClick={ clickToStart }
            data-testid="start-recipe-btn"
          >
            {
              ifStarted ? 'Continue Recipe' : 'Start Recipe'
            }
          </button>
        </div>))}
    </section>
  );
}

export default FoodsDetail;
