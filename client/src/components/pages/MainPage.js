import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEqual } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import SettingsDialog from './SettingsDialog';
import Navigation from '../common/Navigation/Navigation';

import { getStyledProps } from '../../styles';
import { getAvatar } from '../../helpers';
import { meProps } from '../propTypes';

const AppWrapper = styled(Grid)`
  && {
    background-color: ${getStyledProps('theme.palette.primary.light')};
  }
`;

const MainPageWrapper = styled(Paper)`
  && {
    flex: 1 auto;
    display: flex;
    overflow: hidden;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const lgUp = breakpoints.up('lg');
    const mdDown = breakpoints.down('md');

    return `
      ${lgUp} {
        margin: 20px 40px;
      }
      ${mdDown} {
        border-radius: 0;
      }
    `;
  }};
  }
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
      updating,
      updateUser,
      userUpdatingError,
    } = this.props;
    const avatar = getAvatar(me, 'md');
    const childrenClone = children
      ? cloneElement(children, {
        initialLoading: loading,
        toggleSettingsDialog: this.toggleSettingsDialog,
        signOut: this.signOut,
      })
      : null;

    return (
      <AppWrapper container spacing={0} justify="center">
        <MainPageWrapper>
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
              {childrenClone}
            </Grid>
          </Grid>
        </MainPageWrapper>
        <SettingsDialog
          me={me}
          open={settingsDialog}
          toggle={this.toggleSettingsDialog}
          avatar={avatar}
          avatarUploading={avatarUploading}
          uploadAvatar={uploadAvatar}
          updating={updating}
          updateUser={updateUser}
          error={userUpdatingError}
        />
      </AppWrapper>
    );
  }
}

MainPage.defaultProps = {
  children: null,
  me: {},
  userUpdatingError: null,
};
MainPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  loading: PropTypes.bool.isRequired,
  me: PropTypes.shape(meProps),
  sessionExpired: PropTypes.bool.isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  userUpdatingError: PropTypes.instanceOf(Error),
};

export default MainPage;
