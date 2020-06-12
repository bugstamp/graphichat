import styled from 'styled-components';

import { getStyledProps, getSpacing } from '../../../../../styles';

export const ChatTopBarStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${getSpacing(1)};
  background-color: #fff;
  border-bottom: 1px solid ${getStyledProps('theme.palette.grey.200')};
  z-index: 20;
`;

export const UserName = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  p {
    ${getStyledProps('theme.typography.subtitle2')};
  }
`;

export const UserStatus = styled.span`
  ${getStyledProps('theme.typography.caption')};
  color: ${({ online, ...rest }) => (online
    ? getStyledProps('theme.palette.success.main')(rest)
    : getStyledProps('theme.palette.grey.500')(rest))};
`;
