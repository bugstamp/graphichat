import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
// import { isEmpty } from 'lodash';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import AppLayoutContainer from '../smart/AppLayoutContainer';
import AppContent from '../dumb/AppContent';
import { AppContext } from '../context/AppProvider';

import storage from '../../storage';

class AppLayout extends Component {
  signOut = () => {
    const { history, client } = this.props;

    storage.removeTokens();
    client.resetStore();
    history.push('/');
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Consumer>
        {({ setUser }) => (
          <AppLayoutContainer
            signOutProps={{
              onCompleted: this.signOut,
            }}
            checkSessionExpirationProps={{
              onCompleted: ({ sessionExpired }) => {
                if (sessionExpired) {
                  this.signOut();
                }
              },
            }}
          >
            {({ signOut, getInitialData: { data: { me } } }) => {
              return (
                <AppContent
                  user={me}
                  setUserToContext={setUser}
                  signOut={signOut.mutation}
                >
                  {children}
                </AppContent>
              );
            }}
          </AppLayoutContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(withApollo(withRouter(AppLayout)));
