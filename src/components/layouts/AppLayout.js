import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map, set } from 'lodash';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/PersonRounded';
import GroupIcon from '@material-ui/icons/GroupRounded';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';
import red from '@material-ui/core/colors/red';

import { getStyledProps } from '../../styles';

const TabStyled = styled(Tab)`
  && {
    min-width: inherit;
    height: 60px;
    border-radius: 50%;

    &:last-of-type {
      margin-bottom: 60px;
    }
  }
`;

const TabIndicatorCustomStyled = styled.span`
  width: 2px;
  height: 60px;
  display: block;
  position: absolute;
  top: ${({ activeTab }) => `${activeTab * 60}px`};
  right: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  transition: .25s ease;
`;

const TabsCustomStyled = styled.div`
  min-width: 60px;
  width: 60px;
  height: 100%;
  display: flex;
  flex-flow: column;
  position: relative;
`;

const links = [
  {
    name: 'person',
    Icon: PersonIcon,
    to: 'person',
  },
  {
    name: 'group',
    Icon: GroupIcon,
    to: 'group',
  },
  {
    name: 'saved',
    Icon: BookmarkIcon,
    to: 'saved',
  },
];

class AppLayout extends Component {
  state = {
    activeTab: 0,
  }

  componentDidMount

  handleChangeTab = (index) => {
    this.setState({ activeTab: index });
  }

  render() {
    const { activeTab } = this.state;
    const { children } = this.props;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item md={12}>
          <TabsCustomStyled>
            {map(links, ({ name, Icon, to }, index) => {
              const color = activeTab === index ? 'primary' : 'action';
              const tabProps = {
                onClick: () => this.handleChangeTab(index),
                icon: <Icon color={color} />,
              };

              if (to) {
                set(tabProps, 'to', to);
                set(tabProps, 'component', Link);
              }

              return (
                <TabStyled key={name} {...tabProps} />
              );
            })}
            <TabStyled icon={<SettingsIcon color="action" />} />
            <TabStyled icon={<LogoutIcon nativeColor={red[900]} />} />
            <TabIndicatorCustomStyled activeTab={activeTab} />
          </TabsCustomStyled>
          <Grid container justify="center" spacing={0}>
            {children}
            {/* <Grid item ></Grid>
                <Grid item></Grid>
            <Grid item></Grid> */}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AppLayout.propTypes = {};

export default AppLayout;
