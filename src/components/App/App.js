import React from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

import CakesList from '../CakesList';
import CakeDetails from '../CakeDetails';
import NewCake from '../NewCake';

import './App.css';

const App = () => (
  <Container>
    <h1>Cakes</h1>
    <Switch>
      <Route exact path="/" component={CakesList} />
      <Route path="/new" component={NewCake} />
      <Route path="/cake/:id" component={CakeDetails} />
    </Switch>
  </Container>
);

export default App;
