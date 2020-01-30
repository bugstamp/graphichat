import styled, { keyframes } from 'styled-components';
import { position } from 'polished';
import { fadeOut } from 'react-animations';

import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';
import InputAdornment from '@material-ui/core/InputAdornment';

import { getStyledProps, getSpacing } from '../../../../styles';

const fadeOutAnimation = keyframes`${fadeOut}`;

const SettingsWrapper = styled.div`
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

const InputCheckIconWrapper = styled(InputAdornment)`
  && {
    animation: ${fadeOutAnimation};
    animation-duration: .5s;
    animation-delay: 5s;
    animation-fill-mode: forwards;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Avatar = styled(MaterialAvatar)`
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

const Camera = styled(CameraIcon)`
  && {
    ${position('absolute', '50%', null, null, '50%')};
    transform: translate(-50%, -50%);
    transition: all .3s ease;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  padding: ${getSpacing(1)};
`;

export {
  SettingsWrapper,
  AvatarWrapper,
  Avatar,
  Camera,
  FormWrapper,
  InputCheckIconWrapper,
};
