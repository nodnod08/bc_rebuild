import React, { Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import Index from './components/Index';
import Trends from './components/Trends';
import Forums from './components/Forums';
import Forum from './components/Forum';
import Teams from './components/Teams';
import Signin from './components/Signin';
import Register from './components/Register';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header/>
          <Switch>
            <Fragment>
              <div className="container mt-5">
                <Route exact path="/" component={ Index }/>
                <Route path="/trendings" component={ Trends }/>
                <Route path="/forums" component={ Forums }/>
                <Route path="/forum/:id" component={ Forum }/>
                <Route path="/teams" component={ Teams }/>
                <Route path="/register" component={ Register } />
                <Route path="/signin" component={ Signin } />
              </div>
            </Fragment>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
