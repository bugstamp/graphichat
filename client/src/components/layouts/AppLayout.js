import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { get } from 'lodash';

import AppLayoutContainer from '../containers/AppLayoutContainer';
import MainPage from '../pages/MainPage';

const AppLayout = ({ children }) => (
  <AppLayoutContainer>
    {({
      getInitialData: {
        data: initialData,
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
        data: sessionData,
      },
      updateUser: {
        mutation: updateUser,
        result: {
          loading: updating,
          error: userUpdatingError,
        },
      },
    }) => {
      const me = get(initialData, 'me', {});
      const sessionExpired = get(sessionData, 'sessionExpired', false);

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

AppLayout.defaultProps = {
  children: null,
};
AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default hot(module)(AppLayout);
