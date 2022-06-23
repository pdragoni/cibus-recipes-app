import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerFoods() {
  const title = 'Explore Foods';
  const { setPageTitle } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
  }, []);

  const handleNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const handleIngredientes = () => {
    history.push('/explore/foods/ingredients');
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
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExplorerFoods;
