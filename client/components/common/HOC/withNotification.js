import React, { Component, Fragment } from 'react';
import { set } from 'lodash';

import Notification from '../Notification';

const withNotification = WrappedComponent => class extends Component {
  state = {
    open: false,
    message: '',
    type: 'error',
  }

  toggleNotification = (message = '', type = '') => {
    this.setState(({ open }) => {
      const updatedState = {
        open: !open,
      };

      if (message) {
        set(updatedState, 'message', message);
      }
      if (type) {
        set(updatedState, 'type', type);
      }
      return updatedState;
    });
  }

  render() {
    return (
      <Fragment>
        <WrappedComponent {...this.props} toggleNotification={this.toggleNotification} />
        <Notification {...this.state} toggle={this.toggleNotification} />
      </Fragment>
    );
  }
};

export default withNotification;
