import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import Categories from '../components/Categories';

function Drinks() {
  const title = 'Drinks';
  const { setPageTitle, setSearchPageButton, results } = useContext(Context);
  const DOZE = 12;

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);

  return (
    <section>
      <Header />
      <Categories />
      { results.length >= 1
        ? (results
          .filter((element, index2) => index2 < DOZE)
          .map((resultado, index) => (
            <div key={ index } className="foodcard">
              <p data-testid={ `${index}-card-name` }>{resultado.strDrink}</p>
              <Link
                to={ `/drinks/${resultado.idDrink}` }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="recomendation-image"
                  src={ resultado.strDrinkThumb }
                  alt={ resultado.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </div>)))
        : <p className="standard-text">Choose a category to show results</p>}
      <Footer />
    </section>
  );
}

export default Drinks;
