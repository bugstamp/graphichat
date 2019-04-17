import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
// import {} from 'lodash';
import { size } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} lg={10}>
          <AppContainer square>
            <Grid container spacing={0}>
              <Hidden smDown>
                <Grid item>
                  <Navigation />
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

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(AppLayout);
