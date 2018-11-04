import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Spinner from '../components/ui/Spinner';

const Home = Loadable({
  loader: () => import('../components/common/Home'),
  loading: Spinner,
});

const NotFound = Loadable({
  loader: () => import('../components/common/NotFound'),
  loading: Spinner,
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
