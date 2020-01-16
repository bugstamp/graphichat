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
      checkSessionExpiration: {
        data: sessionData,
      },
      signOut: {
        mutation: signOut,
      },
    }) => {
      const userId = get(initialData, 'me.id', null);
      const sessionExpired = get(sessionData, 'sessionExpired', false);

      return (
        <MainPage
          loading={loading}
          userId={userId}
          signOut={signOut}
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
export { AppLayout };
