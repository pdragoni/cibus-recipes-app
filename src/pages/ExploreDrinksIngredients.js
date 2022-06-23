import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinksIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [drinks, setDrinks] = useState('');

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    const allDrinks = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const responseJson = await response.json();
      console.log(responseJson);
      setDrinks(responseJson.drinks);
    };
    allDrinks();
  }, []);

  const ONZE = 11;

  return (
    <section>
      <Header />
      {
        drinks
        && drinks.filter((allDrinks, index) => index <= ONZE).map((drink, index) => (
          <div
            key={ drink + index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ drink.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>
              {drink.strIngredient1}
            </p>
          </div>
        ))
      }
      <Footer />
    </section>);
}

export default ExplorerDrinksIngredients;
