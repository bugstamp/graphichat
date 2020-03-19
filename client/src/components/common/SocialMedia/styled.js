import styled from 'styled-components';
import { rgba } from 'polished';

import Fab from '@material-ui/core/Fab';

export const SocialMediaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
`;

export const SocialMediaNote = styled.p`
  display: inline-flex;
  margin-right: 1em;
`;

export const SocialButton = styled(Fab)`
  && {
    color: #fff;
  }
`;

export const SocialWrapper = styled.div`
  display: inline-flex;

  :not(:last-child) {
    margin-right: 1em;
  }

  ${SocialButton} {
    background-color: ${({ color }) => color};

    :hover {
      background-color: ${({ color }) => rgba(color, 0.8)};
    }
  }
`;
