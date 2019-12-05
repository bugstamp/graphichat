import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const AppRoute = ({
  component: Component,
  layout: Layout,
  privateRoute,
  redirect,
  to,
  ...rest
}) => {
  const renderLayout = props => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  const render = props => (
    <Choose>
      <When condition={redirect}>
        <Component to={to} />
      </When>
      <When condition={privateRoute}>
        <PrivateRoute>
          {renderLayout(props)}
        </PrivateRoute>
      </When>
      <Otherwise>
        {renderLayout(props)}
      </Otherwise>
    </Choose>
  );

  return (<Route {...rest} render={render} />);
};

AppRoute.defaultProps = {
  privateRoute: false,
  layout: null,
  redirect: false,
  to: '',
};
AppRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  privateRoute: PropTypes.bool,
  redirect: PropTypes.bool,
  to: PropTypes.string,
};

export default AppRoute;
