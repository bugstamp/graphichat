import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import { ListItemAvatarStyled } from '../../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../../styles';

export const ChatInputStyled = styled.div`
  min-height: 52px;
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
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
  padding: ${getSpacing(1)};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        flex-flow: row nowrap;
        align-items: center;
        padding: ${getSpacing(0.5)(props)};
      }
    `;
  }}
`;

export const FormInput = styled(Input)`
  && {
    width: 100%;
    display: inline-flex;
    align-items: flex-start;

    > div {
      width: 95%;
    }

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const mdUp = breakpoints.up('md');
    const smDown = breakpoints.down('sm');

    return `
      ${mdUp} {
        min-height: 80px;
      }
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
