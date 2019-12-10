import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';

import AppLayoutContainer from '../containers/AppLayoutContainer';
import MainPage from '../pages/MainPage';

class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <AppLayoutContainer>
        {({
          getInitialData: {
            data: { me = {} },
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
            data: { sessionExpired = false },
          },
          updateUser: {
            mutation: updateUser,
            result: {
              loading: updating,
              error: userUpdatingError,
            },
          },
        }) => {
          return (
            <MainPage
              loading={loading}
              me={me}
              signOut={signOut}
              avatarUploading={avatarUploading}
              uploadAvatar={uploadAvatar}
              updating={updating}
              updateUser={updateUser}
              userUpdatingError={userUpdatingError}
              sessionExpired={sessionExpired}
            >
              {children}
            </MainPage>
          );
        }}
      </AppLayoutContainer>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(withRouter(AppLayout));
