import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Explorer() {
  const title = 'Explore';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <section>
      <Header />
      Explorer
      <Footer />
    </section>);
}

export default Explorer;
