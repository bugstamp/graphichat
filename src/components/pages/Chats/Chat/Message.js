import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';

import MaterialListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';

import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import ListItemAvatar from '../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../styles';
import { messageTimeParser, messageHistoryDateParser } from '../../../../helpers';
import { userAvatarProps } from '../../../propTypes';

const ListItem = styled(MaterialListItem)`
  && {
    padding-top: ${getSpacing(1)};
    padding-bottom: ${getSpacing(1)};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: ${({ alignItems }) => alignItems};
`;

const MessageInner = styled.div`
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

const Avatar = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: ${getSpacing(1)};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const HistoryDivider = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${getSpacing(1)} 0;

  p {
    height: 1px;
    flex: 1 auto;
    display: inline-flex;
    background-color: ${grey[500]};
    border-radius: 2px;
  }

  span {
  padding: 0 ${getSpacing(2)};
    color: ${grey[500]};
  }
`;

const Content = styled.div`
  ${getStyledProps('theme.typography.body2')};
  padding: ${getSpacing(1)};
  ${({ isMyMessage }) => ({
    [`border-bottom-${isMyMessage ? 'left' : 'right'}-radius`]: 0,
  })};
  background-color: ${({ isMyMessage }) => (isMyMessage ? grey[100] : blue[100])};
  border-radius: 5px;
  opacity: ${({ isAdding }) => (isAdding ? 0.3 : 1)};
  word-break: break-all;

  &:hover {
    cursor: text;
  }
`;

const SystemMessage = styled.div`
  padding: ${getSpacing(1)};
  color: ${grey[500]};
  background-color: ${grey[100]};
  border-radius: 10px;
`;

const Time = styled.div`
  flex: 100%;
  display: flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
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

  return (
    <ListItem ref={ref} row-index={rowIndex}>
      <Wrapper alignItems={alignItems}>
        <If condition={isFirst || divider}>
          <HistoryDivider>
            <p />
            <span>{messageHistoryDateParser(time)}</span>
            <p />
          </HistoryDivider>
        </If>
        <Choose>
          <When condition={isSystem}>
            <SystemMessage>
              <p>{content}</p>
            </SystemMessage>
          </When>
          <Otherwise>
            <MessageInner>
              <If condition={alignItems === 'flex-start'}>
                <Hidden mdUp>
                  <Avatar>
                    <ListItemAvatar {...avatar} />
                  </Avatar>
                </Hidden>
              </If>
              <ContentWrapper>
                <Content
                  isMyMessage={isMyMessage}
                  isAdding={isAdding}
                >
                  {content}
                </Content>
                <Time>
                  <span>{messageTimeParser(time, 'wide')}</span>
                </Time>
              </ContentWrapper>
              <If condition={alignItems !== 'flex-start'}>
                <Hidden mdUp>
                  <Avatar>
                    <ListItemAvatar {...avatar} />
                  </Avatar>
                </Hidden>
              </If>
            </MessageInner>
          </Otherwise>
        </Choose>
      </Wrapper>
    </ListItem>
  );
});

Message.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  alignItems: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isMyMessage: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  divider: PropTypes.bool.isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  content: PropTypes.string.isRequired,
  avatar: PropTypes.shape(userAvatarProps).isRequired,
};

export default Message;
