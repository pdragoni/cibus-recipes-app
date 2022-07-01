import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinksIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle,
    setSearchPageButton,
    setResults,
    setExplorer } = useContext(Context);
  const [drinks, setDrinks] = useState('');

  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    setExplorer(true);
    const allDrinks = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const responseJson = await response.json();
      setDrinks(responseJson.drinks);
    };
    allDrinks();
  }, []);

  const ONZE = 11;
  const handleClick = async (ingrediente) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const response = await fetch(URL);
    const responseJson = await response.json();
    setResults(responseJson.drinks);
    history.push('/drinks');
  };
  return (
    <section>
      <Header />
      {
        drinks
        && drinks.filter((allDrinks, index) => index <= ONZE).map((drink, index) => (

          <div
            key={ drink + index }
            className="ingredients-card"
          >
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(drink.strIngredient1) }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ drink.strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>
                {drink.strIngredient1}
              </p>
            </button>
          </div>
        ))
      }
      <Footer />
    </section>);
}

export default ExplorerDrinksIngredients;
