import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinks() {
  const title = 'Explore Drinks';
  const { setPageTitle } = useContext(Context);

  const [randomDrink, setRandomDrink] = useState('');
  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    const surpriseDrink = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(URL);
      const responseJson = await response.json();
      setRandomDrink(responseJson.drinks[0]);
    };
    surpriseDrink();
  }, []);

  const handleIngredientes = () => {
    history.push('/explore/drinks/ingredients');
  };

  const supriseFunc = () => {
    history.push(`/drinks/${randomDrink.idDrink}`);
  };

  return (
    <section>
      <Header />
      <section>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleIngredientes }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ supriseFunc }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExplorerDrinks;
