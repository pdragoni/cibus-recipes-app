import React from 'react';
import Header from '../components/Header';

function Profile() {
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
    </div>);
}

export default Profile;
