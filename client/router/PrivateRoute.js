import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import storage from '../storage';

const tokenSecrets = {
  token: process.env.TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};

export const checkToken = async (token, set = false, secretType = 'token') => {
  try {
    if (!token) {
      throw new Error('Token wasn\'t found');
    }
    const secret = tokenSecrets[secretType];
    const { data: { regStatus } } = await jwt.verify(token, secret);

    if (set) {
      storage.token.set(token);
    }
    return { regStatus };
  } catch (e) {
    return { regStatus: '' };
  }
};

class PrivateRoute extends Component {
  state = {
    render: false,
    auth: false,
    status: '',
  }

  async componentDidMount() {
    const token = storage.token.get();

    if (token) {
      try {
        const { regStatus } = await checkToken(token, false);

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
