import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerDrinks() {
  const title = 'Explore Drinks';
  const { setPageTitle } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
  }, []);
  return (
    <section>
      <Header />
      <h1>ExplorerDrinks</h1>
      <Footer />
    </section>
  );
}

export default ExplorerDrinks;
