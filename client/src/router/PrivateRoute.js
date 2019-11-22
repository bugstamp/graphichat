import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import storage, { checkToken } from '../storage';

class PrivateRoute extends Component {
  state = {
    render: false,
    auth: false,
    status: '',
  }

  componentDidMount() {
    const token = storage.token.get();

    if (token) {
      try {
        const { regStatus } = checkToken(token, false);

        this.setState({
          render: true,
          auth: true,
          status: regStatus,
        });
      } catch (e) {
        throw e;
      }
    } else {
      this.setState({
        render: true,
      });
    }
  }

  render() {
    const { render, auth, status } = this.state;
    const { children } = this.props;

    return (
      <Choose>
        <When condition={render}>
          <Choose>
            <When condition={!auth}>
              <Redirect to="login" />
            </When>
            <When condition={auth && status === 'UNCOMPLETED'}>
              <Redirect to={`reg?token=${storage.token.get()}`} />
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
