import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { map } from 'lodash';

import Tab from '@material-ui/core/Tab';

import PersonIcon from '@material-ui/icons/PersonRounded';
// import GroupIcon from '@material-ui/icons/GroupRounded';
// import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

import red from '@material-ui/core/colors/red';

import { getStyledProps } from '../../../styles';

const tabItemHeight = 60;
const tabItemHeightPx = `${tabItemHeight}px`;

const Wrapper = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  position: relative;

  button:first-of-type {
    margin-top: auto;
  }
`;

const TabItem = styled(Tab)`
  && {
    min-width: inherit;
    height: ${tabItemHeightPx};
    border-radius: 50%;
  }
`;

const TabItemIndicator = styled.span`
  width: 2px;
  height: ${tabItemHeightPx};
  display: block;
  position: absolute;
  top: ${({ activeTab }) => `${activeTab * tabItemHeight}px`};
  right: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  transition: .25s ease;
`;

const links = [
  {
    name: 'chats',
    Icon: PersonIcon,
    to: 'chats',
  },
  // {
  //   name: 'group',
  //   Icon: GroupIcon,
  //   to: 'group',
  // },
  // {
  //   name: 'saved',
  //   Icon: BookmarkIcon,
  //   to: 'saved',
  // },
];

const Tabs = ({
  activeTab,
  onChangeTab,
  toggleSettingsDialog,
  signOut,
}) => {
  const logoutIconColor = red[900];

  return (
    <Wrapper>
      {map(links, ({ name, Icon, to }, index) => {
        const color = activeTab === index ? 'primary' : 'action';

        return (
          <TabItem
            key={name}
            to={to}
            component={Link}
            icon={<Icon color={color} />}
            onClick={() => onChangeTab(index)}
          />
        );
      })}
      <TabItem icon={<SettingsIcon color="action" />} onClick={toggleSettingsDialog} />
      <TabItem icon={<LogoutIcon htmlColor={logoutIconColor} />} onClick={signOut} />
      <TabItemIndicator activeTab={activeTab} />
    </Wrapper>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Tabs;
