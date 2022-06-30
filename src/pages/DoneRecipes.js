import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import Share from '../images/shareIcon.svg';

function DoneRecipes() {
  const title = 'Done Recipes';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [cardRecipe, setCardRecipe] = useState([]);
  const [cardFilter, setCardFilter] = useState([]);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setCardRecipe(storage);
    setCardFilter(storage);
  }, []);

  const handleClickFilter = (type) => {
    const filter = cardRecipe.filter((recipe) => recipe.type === type);
    setCardFilter(filter);
  };

  return (
    <section>
      <Header />
      <div>
        <button
          type="button"
          onClick={ () => setCardFilter(cardRecipe) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => handleClickFilter('food') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => handleClickFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
        { cardFilter.map((recipe, index) => (
          <div key={ recipe.id }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </p>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="Recipe"
            />
            {/* <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p> */}
            { recipe.type === 'food' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.alcoholicOrNot} ${recipe.category}` }
              </p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            { recipe.type && recipe.tags.map((tag, i) => (
              <p
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>

            ))}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ Share }
            >
              <img src={ Share } alt="Share button" />
            </button>
          </div>
        ))}
      </div>
    </section>);
}

export default DoneRecipes;
