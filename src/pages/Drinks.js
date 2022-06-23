import React, { useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Drinks() {
  const title = 'Drinks';
  const { setPageTitle, setSearchPageButton, results } = useContext(Context);
  // const history = useHistory();
  const DOZE = 12;

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);

  // useEffect(() => {
  //   if (results.length === 1) history.push(`/drinks/${results[0].idDrink}`);
  // }, [results]);

  return (
    <section>
      <Header />
      { results.length !== 0
        ? (results
          .filter((element, index2) => index2 < DOZE)
          .map((resultado, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `drinks/${resultado.idDrink}` }>
                <img
                  className="imagem"
                  src={ resultado.strDrinkThumb }
                  alt={ resultado.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{resultado.strDrink}</p>
              </Link>
            </div>)))
        : <p>Drinks</p>}
      <Footer />
    </section>
  );
}

export default Drinks;
