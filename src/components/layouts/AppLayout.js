import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
// import { isEmpty } from 'lodash';

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
        signOutProps={{
          onCompleted: this.signOut,
        }}
        checkSessionExpirationProps={{
          onCompleted: this.onSessionExpired,
        }}
      >
        {({
          getInitialData: {
            data: { me },
            loading,
          },
          signOut: {
            mutation: signOut,
          },
          uploadAvatar: {
            mutation: uploadAvatar,
            result: {
              loading: avatarUploading,
            },
          },
        }) => {
          return (
            <AppContent
              loading={loading}
              me={me}
              signOut={signOut}
              avatarUploading={avatarUploading}
              uploadAvatar={uploadAvatar}
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default hot(module)(withApollo(withRouter(AppLayout)));
