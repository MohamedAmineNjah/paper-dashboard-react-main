import React from 'react';
import {  BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Home from './home';
import BlogUpdate from './blog-update'

const Routes = ({}) => (
  <>
    <Router>
      <Switch>
        <Route exact path="/new" component={Home} />
        <Route exact path="/admin/:id/edit" component={BlogUpdate} />
      </Switch>
    </Router>

  </>
);

export default Routes;

