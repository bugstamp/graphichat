import styled from 'styled-components';

import MaterialListItem from '@material-ui/core/ListItem';
import { ListItemAvatarStyled } from '../../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../../styles';

export const SystemMessageStyled = styled.div`
  --systemMessageColor: ${getStyledProps('theme.palette.secondary.light')};
  padding: ${getSpacing(1)};
  color: #fff;
  background-color: var(--systemMessageColor);
  border-radius: 10px;
`;

export const HistoryDividerStyled = styled.div`
  --historyDividerColor: ${getStyledProps('theme.palette.common.black')};
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${getSpacing(1)} 0;

  p {
    height: 1px;
    flex: 1 auto;
    display: inline-flex;
    background-color: var(--historyDividerColor);
    border-radius: 2px;
  }

  span {
    padding: 0 ${getSpacing(2)};
    color: var(--historyDividerColor);
  }
`;

export const ListItemStyled = styled(MaterialListItem)`
  && {
    padding: ${getSpacing(1)};
  }
`;

export const MessageTime = styled.div`
  flex: 100%;
  display: inline-flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
`;

export const SpinnerWrapper = styled.span`
  margin-left: ${getSpacing(1)};
`;

export const MessageContent = styled.div`
  flex: 100%;
  display: inline-flex;
  padding: ${getSpacing(1)};
  background-color: ${getStyledProps('theme.palette.primary.contrastText')};
  border-radius: ${getStyledProps('theme.shape.borderRadius')}px;
  box-shadow: ${getStyledProps('theme.shadows.3')};

  p {
    ${getStyledProps('theme.typography.body2')};
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

export const MessageContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  ${SpinnerWrapper} {
    * {
      animation-play-state: ${({ isOptimistic }) => (isOptimistic ? 'running' : 'paused')};
      visibility: ${({ isOptimistic }) => (isOptimistic ? 'visibility' : 'hidden')};
    }
  }
  ${MessageContent} {
    opacity: ${({ isOptimistic }) => (isOptimistic ? 0.7 : 1)};
  }
`;

export const MessageWrapper = styled.div`
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

  ${MessageContent} {
    ${({ isMyMessage }) => {
    const direction = isMyMessage ? 'left' : 'right';

    return `
      border-bottom-${direction}-radius: 0;
    `;
  }};
  }
`;

export const MessageInner = styled.div`
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
