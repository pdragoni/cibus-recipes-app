import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Drinks() {
  const title = 'Drinks';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);

  return (
    <section>
      <Header />
      Drinks
      <Footer />
    </section>
  );
}

export default Drinks;
