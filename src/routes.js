import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';

import NotFound from './Containers/NotFound';
import Buscador from './Containers/Buscador';
import AppWrapper from './Containers/AppWrapper'
import Resultados from './Containers/Resultados'

const Routes = (props) => {
  return (
    <Router {...props} >
      <AppWrapper>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="buscador"/>}/>
          <Route path="/buscador" component={Buscador} ></Route>
          <Route path="/resultados" component={Resultados} ></Route>
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    </Router>
  )
};

export default Routes;
