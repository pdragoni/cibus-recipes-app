import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Explorer() {
  const title = 'Explore';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  const handleFoods = () => {
    history.push('/explore/foods');
  };

  const handleDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <section>
      <Header />
      <div className="explore-buttons-div">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ handleFoods }
          className="explore-button"
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ handleDrinks }
          className="explore-button"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </section>);
}

export default Explorer;
