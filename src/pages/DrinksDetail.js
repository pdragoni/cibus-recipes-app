import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Context from '../context/Context';
import './DetailsStyle.css';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksDetail() {
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [drinkCard, setDrinkCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [toClipBoard, setToClipboard] = useState('');
  const [ifStarted, setIfStarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
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
    const recomendURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(recomendURL);
    const responseJson = await response.json();
    setRecomendations(responseJson.meals);
  };
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const handleStarted = () => {
    if (recipesInProgress) {
      const idsStarted = Object.keys(recipesInProgress.cocktails); // array de ids, strings
      const checkStarted = idsStarted?.some((id) => id === locationId); // verifica se o locationId da página é igual a um dos elementos
      setIfStarted(checkStarted);
    }
  };
  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();
    handleStarted();
    getRecomendation();
    setToClipboard(pathname.toString());
    if (favoritesData !== null) {
      const favoriteData = favoritesData.filter((fav) => fav.id === locationId);
      if (favoriteData.length > 0) {
        setFavorite('true');
      }
    }
    const DOISMS = 2000;

    if (copied === true) {
      setTimeout(() => {
        setCopied(false);
      }, DOISMS);
    }
  }, [copied]);

  const handleFavorite = () => {
    setFavorite(!favorite);
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
      // console.log(ingredMeasures);
      return ingredMeasures;
    }
  };
  useEffect(() => {
    const ingredMeasures = setIngredMeasures(drinkCard);
    setIngredients(ingredMeasures);
  }, [drinkCard]);

  const clickToStart = () => {
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipes) {
      storedRecipes.cocktails[drinkCard[0]?.idDrink] = [...ingredients];
      localStorage.setItem('inProgressRecipes', JSON.stringify(storedRecipes));
    }
    history.push(`/drinks/${locationId}/in-progress`);
  };

  return (
    <section>
      {drinkCard.map((details) => (
        <div key={ details.idDrink }>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {details.strCategory}
          </p>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {details.strAlcoholic}
          </p>
          <img
            data-testid="recipe-photo"
            src={ details.strDrinkThumb }
            alt={ details.strDrink }
            className="imagem-detalhes-comida"
          />
          <div className="buttons-category">
            <button type="button" data-testid="share-btn" onClick={ () => { copy(`http://localhost:3000${toClipBoard}`); setCopied('true'); } }>
              <img src={ Share } alt="Share button" />
            </button>
            {copied && <p>Link copied!</p>}
            {favorite
              ? (
                <button
                  type="button"
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  onClick={ handleFavorite }
                >
                  <img src={ blackHeartIcon } alt="button favorite" />
                </button>)
              : (
                <button
                  type="button"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  onClick={ handleFavorite }
                >
                  <img src={ whiteHeartIcon } alt="button favorite" />
                </button>)}
          </div>
          <h4 className="recipe-title" data-testid="recipe-title">{details.strDrink}</h4>
          <ul>
            { ingredients && ingredients.map((ingredient, i) => (
              <li
                key={ ingredient }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="ingredient-li"
              >
                {`${ingredient}`}
              </li>))}
          </ul>
          <p
            data-testid="instructions"
            className="instructions"
          >
            {details.strInstructions}
          </p>
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
                      <div
                        data-testid={ `${index3}-recomendation-title` }
                      >
                        {resultado.strMeal}
                      </div>
                      <img
                        src={ resultado.strMealThumb }
                        alt="FoodRecommendation"
                        className="recomendation-image"
                      />
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
        </div>
      ))}
    </section>
  );
}

export default DrinksDetail;
