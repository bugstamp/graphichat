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

import { getAvatar } from '../../helpers';
import { meProps } from '../propTypes';

const MainContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

class MainPage extends Component {
  state = {
    settingsDialog: false,
  }

  componentDidUpdate = (prevProps) => {
    const { sessionExpired } = this.props;

    if (!isEqual(prevProps.sessionExpired, sessionExpired) && sessionExpired) {
      this.signOut();
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
          <MainContainer square>
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
          </MainContainer>
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

MainPage.defaultProps = {
  me: {},
};
MainPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  loading: PropTypes.bool.isRequired,
  me: PropTypes.shape(meProps),
  sessionExpired: PropTypes.bool.isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default MainPage;
