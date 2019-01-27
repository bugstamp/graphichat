import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const isAuth = localStorage.getItem('chatkilla_token');

const AppRoute = ({
  component: Component,
  layout: Layout,
  privateRoute,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Choose>
        <When condition={privateRoute && !isAuth}>
          <Redirect to="login" />
        </When>
        <When condition={!Layout}>
          <Fragment>
            <Component {...props} />
          </Fragment>
        </When>
        <Otherwise>
          <Layout>
            <Component {...props} />
          </Layout>
        </Otherwise>
      </Choose>
    )}
  />
);

export default AppRoute;
