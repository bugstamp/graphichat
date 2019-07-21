import React, { Component, createRef, cloneElement } from 'react';
// import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import { size } from 'polished';
// import {} from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';

import Navigation from '../common/Navigation/Navigation';
import TopLineProgress from '../common/TopLineProgress';

import { getAvatar } from '../../helpers';

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

const Avatar = styled(MaterialAvatar)`
  && {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

class AppContent extends Component {
  state = {
    settingsDialog: false,
  }

  input = createRef();

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
    if (this.input) {
      this.input.current.click();
    }
  }

  render() {
    const { settingsDialog } = this.state;
    const {
      children,
      loading,
      me,
      uploading,
      signOut,
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
        <Dialog open={settingsDialog} onClose={this.toggleSettingsDialog}>
          <TopLineProgress loading={uploading} />
          <DialogTitle>Settings</DialogTitle>
          <SettingsDialogWrapper>
            <AvatarContainer>
              <input
                ref={this.input}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={this.onChangeAvatar}
                style={{ display: 'none' }}
              />
              <Avatar
                src={avatar.src}
                alt={avatar.text}
                onClick={this.onAvatarClick}
              >
                <CameraIcon fontSize="large" />
              </Avatar>
            </AvatarContainer>
          </SettingsDialogWrapper>
        </Dialog>
      </Grid>
    );
  }
}

export default AppContent;
