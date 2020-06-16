import styled from 'styled-components';
// import {} from 'polished';

import DialogContent from '@material-ui/core/DialogContent';

import { getSpacing } from '../../styles';

export const SettingsDialogContent = styled(DialogContent)`
  &&
  {
    padding: ${getSpacing(1)}
  }
`;
