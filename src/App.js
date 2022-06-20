import React from 'react';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <h1>Teste</h1>
      <Login />
    </Provider>
  );
}

export default App;
