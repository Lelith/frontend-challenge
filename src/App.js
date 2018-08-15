import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './container/Home_Page';
import CalendarPage from './container/Calendar_Page';
import SuccessPage from './container/Success_Page';
import Error from './container/Error';
import './style/base.css';

export default () => (
  <Router>
    <div className="base">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/success" component={SuccessPage} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </div>
  </Router>
);
