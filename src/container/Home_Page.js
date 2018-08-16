import React from 'react';
import { Button } from '../components/FormElements';
import HomepageImg from '../img/homepage.jpg';

require('./HomePage.css');

const HomePage = () => (
  <div className="homepage">
    <img className="homepage__img" src={HomepageImg} alt="fashion for men" />
    <div className="homepage__content">
      <h1 className="homepage__title">Shopping for men</h1>
      <span className="homepage__subtitle">Your personal style expert will create individual Outfits for you</span>
      <Button className="homepage__button" as="a" href="/calendar" label="get started" />
    </div>
  </div>
);

export default HomePage;
