import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Context from '../context/Context';

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton,
  } = useContext(Context);
  const history = useHistory();
  const [foodCard, setFoodCard] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  // const [startedRecipes, setStartedRecipes] = useState({ cocktails: {}, meals: {} });
  const title = 'Foods Detail';
  const SEIS = 6;

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

  const getRecomendation = async () => {
    const recomendURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(recomendURL);
    const responseJson = await response.json();
    setRecomendations(responseJson.drinks);
    console.log(responseJson.drinks);
  };

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    requestFetch();
    getRecomendation();
  }, []);

  useEffect(() => {
    const NOVE = 9;
    const VINTE_OITO = 28;
    const newArray = foodCard.map((ingredient) => (
      Object.values(ingredient).slice(NOVE, VINTE_OITO)))[0];
    // console.log(newArray);
    setIngredients(newArray?.filter((details) => details));

    const TRINTA_E_DOIS = 29;
    const CINQUENTA_E_UM = 49;
    const newArray2 = foodCard.map((measures) => (
      Object.values(measures).slice(TRINTA_E_DOIS, CINQUENTA_E_UM)))[0];
    // console.log(newArray2);
    setMeasure(newArray2?.filter((details) => details !== ' '));
  }, [foodCard]);

  const clickToStart = () => {
    const storedArray = localStorage.getItem('inProgressRecipes');
    const storageIngredients = { [foodCard[0].idMeal]: [...ingredients] };
    if (storedArray) {
      const parsed = JSON.parse(storedArray);
      console.log(parsed);
      const reLoc = {
        cocktails: { ...parsed.cocktails },
        meals: { ...parsed.meals, ...storageIngredients },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(reLoc));
      console.log(reLoc); // fim do reLoc
    } else {
      const newStorage = { cocktails: {}, meals: storageIngredients };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    history.push(`/drinks/${locationId}/in-progress`);
    // console.log(parsed);
    // const pushIgridients = { cocktails: {}, meals: { ...storageIngredients } };
    // localStorage.setItem(pushIgridients);
    // const storage = JSON.parselocalStorage.getItem('inProgressRecipes');
    // setStartedRecipes(storageIngredients);
    // console.log(storageIngredients); // isso tem que ir pra chave meals, adiciona no objeto
    // localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipes));
    // console.log('iniciadas', storage);
  };

  /*
const startedData = JSON.parse(localStorage.getItem('inProgressRecipes'));
const newStorage = startedData.meals.push(storageIngredients)
    if (startedData !== null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([...startedData, favObj]));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify([favObj]));
    }
    */
  return (
    <section>
      {/* {console.log(ingredients)}
      {console.log(measure)} */}
      {foodCard.map((details, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ details.strMealThumb }
            alt={ details.strDrink }
            className="imagem-detalhes-comida"
          />
          <h4 data-testid="recipe-title">{details.strMeal}</h4>
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

          <div>
            Recomendations
            { recomendations.length >= 1
              ? (recomendations
                .filter((element2, index2) => index2 < SEIS)
                .map((resultado, index3) => (
                  <div key={ index3 } data-testid={ `${index3}-recomendation-card` }>
                    <div
                      data-testid={ `${index3}-recomendation-title` }
                    >
                      {resultado.strDrink}
                    </div>
                    {/* <img src={ resultado.strDrinkThumb } alt="DrinkRecomendation" /> */}
                  </div>)))
              : <p>Recomendations</p>}
          </div>
          <button
            type="button"
            className="start-button"
            onClick={ clickToStart }
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </div>))}
    </section>
  );
}

export default FoodsDetail;
