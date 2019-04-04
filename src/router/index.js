import React from 'react';
import { Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// import LoginLayout from '../components/layouts/LoginLayout';
// import AppLayout from '../components/layouts/AppLayout';

import Home from '../components/common/Home';
import Login from '../components/dumb/Login/Login';
import Reg from '../components/dumb/Reg/Reg';
// import NotFound from '../components/common/NotFound';
import PageLoader from '../components/common/PageLoader';

import AppRoute from './AppRoute';

const LoginLayout = importedComponent(() => import('../components/layouts/LoginLayout'), {
  LoadingComponent: PageLoader,
});

const AppLayout = importedComponent(() => import('../components/layouts/AppLayout'), {
  LoadingComponent: PageLoader,
});


// const NotFound = Loadable({
//   loader: () => import('../components/common/NotFound'),
//   loading: PageLoader,
// });

const Routes = () => (
  <Switch>
    <AppRoute path="/login" layout={LoginLayout} component={Login} />
    <AppRoute path="/reg" layout={LoginLayout} component={Reg} />
    <AppRoute exact path="/" layout={AppLayout} component={Home} privateRoute />
    <AppRoute path="/person" layout={AppLayout} component={Home} privateRoute />
    <AppRoute path="/group" layout={AppLayout} component={Home} privateRoute />
    <AppRoute path="/saved" layout={AppLayout} component={Home} privateRoute />
    {/* <AppRoute component={NotFound} /> */}
  </Switch>
);

export default Routes;
