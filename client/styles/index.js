import { createGlobalStyle } from 'styled-components';
import { size } from 'polished';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    min-height: 100%;
    color: #000;
    background-color: #fff;
    overflow-y: auto;

    #root {
      ${size('inherit')}
      display: flex;
    }
  }
`;

export const theme = {};

// export const getThemeHelper = (props, path) => _.get(props.theme, path);
