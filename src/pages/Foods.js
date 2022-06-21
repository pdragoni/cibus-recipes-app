import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Foods() {
  const title = 'Foods';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(true);
  }, []);

  return (
    <section>
      <Header />
      Foods
      <Footer />
    </section>
  );
}

export default Foods;
