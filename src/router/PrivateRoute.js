import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import storage from '../actions/storage';

const tokenSecret = process.env.TOKEN_SECRET;

export const checkToken = async (token, set = false) => {
  try {
    if (!token) {
      throw new Error('Token wasn\'t found');
    }
    const { data: { regStatus } } = await jwt.verify(token, tokenSecret);

    if (set) {
      storage.token.set(token);
    }
    return regStatus;
  } catch (e) {
    throw new Error(e.message);
  }
};

class PrivateRoute extends Component {
  state = {
    render: false,
    auth: false,
    status: '',
  }

  async componentDidMount() {
    try {
      const token = storage.token.get();
      const status = await checkToken(token);

      this.setState({
        render: true,
        auth: true,
        status,
      });
    } catch (e) {
      this.setState({
        render: true,
        auth: false,
        status: '',
      });
    }
  }

  render() {
    const { render, auth, status } = this.state;
    const { children } = this.props;
    const regRedirect = `reg?token=${storage.token.get()}`;

    return (
      <Choose>
        <When condition={render}>
          <Choose>
            <When condition={!auth}>
              <Redirect to="login" />
            </When>
            <When condition={auth && status === 'UNCOMPLETED'}>
              <Redirect to={regRedirect} />
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
