import {
  getStyledProps,
  getSpacing,
} from './index';

const mockStyledProps = {
  theme: {
    border: 1,
    spacing: num => num * 8,
    palette: {
      primary: {
        light: '#fff',
      },
    },
  },
};

describe('test styles utils', () => {
  test('test getStyledProps', () => {
    expect(getStyledProps()()).toBeNull();
    expect(getStyledProps('', 'px')(mockStyledProps)).toBeNull();
    expect(getStyledProps('theme.palette.primary.light')(mockStyledProps)).toEqual('#fff');
    expect(getStyledProps('theme.border', 'px')(mockStyledProps)).toEqual('1px');
  });

  test('test getSpacing', () => {
    expect(getSpacing(1)(mockStyledProps)).toEqual('8px');
    expect(getSpacing(1, 'em')(mockStyledProps)).toEqual('8em');
  });
});
