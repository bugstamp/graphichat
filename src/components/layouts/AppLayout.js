import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
// import {} from 'lodash';
import styled from 'styled-components';
import { size } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';
import ListPanel from '../common/ListPanel/ListPanel';
import MessagePanel from '../common/MessagePanel/MessagePanel';

import { getStyledProps, getSpacing } from '../../styles';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

const AppContent = styled(Paper)`
  && {
    ${size('100%')};
    display: flex;
    align-items: stretch;
  }
`;

const AppInfoPanel = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} ${getSpacing(2)};
    background-color: ${getStyledProps('theme.palette.background.default')};
  }
`;

class AppLayout extends Component {
  state = {}

  render() {
    // const { children } = this.props;

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
                <AppContent square elevation={0}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={4} lg={3}>
                      <ListPanel />
                    </Grid>
                    <Hidden xsDown>
                      <Grid item sm={8} lg={6}>
                        <MessagePanel />
                      </Grid>
                    </Hidden>
                    <Hidden mdDown>
                      <Grid item lg={3}>
                        <AppInfoPanel square elevation={0}>{null}</AppInfoPanel>
                      </Grid>
                    </Hidden>
                  </Grid>
                </AppContent>
              </Grid>
            </Grid>
          </AppContainer>
        </Grid>
      </Grid>
    );
  }
}

AppLayout.propTypes = {};

export default hot(module)(AppLayout);
