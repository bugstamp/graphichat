import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export const checkAuth = async (token) => {
  try {
    if (!token) {
      throw new Error('Token wasn\'t found');
    }
    const { data: { regStatus } } = await jwt.verify(token, process.env.TOKEN_SECRET);

    return regStatus;
  } catch (e) {
    throw e;
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
      const token = localStorage.getItem('chatkilla_tkn');
      const status = await checkAuth(token);

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

    return (
      <Choose>
        <When condition={render}>
          <Choose>
            <When condition={!auth}>
              <Redirect to="login" />
            </When>
            <When condition={auth && status === 'UNCOMPLETED'}>
              <Redirect to={`reg?step=2&token=${localStorage.getItem('chatkilla_tkn')}`} />
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
