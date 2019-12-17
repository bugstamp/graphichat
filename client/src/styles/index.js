import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import reset from 'styled-reset';
import { size } from 'polished';
import { get } from 'lodash';

export const getStyledProps = (path, unit = '') => (props = {}) => {
  const value = get(props, path, null);

  if (unit && value) {
    return `${value}${unit}`;
  }
  return value;
};

export const getSpacing = (num = 1, unit = 'px') => (props) => {
  const spacingFunc = getStyledProps('theme.spacing')(props);
  const padding = spacingFunc(num);

  return `${padding}${unit}`;
};

export const theme = createMuiTheme({});

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    min-width: 320px;
    min-height: 100%;
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

  ${() => {
    const breakpoints = getStyledProps('theme.breakpoints')({ theme });
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        font-size: 12px;
      }
    `;
  }}
  }
`;
