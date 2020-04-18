import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import storage from '../storage';

class PrivateRoute extends Component {
  state = {
    render: false,
    auth: false,
  }

  componentDidMount() {
    const token = storage.token.get();

    if (token) {
      this.setState({
        render: true,
        auth: true,
      });
    } else {
      this.setState({
        render: true,
      });
    }
  }

  render() {
    const { render, auth } = this.state;
    const { children } = this.props;

    return (
      <Choose>
        <When condition={render}>
          <Choose>
            <When condition={!auth}>
              <Redirect to="login" />
            </When>
            <Otherwise>
              {children}
            </Otherwise>
          </Choose>
        </When>
        <Otherwise>{null}</Otherwise>
      </Choose>
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default PrivateRoute;
