import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExploreFoodsIngredients() {
  const title = 'Explore Ingredients';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);
  return (
    <section>
      <Header />
      <Footer />
    </section>);
}

export default ExploreFoodsIngredients;
