import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'polished';
// import {} from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';

import SettingsDialog from './SettingsDialog';

import { getAvatar } from '../../helpers';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

class AppContent extends Component {
  state = {
    settingsDialog: false,
  }

  toggleSettingsDialog = () => {
    this.setState(({ settingsDialog }) => ({ settingsDialog: !settingsDialog }));
  }

  render() {
    const { settingsDialog } = this.state;
    const {
      children,
      loading,
      me,
      avatarUploading,
      signOut,
      uploadAvatar,
    } = this.props;
    const avatar = getAvatar(me, 'md');

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} lg={10}>
          <AppContainer square>
            <Grid container spacing={0}>
              <Hidden smDown>
                <Grid item>
                  <Navigation
                    toggleSettingsDialog={this.toggleSettingsDialog}
                    signOut={signOut}
                  />
                </Grid>
              </Hidden>
              <Grid item xs>
                {cloneElement(children, { initialLoading: loading })}
              </Grid>
            </Grid>
          </AppContainer>
        </Grid>
        <SettingsDialog
          open={settingsDialog}
          toggle={this.toggleSettingsDialog}
          avatar={avatar}
          avatarUploading={avatarUploading}
          uploadAvatar={uploadAvatar}
        />
      </Grid>
    );
  }
}

AppContent.defaultProps = {
  me: {},
};
AppContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  loading: PropTypes.bool.isRequired,
  me: PropTypes.shape({
    avatar: PropTypes.shape({
      sm: PropTypes.string,
      md: PropTypes.string,
    }),
    displayName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.oneOf(['ONLINE', 'OFFLINE']),
    username: PropTypes.string,
  }),
  avatarUploading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default AppContent;
