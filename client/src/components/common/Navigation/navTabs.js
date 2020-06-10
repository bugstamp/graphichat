import ChatIcon from '@material-ui/icons/ChatRounded';
// import GroupIcon from '@material-ui/icons/GroupRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

import red from '@material-ui/core/colors/red';

const logoutIconColor = red[300];

const tabs = [
  {
    name: 'chats',
    Icon: ChatIcon,
    htmlColor: '#fff',
    to: 'chats',
    attrs: {
      'aria-label': 'Chats Page',
    },
  },
  // {
  //   name: 'group',
  //   Icon: GroupIcon,
  //   to: 'group',
  //   htmlColor: '#fff',
  // },
  {
    name: 'settings',
    Icon: SettingsIcon,
    htmlColor: '#fff',
    attrs: {
      'aria-label': 'Settings Dialog',
    },
  },
  {
    name: 'logout',
    Icon: LogoutIcon,
    htmlColor: logoutIconColor,
    attrs: {
      'aria-label': 'Logout',
    },
  },
];

export default tabs;
