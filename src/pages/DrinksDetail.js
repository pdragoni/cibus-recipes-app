import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function DrinksDetail() {
  const title = 'DrinksDetail';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <section>
      <Header />
      DrinksDetail
      <Footer />
    </section>
  );
}

export default DrinksDetail;
