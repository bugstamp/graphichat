import React, { Component } from 'react';
import styled from 'styled-components';
import { size } from 'polished';
import { isEqual } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

class AppContent extends Component {
  componentDidMount() {
    const { loading, setFetchingToContext } = this.props;

    if (loading) {
      setFetchingToContext(loading);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      loading,
      user,
      setUserToContext,
      setFetchingToContext,
    } = this.props;

    if (!prevProps.user && user) {
      setUserToContext(user);
    }
    if (!isEqual(prevProps.loading, loading)) {
      setFetchingToContext(loading);
    }
  }

  render() {
    const { children, signOut } = this.props;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} lg={10}>
          <AppContainer square>
            <Grid container spacing={0}>
              <Hidden smDown>
                <Grid item>
                  <Navigation signOut={signOut} />
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
  }
}

export default AppContent;
