import React from 'react';
import img1 from '../images/profileIcon.svg';
import img2 from '../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <button data-testid="profile-top-btn" type="button">
        <img src={ img1 } alt="foto-de-perfil" />
      </button>
      <h2 data-testid="page-title">HEADER123</h2>
      <input type="text" />
      <button type="button" data-testid="search-top-btn">
        <img src={ img2 } alt="131231" />
      </button>
    </div>
  );
}

export default Header;
