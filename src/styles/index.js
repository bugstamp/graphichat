import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import reset from 'styled-reset';
import { size } from 'polished';
import { get } from 'lodash';

export const getStyledProps = (path, unit = '') => (props) => {
  const value = get(props, path);

  if (unit) {
    return `${value}${unit}`;
  }
  return value;
};

export const getSpacing = (num = 1) => (props) => {
  const spacingFunc = getStyledProps('theme.spacing')(props);
  const padding = spacingFunc(num);

  return `${padding}px`;
};

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

    * {
      box-sizing: border-box;
    }

    #root {
      ${size('inherit')};
      display: flex;
    }
  }
`;
