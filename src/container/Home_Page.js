import React from 'react';
import { Button } from '../components/FormElements';

const HomePage = () => (
  <div className="pageContent">
    <h1>Home</h1>
    <Button as="a" href="/calendar" label="get started" />
  </div>
);

export default HomePage;
