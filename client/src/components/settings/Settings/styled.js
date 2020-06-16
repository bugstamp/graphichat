import styled, { keyframes } from 'styled-components';
import { position } from 'polished';
import { fadeOut } from 'react-animations';

import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';

import { SubmitButton } from '../../common/Form/styled';
import { getStyledProps, getSpacing } from '../../../styles';

export const fadeOutAnimation = keyframes`${fadeOut}`;

export const SettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('xs');

    return `
      ${smDown} {
        flex-flow: column;
        justify-content: flex-start;
      }
    `;
  }}
`;

export const AvatarWrapper = styled.div`
  display: flex;
  position: relative;
  margin-right: ${getSpacing(1)};
`;

export const Avatar = styled(MaterialAvatar)`
  && {
    width: 172px;
    height: 172px;
    margin: 0 auto;
    position: relative;
    color: ${({ src }) => (src && '#fff')};
    cursor: pointer;

    ${({ src }) => src && `
      > svg {
        opacity: 0;
      }

      &:hover {
        > svg {
          opacity: .6;
        }
      }
    `}
  }
`;

export const Camera = styled(CameraIcon)`
  && {
    ${position('absolute', '50%', null, null, '50%')};
    transform: translate(-50%, -50%);
    transition: all .3s ease;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;

  ${SubmitButton} {
    width: auto;
  }
`;
