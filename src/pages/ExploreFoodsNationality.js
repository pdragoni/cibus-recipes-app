import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerFoodsNationality() {
  const title = 'Explore Nationalities';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);
  return (
    <section>
      <Header />
      <h1>
        ExplorerFoods by Nationality
      </h1>
      <Footer />
    </section>);
}

export default ExplorerFoodsNationality;
