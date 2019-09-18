import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';

import MaterialListItem from '@material-ui/core/ListItem';
import Spinner from '@material-ui/core/CircularProgress';
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

const AvatarWrapper = styled(Hidden)`
  && {
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
`;

const Avatar = styled.div`
  display: flex;
  align-items: flex-start;
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

const ContentWrapper = styled.div`
  order: ${({ isMyMessage }) => (isMyMessage ? 1 : 0)};
  overflow: hidden;
`;

const Content = styled.div`
  display: inline-block;
  padding: ${getSpacing(1)};
  ${({ isMyMessage }) => ({
    [`border-bottom-${isMyMessage ? 'left' : 'right'}-radius`]: 0,
  })};
  background-color: ${({ isMyMessage }) => (isMyMessage ? grey[100] : blue[100])};
  border-radius: 5px;
  opacity: ${({ isAdding }) => (isAdding ? 0.3 : 1)};

  p {
    ${getStyledProps('theme.typography.body2')};
    word-wrap: break-word;
    white-space: pre-wrap;
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
    margin-right: ${getSpacing(1)};

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
              <AvatarWrapper
                isMyMessage={isMyMessage}
                mdUp
                implementation="css"
              >
                <Avatar>
                  <ListItemAvatar {...avatar} />
                </Avatar>
              </AvatarWrapper>
              <ContentWrapper isMyMessage={isMyMessage}>
                <Content
                  isMyMessage={isMyMessage}
                  isAdding={isAdding}
                >
                  <p>{content}</p>
                </Content>
                <Time>
                  <span>{messageTimeParser(time, 'wide')}</span>
                  <If condition={isAdding}>
                    <span>
                      <Spinner size={10} color="primary" />
                    </span>
                  </If>
                </Time>
              </ContentWrapper>
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

export default memo(Message);
