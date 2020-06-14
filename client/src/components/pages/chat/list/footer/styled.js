import styled from 'styled-components';

import { getSpacing } from '../../../../../styles';

export const ChatListFooterStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(2)} ${getSpacing(1)};

  && {
    button {
      width: 50%;
    }
  }
`;

export default null;
