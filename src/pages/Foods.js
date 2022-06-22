import React, { useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Foods() {
  const title = 'Foods';
  const { setPageTitle, setSearchPageButton, results } = useContext(Context);
  // const history = useHistory();
  const DOZE = 12;

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);

  // useEffect(() => {
  //   if (results.length === 1) history.push(`/foods/${results[0].idMeal}`);
  // }, [results]);

  return (
    <section>
      <Header />
      { results.length !== 0
        ? (results
          .filter((element, index2) => index2 < DOZE)
          .map((resultado, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                className="imagem"
                src={ resultado.strMealThumb }
                alt={ resultado.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{resultado.strMeal}</p>
            </div>)))
        : <p>Meals</p>}
      <Footer />
    </section>
  );
}

export default Foods;
