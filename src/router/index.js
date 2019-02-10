import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// import LoginLayout from '../components/layouts/LoginLayout';
// import ChatLayout from '../components/layouts/ChatLayout';

import Home from '../components/common/Home';
import LoginContainer from '../components/smart/LoginContainer';
import RegContainer from '../components/smart/RegContainer';
import NotFound from '../components/common/NotFound';
import PageLoader from '../components/ui/PageLoader';

import AppRoute from './AppRoute';

const LoginLayout = Loadable({
  loader: () => import('../components/layouts/LoginLayout'),
  loading: PageLoader,
});

const ChatLayout = Loadable({
  loader: () => import('../components/layouts/ChatLayout'),
  loading: PageLoader,
});

// const NotFound = Loadable({
//   loader: () => import('../components/common/NotFound'),
//   loading: PageLoader,
// });

const Routes = () => (
  <Switch>
    <AppRoute exact path="/login" layout={LoginLayout} component={LoginContainer} />
    <AppRoute exact path="/reg" layout={LoginLayout} component={RegContainer} />
    <AppRoute exact path="/" layout={ChatLayout} component={Home} privateRoute />
    <AppRoute component={NotFound} />
  </Switch>
);

export default Routes;
