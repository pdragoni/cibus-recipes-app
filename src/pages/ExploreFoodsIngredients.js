import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExploreFoodsIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    const allFoods = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const responseJson = await response.json();
      setFoods(responseJson.meals);
    };
    allFoods();
  }, []);

  const ONZE = 11;

  return (
    <section>
      <Header />
      { foods
         && foods.filter((allfoods, index) => index <= ONZE).map((food, index) => (

           <div
             key={ food + index }
             data-testid={ `${index}-ingredient-card` }
           >
             <img
               src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
               data-testid={ `${index}-card-img` }
               alt={ food.strMeal }
             />
             <p data-testid={ `${index}-card-name` }>
               {food.strIngredient}
             </p>
           </div>
         ))}
      <Footer />
    </section>);
}

export default ExploreFoodsIngredients;
