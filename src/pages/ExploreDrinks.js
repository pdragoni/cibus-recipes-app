import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinks() {
  const title = 'Explore Drinks';
  const { setPageTitle } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
  }, []);

  const handleIngredientes = () => {
    history.push('/explore/drinks/ingredients');
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
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExplorerDrinks;
