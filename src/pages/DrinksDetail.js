import React, { useEffect, useContext } from 'react';
import Context from '../context/Context';

function DrinksDetail() {
  const { setPageTitle, setSearchPageButton, filteredArray } = useContext(Context);
  const title = 'DrinksDetail';

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <section>
      <div>
        {filteredArray.map((resultado, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p>{resultado.strDrink}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DrinksDetail;
