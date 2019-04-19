import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// import LoginLayout from '../components/layouts/LoginLayout';
// import AppLayout from '../components/layouts/AppLayout';

import Login from '../components/dumb/Login/Login';
import Reg from '../components/dumb/Reg/Reg';
import Contacts from '../components/dumb/Contacts/Contacts';
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
    <AppRoute exact path="/" component={Redirect} to="/contacts" redirect />
    <AppRoute path="/contacts" layout={AppLayout} component={Contacts} privateRoute />
    {/* <AppRoute component={NotFound} /> */}
  </Switch>
);

export default Routes;
