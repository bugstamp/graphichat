import styled from 'styled-components';
import { position } from 'polished';

import IconButton from '@material-ui/core/IconButton';

import { getSpacing } from '../../../../../styles';

export const ContactsHeaderStyled = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${getSpacing(2)} ${getSpacing(1)};
`;

export const AddButton = styled(IconButton)`
  && {
    ${position('absolute', 0, 0, null, null)};
    padding: ${getSpacing(0.5)};
  }
`;

export const ContactsHeaderTitle = styled.div`
  position: relative;
  margin-bottom: ${getSpacing(1)};
`;
