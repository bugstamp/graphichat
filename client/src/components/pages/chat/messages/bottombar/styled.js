import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import { ListItemAvatarStyled } from '../../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../../styles';

export const ChatBottomBarStyled = styled.div`
  min-height: 72px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.200')};
  background-color: #fff;

  ${ListItemAvatarStyled} {
    padding: ${getSpacing(1)};
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  padding: ${getSpacing(1)} 0;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        min-height: auto;
        flex-flow: row nowrap;
        align-items: center;
        padding: ${getSpacing(0.5)(props)};
      }
    `;
  }}
`;

export const FormInput = styled(Input)`
  && {
    flex: 1 auto;
    display: flex;
    align-items: flex-start;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px;
        border: 1px solid ${getStyledProps('theme.palette.grey.400')(props)};
        border-radius: 20px;

        &:before,
        &:after {
          display: none;
        }
      }
    `;
  }}
  }
`;

export const SubmitButton = styled(IconButton)`
  && {
    padding: ${getSpacing(1)};
  }
`;

export const FabSubmitButton = styled(Fab)`
  && {
    position: absolute;
    top: -24px;
    right: 0;
    z-index: 30;
  }
`;
