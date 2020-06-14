import React from 'react';
import { Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Login from '../components/pages/login';
import Reg from '../components/pages/reg';
import Chat from '../components/pages/chat';

import NotFound from '../components/common/NotFound';
import PageLoader from '../components/common/PageLoader';

import AppRoute from './AppRoute';

const LoginLayout = importedComponent(() => import(/* webpackChunkName: "login" */'../components/layouts/LoginLayout'), {
  LoadingComponent: PageLoader,
});

const AppLayout = importedComponent(() => import(/* webpackChunkName: "chat" */'../components/layouts/AppLayout'), {
  LoadingComponent: PageLoader,
});

const NotFoundLayout = importedComponent(() => import(/* webpackChunkName: "unknown" */'../components/layouts/NotFoundLayout'), {
  LoadingComponent: PageLoader,
});

const Routes = () => (
  <Switch>
    <AppRoute path="/login" layout={LoginLayout} component={Login} />
    <AppRoute path="/reg" layout={LoginLayout} component={Reg} />
    <AppRoute path="/" layout={AppLayout} component={Chat} privateRoute />
    <AppRoute path="*" layout={NotFoundLayout} component={NotFound} />
  </Switch>
);

export default Routes;
