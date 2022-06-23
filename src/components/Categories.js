import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';
// import { useHistory } from 'react-router-dom';

function Categories() {
  const { pageTitle } = useContext(Context);
  const [categoriesArr, setCategoriesArr] = useState([]);
  // const history = useHistory();
  const CINCO = 5;

  const fetchCategories = async (URL) => {
    const response = await fetch(URL);
    const responseJson = await response.json();
    const categories = Object.values(responseJson)[0];
    const categoriesFilter = categories.filter((element, index2) => index2 < CINCO);
    console.log(categoriesFilter);
    setCategoriesArr(categoriesFilter);
  };

  useEffect(() => {
    const handleFetch = () => {
      let baseUrl = '';
      if (pageTitle === 'Drinks') {
        baseUrl = 'thecocktaildb';
      } else {
        baseUrl = 'themealdb';
      }
      const URL = `https://www.${baseUrl}.com/api/json/v1/1/list.php?c=list`;
      fetchCategories(URL);
    };
    handleFetch();
  }, []);

  return (
    <div className="categories-div">
      <h4>Categories</h4>
      {
        categoriesArr
          .map((category, index) => (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
            >
              { category.strCategory }
            </button>
          ))
      }
    </div>
  );
}

export default Categories;
