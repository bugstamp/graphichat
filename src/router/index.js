import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// import LoginLayout from '../components/layouts/LoginLayout';
// import AppLayout from '../components/layouts/AppLayout';

import Login from '../components/dumb/Login/Login';
import Reg from '../components/dumb/Reg/Reg';
import Chats from '../components/dumb/Chats/Chats';
import NotFound from '../components/common/NotFound';
import PageLoader from '../components/common/PageLoader';

import AppRoute from './AppRoute';

const LoginLayout = importedComponent(() => import('../components/layouts/LoginLayout'), {
  LoadingComponent: PageLoader,
});

const AppLayout = importedComponent(() => import('../components/layouts/AppLayout'), {
  LoadingComponent: PageLoader,
});

const NotFoundLayout = importedComponent(() => import('../components/layouts/NotFoundLayout'), {
  LoadingComponent: PageLoader,
});

const Routes = () => (
  <Switch>
    <AppRoute path="/login" layout={LoginLayout} component={Login} />
    <AppRoute path="/reg" layout={LoginLayout} component={Reg} />
    <AppRoute exact path="/" component={Redirect} to="/chats" redirect />
    <AppRoute path="/chats" layout={AppLayout} component={Chats} privateRoute />
    <AppRoute path="*" layout={NotFoundLayout} component={NotFound} />
  </Switch>
);

export default Routes;
