import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import reset from 'styled-reset';
import { size } from 'polished';
import { get } from 'lodash';

export const getStyledProps = path => props => get(props, path);

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    min-height: 100%;
    font-family: ${getStyledProps('theme.typography.fontFamily')};
    font-size: ${getStyledProps('theme.typography.fontSize')}px;
    font-weight: ${getStyledProps('theme.typography.fontWeightRegular')};
    color: #000;
    background-color: #fff;
    overflow-y: auto;

    #root {
      ${size('inherit')}
    }
  }
`;
