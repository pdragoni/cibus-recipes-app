import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function DoneRecipes() {
  const title = 'DoneRecipes';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <section>
      <Header />
    </section>);
}

export default DoneRecipes;
