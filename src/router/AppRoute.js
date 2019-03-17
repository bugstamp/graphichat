import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const AppRoute = ({
  component: Component,
  layout: Layout,
  privateRoute,
  ...rest
}) => {
  const render = props => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return (
    <Route
      {...rest}
      render={props => (
        <Choose>
          <When condition={privateRoute}>
            <PrivateRoute>
              {render(props)}
            </PrivateRoute>
          </When>
          <Otherwise>
            {render(props)}
          </Otherwise>
        </Choose>
      )}
    />
  );
};

AppRoute.defaultProps = {
  privateRoute: false,
};
AppRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  privateRoute: PropTypes.bool,
};

export default AppRoute;
