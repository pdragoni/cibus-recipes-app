import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function ExplorerFoods() {
  const title = 'Explore Foods';
  const { setPageTitle } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <section>
      <Header />
      <h1>ExplorerFoods</h1>
      <Footer />
    </section>
  );
}

export default ExplorerFoods;
