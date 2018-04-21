import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';

import NotFound from './Containers/NotFound';
import Buscador from './Containers/Buscador';

const Routes = (props) => {
  return (
    <Router {...props} >
      <Switch>
        <Route exact path="/" render={() => <Redirect to="buscador"/>}/>
        <Route path="/buscador" component={Buscador} ></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
};

export default Routes;
