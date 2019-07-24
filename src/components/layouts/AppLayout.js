import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import AppLayoutContainer from '../containers/AppLayoutContainer';
import MainContent from '../pages/MainContent';

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
            <MainContent
              loading={loading}
              me={me}
              signOut={signOut}
              avatarUploading={avatarUploading}
              uploadAvatar={uploadAvatar}
              sessionExpired={sessionExpired}
            >
              {children}
            </MainContent>
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
