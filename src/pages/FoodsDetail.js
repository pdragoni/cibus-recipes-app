import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton, filteredArray,
  } = useContext(Context);
  const title = 'Foods Detail';

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <div>
      <Header />
      <div>
        {filteredArray.map((resultado, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p>{resultado.strMeal}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodsDetail;
