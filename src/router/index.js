import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import PageLoader from '../components/ui/PageLoader';

const Home = Loadable({
  loader: () => import('../components/common/Home'),
  loading: PageLoader,
});

const Login = Loadable({
  loader: () => import('../components/common/Login'),
  loading: PageLoader,
});

const NotFound = Loadable({
  loader: () => import('../components/common/NotFound'),
  loading: PageLoader,
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
