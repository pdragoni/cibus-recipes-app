import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function FoodsDetail() {
  const title = 'FoodsDetail';
  const { setPageTitle, setSearchPageButton } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
  }, []);

  return (
    <section>
      <Header />
      FoodsDetail
      <Footer />
    </section>
  );
}

export default FoodsDetail;
