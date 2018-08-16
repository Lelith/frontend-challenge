import React from 'react';
import SVG from 'react-inlinesvg';
import Logo from '../../img/logo_dark.svg';

require('./Footer.css');

const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <a href="#">Terms</a>
      <a href="#">Imprint</a>
      <a href="#">Privacy</a>
    </nav>
    <SVG src={Logo} />
  </footer>
);

export default Footer;
