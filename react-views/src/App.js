import React, { Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import Index from './components/Index';
import Trends from './components/Trends';
import Forums from './components/Forums';
import Teams from './components/Teams';
import Signin from './components/Signin';
import Register from './components/Register';

import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Fragment>
            <div className="container mt-5">
              <Route exact path="/">
                <Index />
              </Route>
              <Route path="/trendings">
                <Trends />
              </Route>
              <Route path="/forums">
                <Forums />
              </Route>
              <Route path="/teams">
                <Teams />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
            </div>
          </Fragment>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
