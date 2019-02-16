import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

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
        <When condition={privateRoute}>
          <PrivateRoute>
            <Layout>
              <Component {...props} />
            </Layout>
          </PrivateRoute>
        </When>
        <When condition={!Layout}>
          <Component {...props} />
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

AppRoute.defaultProps = {
  layout: null,
  privateRoute: false,
};
AppRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
  privateRoute: PropTypes.bool,
};

export default AppRoute;
