import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
// import { isEmpty } from 'lodash';
import { size } from 'polished';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import AppLayoutContainer from '../smart/AppLayoutContainer';
import Navigation from '../common/Navigation/Navigation';

import storage from '../../actions/storage';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

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
      <AppLayoutContainer
        signOutProps={{
          onCompleted: this.signOut,
        }}
        getSessionExpiredProps={{
          onCompleted: ({ sessionExpired }) => {
            if (sessionExpired) {
              this.signOut();
            }
          },
        }}
      >
        {({ signOut }) => {
          // if (loading) {
          //   return 'Loading...';
          // }
          return (
            <Grid container spacing={0} justify="center">
              <Grid item xs={12} lg={10}>
                <AppContainer square>
                  <Grid container spacing={0}>
                    <Hidden smDown>
                      <Grid item>
                        <Navigation signOut={signOut.mutation} />
                      </Grid>
                    </Hidden>
                    <Grid item xs>
                      {children}
                    </Grid>
                  </Grid>
                </AppContainer>
              </Grid>
            </Grid>
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
