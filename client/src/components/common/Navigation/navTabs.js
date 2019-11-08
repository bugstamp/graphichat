import PersonIcon from '@material-ui/icons/PersonRounded';
// import GroupIcon from '@material-ui/icons/GroupRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';
import red from '@material-ui/core/colors/red';

const logoutIconColor = red[900];
const tabs = [
  {
    name: 'chats',
    Icon: PersonIcon,
    to: 'chats',
    attrs: {
      'aria-label': 'Link to Chats Page',
    },
    // ariaFlowTo: 'chats',
  },
  // {
  //   name: 'group',
  //   Icon: GroupIcon,
  //   to: 'group',
  // },
  {
    name: 'settings',
    Icon: SettingsIcon,
    attrs: {
      'aria-label': 'Open Settings Dialog',
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
