import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MaterialListItem from '@material-ui/core/ListItem';
import Spinner from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';

import ListItemAvatar, { ListItemAvatarStyled } from '../../../common/List/ListItemAvatar';
import SystemMessage from './SystemMessage';
import HistoryDivider from './HistoryDivider';

import { getStyledProps, getSpacing } from '../../../../styles';
import { messageDateParsers } from '../../../../helpers';
import { userAvatarProps } from '../../../propTypes';

const ListItem = styled(MaterialListItem)`
  && {
    padding: ${getSpacing(1)};
  }
`;

const Time = styled.div`
  flex: 100%;
  display: inline-flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
`;

const SpinnerWrapper = styled.span`
  margin-left: ${getSpacing(1)};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  ${SpinnerWrapper} {
    * {
      animation-play-state: ${({ isAdding }) => (isAdding ? 'running' : 'paused')};
      visibility: ${({ isAdding }) => (isAdding ? 'visibility' : 'hidden')};
    }
  }
`;

const Content = styled.div`
  flex: 100%;
  display: inline-flex;
  padding: ${getSpacing(1)};
  background-color: ${getStyledProps('theme.palette.primary.contrastText')};
  border-radius: ${getStyledProps('theme.shape.borderRadius')}px;
  box-shadow: ${getStyledProps('theme.shadows.3')};
  opacity: ${({ isAdding }) => (isAdding ? 0.3 : 1)};

  p {
    ${getStyledProps('theme.typography.body2')};
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: ${({ alignItems }) => alignItems};

  ${ListItemAvatarStyled} {
    ${(props) => {
    const { isMyMessage } = props;
    const spacing = getSpacing(1)(props);
    const direction = isMyMessage ? 'right' : 'left';
    const order = isMyMessage ? 0 : 1;

    return `
      margin-${direction}: ${spacing};
      order: ${order};
    `;
  }}
  }

  ${Content} {
    ${({ isMyMessage }) => {
    const direction = isMyMessage ? 'left' : 'right';

    return `
      border-bottom-${direction}-radius: 0;
    `;
  }};
  }
`;

const MessageInner = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: row nowrap;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const mdUp = breakpoints.up('md');

    return `
      ${mdUp} {
        max-width: 49%;
      }
    `;
  }}
`;

const Message = forwardRef((props, ref) => {
  const {
    avatar,
    rowIndex,
    alignItems,
    isFirst,
    isSystem,
    isMyMessage,
    isAdding,
    divider,
    time,
    content,
  } = props;
  const parsedTime = messageDateParsers.messageTime(time, 'wide');

  return (
    <ListItem ref={ref} row-index={rowIndex} dense disableGutters>
      <MessageWrapper isMyMessage={isMyMessage} alignItems={alignItems}>
        <If condition={isFirst || divider}>
          <HistoryDivider time={time} />
        </If>
        <Choose>
          <When condition={isSystem}>
            <SystemMessage content={content} />
          </When>
          <Otherwise>
            <MessageInner>
              <Hidden mdUp>
                <ListItemAvatar {...avatar} />
              </Hidden>
              <ContentWrapper isAdding={isAdding}>
                <Content>
                  <p>{content}</p>
                </Content>
                <Time>
                  <span>{parsedTime}</span>
                  <SpinnerWrapper>
                    <Spinner size={10} color="primary" />
                  </SpinnerWrapper>
                </Time>
              </ContentWrapper>
            </MessageInner>
          </Otherwise>
        </Choose>
      </MessageWrapper>
    </ListItem>
  );
});

Message.defaultProps = {
  isAdding: false,
};
Message.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  alignItems: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool,
  isMyMessage: PropTypes.bool.isRequired,
  divider: PropTypes.bool.isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  content: PropTypes.string.isRequired,
  avatar: PropTypes.shape(userAvatarProps).isRequired,
};

export default memo(Message);
