import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExploreFoodsIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle,
    setSearchPageButton,
    setResults,
    setExplorer } = useContext(Context);
  const [foods, setFoods] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    setExplorer(true);
    const allFoods = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const responseJson = await response.json();
      setFoods(responseJson.meals);
    };
    allFoods();
  }, []);

  const ONZE = 11;
  const handleClick = async (ingrediente) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const response = await fetch(URL);
    const responseJson = await response.json();
    setResults(responseJson.meals);
    history.push('/foods');
  };

  return (
    <section>
      <Header />
      { foods
         && foods.filter((allfoods, index) => index <= ONZE).map((food, index) => (

           <div
             key={ food + index }
             className="ingredients-card"
           >
             <button
               data-testid={ `${index}-ingredient-card` }
               type="button"
               onClick={ () => handleClick(food.strIngredient) }
             >
               <img
                 src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
                 data-testid={ `${index}-card-img` }
                 alt={ food.strMeal }
               />
               <p data-testid={ `${index}-card-name` }>
                 {food.strIngredient}
               </p>
             </button>
           </div>
         ))}
      <Footer />
    </section>);
}

export default ExploreFoodsIngredients;
