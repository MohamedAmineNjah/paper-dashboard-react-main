import React from 'react';
import {  BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Home from './home';

const Routes = ({}) => (
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={Home} />
        {/* <Route exact path="/:id/edit" component={edit} /> */}
      </Switch>
    </Router>

  </>
);

export default Routes;

