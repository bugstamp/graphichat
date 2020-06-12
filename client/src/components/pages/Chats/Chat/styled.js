import styled from 'styled-components';
import { rgba } from 'polished';

import Paper from '@material-ui/core/Paper';

import { getStyledProps } from '../../../../styles';
import topography from '../../../../assets/images/topography.svg';

export const ChatStyled = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-image: ${(props) => {
    const chatBgClr = getStyledProps('theme.palette.primary.main')(props);

    return `
      url(${topography}), linear-gradient(0deg, ${rgba(chatBgClr, 1)} 0%, ${rgba(chatBgClr, 0.3)} 100%);
    `;
  }};
  }
`;

export const ChatPlaceholderStyled = styled.div`
  flex: 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
