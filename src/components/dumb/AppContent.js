import React, { Component, createRef } from 'react';
// import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import { size, position } from 'polished';
import { isEqual } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';

import Navigation from '../common/Navigation/Navigation';
import TopLineProgress from '../common/TopLineProgress';

import { getAvatarInitials } from '../../helpers';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
`;

const SettingsDialogWrapper = styled(DialogContent)`
  && {
    min-width: 400px;
  }
`;

const AvatarContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
`;

const AvatarStyled = styled(Avatar)`
  && {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

class AppContent extends Component {
  state = {
    settingsDialog: false,
    cropDialog: false,
    file: null,
  }

  inputRef = createRef();

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

  toggleSettingsDialog = () => {
    this.setState(({ settingsDialog }) => ({ settingsDialog: !settingsDialog }));
  }

  toggleCropDialog = () => {
    this.setState(({ cropDialog }) => ({ cropDialog: !cropDialog }));
  }

  onChangeAvatar = async ({
    target: {
      files: [file],
      validity: { valid },
    },
  }) => {
    const { uploadAvatar } = this.props;

    if (valid) {
      uploadAvatar({ variables: { file } });
    }
  }

  onAvatarClick = () => {
    if (this.inputRef) {
      this.inputRef.current.click();
    }
  }

  render() {
    const { settingsDialog, cropDialog, file } = this.state;
    const { children, user, signOut, uploading } = this.props;
    const avatarText = getAvatarInitials(user);

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
                {children}
              </Grid>
            </Grid>
          </AppContainer>
        </Grid>
        <Dialog open={settingsDialog} onClose={this.toggleSettingsDialog}>
          <TopLineProgress loading={uploading} />
          <DialogTitle>Settings</DialogTitle>
          <SettingsDialogWrapper>
            <AvatarContainer>
              <input
                ref={this.inputRef}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={this.onChangeAvatar}
                style={{ display: 'none' }}
              />
              <AvatarStyled
                src={(user && user.avatar) && user.avatar.md}
                alt={avatarText}
                onClick={this.onAvatarClick}
              >
                <CameraIcon fontSize="large" />
              </AvatarStyled>
            </AvatarContainer>
          </SettingsDialogWrapper>
        </Dialog>
        {/* <Dialog open={cropDialog} onClose={this.toggleCropDialog}>
          <DialogContent>
            <Cropper />
          </DialogContent>
        </Dialog> */}
      </Grid>
    );
  }
}

export default AppContent;
