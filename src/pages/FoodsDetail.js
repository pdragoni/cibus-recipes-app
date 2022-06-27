import React, { useEffect, useContext } from 'react';
import Context from '../context/Context';

function FoodsDetail() {
  const { setPageTitle, setSearchPageButton, filteredArray,
  } = useContext(Context);
  const title = 'Foods Detail';

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  console.log(filteredArray);

  return (
    <div>
      <div>
        {filteredArray.map((resultado, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p>{resultado.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodsDetail;
