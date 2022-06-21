import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinksIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);
  return (
    <h1>
      <Header />
      ExplorerDrinks by ingredients
      <Footer />
    </h1>);
}

export default ExplorerDrinksIngredients;
