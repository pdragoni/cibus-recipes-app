import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Profile() {
  const title = 'Profile';
  const { setPageTitle } = useContext(Context);

  useEffect(() => {
    setPageTitle(title);
  }, []);

  return (
    <div>
      <Header />
      <body>
        <p>Name</p>
        <p>Email</p>
        <p>Link pra alterar senha</p>
        <button
          type="button"
          onClick={ () => { console.log('Comidas'); } }
        >
          Comidas
        </button>
        <button
          type="button"
          onClick={ () => { console.log('bebidas'); } }
        >
          Bebidas
        </button>
      </body>
      <Footer />
    </div>);
}

export default Profile;
