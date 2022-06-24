import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';

function Categories() {
  const { pageTitle, setToggle, toggle, setResults, filteredArray } = useContext(Context);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [categoryClicked, setCategoryClicked] = useState('');
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
      } else if (pageTitle !== 'Drinks') {
        baseUrl = 'themealdb';
      }
      const URL = `https://www.${baseUrl}.com/api/json/v1/1/list.php?c=list`;
      fetchCategories(URL);
    };
    handleFetch();
  }, [pageTitle]);

  // https://www.themealdb.com/api.php
  // https://www.thecocktaildb.com/api.php
  // www.themealdb.com/api/json/v1/1/filter.php?c=Seafood filter by category
  // www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail filtra categoria
  const handleCategory = async ({ target }) => {
    const categoryName = target.value;
    let baseUrl = '';
    if (pageTitle === 'Drinks') {
      baseUrl = 'thecocktaildb';
    } else {
      baseUrl = 'themealdb';
    }
    const categoryURL = `https://www.${baseUrl}.com/api/json/v1/1/filter.php?c=${categoryName}`;
    const response = await fetch(categoryURL);
    const responseJson = await response.json();
    const filteredCategory = Object.values(responseJson)[0];
    if (!toggle) { // se modoFiltro está true (ativado)
      setCategoryClicked(categoryName);
      setResults(filteredCategory); // filtra por categoria
    } else if (toggle && categoryClicked === categoryName) {
      setResults(filteredArray); // aparece tudo
      setToggle(!toggle);
    } else if (toggle) {
      setResults(filteredCategory);
      setCategoryClicked(categoryName);
    }
    // se modoFiltro está falso (desativado)
    setToggle(!toggle);
  };

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
              onClick={ handleCategory }
              value={ category.strCategory }
            >
              { category.strCategory }
            </button>
          ))
      }
    </div>
  );
}

export default Categories;
