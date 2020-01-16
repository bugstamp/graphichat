import styled from 'styled-components';
import { position } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';

import { getStyledProps, getSpacing } from '../../../styles';

const AppContainer = styled(Grid)`
  && {
    background-color: ${getStyledProps('theme.palette.primary.light')};
  }
`;

const AppGrid = styled(Paper)`
  && {
    flex: 1 auto;
    display: flex;
    overflow: hidden;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const lgUp = breakpoints.up('lg');
    const mdDown = breakpoints.down('md');

    return `
      ${lgUp} {
        margin: 20px 40px;
      }
      ${mdDown} {
        border-radius: 0;
      }
    `;
  }};
  }
`;

const SettingWrapper = styled.div`
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
  AppContainer,
  AppGrid,
  SettingWrapper,
  AvatarWrapper,
  Avatar,
  Camera,
  FormWrapper,
};
