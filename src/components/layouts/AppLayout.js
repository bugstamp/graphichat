import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import AppLayoutContainer from '../smart/AppLayoutContainer';
import AppContent from '../dumb/AppContent';

class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <AppLayoutContainer>
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
          checkSessionExpiration: {
            data: {
              sessionExpired = false,
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
              sessionExpired={sessionExpired}
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
