import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
// import { isEmpty } from 'lodash';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import AppLayoutContainer from '../smart/AppLayoutContainer';
import AppContent from '../dumb/AppContent';

import storage from '../../storage';

class AppLayout extends Component {
  signOut = () => {
    const { history, client } = this.props;

    storage.removeTokens();
    client.resetStore();
    history.push('/');
  }

  onSessionExpired = ({ sessionExpired }) => {
    if (sessionExpired) {
      this.signOut();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <AppLayoutContainer
        signOutProps={{ onCompleted: this.signOut }}
        checkSessionExpirationProps={{ onCompleted: this.onSessionExpired }}
      >
        {({
          getInitialData: { data: { me }, loading },
          signOut: { mutation: signOut },
          uploadAvatar: { mutation: uploadAvatar, result: { loading: uploading } },
        }) => {
          return (
            <AppContent
              loading={loading}
              me={me}
              signOut={signOut}
              uploadAvatar={uploadAvatar}
              uploading={uploading}
            >
              {children}
            </AppContent>
          );
        }}
      </AppLayoutContainer>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(withApollo(withRouter(AppLayout)));
