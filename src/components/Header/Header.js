import React from 'react';
import SVG from 'react-inlinesvg';
import Logo from '../../img/logo.svg';

import './Header.css';

const Header = () => (
  <header className="header">
    <a href="/" title="home">
      <SVG src={Logo} alt="outfittery" />
    </a>
  </header>
);

export default Header;
