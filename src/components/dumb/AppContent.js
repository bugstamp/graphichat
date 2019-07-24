import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'polished';
import { isEqual } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import SettingsDialog from './SettingsDialog';
import Navigation from '../common/Navigation/Navigation';
import withNotification from '../common/HOC/withNotification';

import { getAvatar } from '../../helpers';
import { meProps } from '../propTypes';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

class AppContent extends Component {
  state = {
    settingsDialog: false,
  }

  componentDidUpdate = (prevProps) => {
    const { sessionExpired, toggleNotification } = this.props;

    if (!isEqual(prevProps.sessionExpired, sessionExpired) && sessionExpired) {
      this.signOut();
      toggleNotification('SessionExpired was expired');
    }
  }

  toggleSettingsDialog = () => {
    this.setState(({ settingsDialog }) => ({ settingsDialog: !settingsDialog }));
  }

  signOut = () => {
    const { me, signOut } = this.props;
    const { id } = me;

    signOut({ variables: { userId: id } });
  }

  render() {
    const { settingsDialog } = this.state;
    const {
      children,
      loading,
      me,
      avatarUploading,
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
                    signOut={this.signOut}
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
  me: PropTypes.shape(meProps),
  sessionExpired: PropTypes.bool.isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(AppContent);
