import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerFoods() {
  const title = 'Explore Foods';
  const { setPageTitle } = useContext(Context);
  const [randomFood, setRandomFood] = useState({});

  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    const surpriseFood = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const response = await fetch(URL);
      const responseJson = await response.json();
      setRandomFood(responseJson.meals[0]);
    };
    surpriseFood();
  }, []);

  const handleNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleIngredientes = () => {
    history.push('/explore/foods/ingredients');
  };

  const supriseFunc = () => {
    history.push(`/foods/${randomFood.idMeal}`);
  };

  return (
    <section>
      <Header />
      <h1>ExplorerFoods</h1>
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
          data-testid="explore-by-nationality"
          onClick={ handleNationality }
        >
          By Nationality
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

export default ExplorerFoods;
