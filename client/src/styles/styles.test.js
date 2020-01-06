import {
  getStyledProps,
  getSpacing,
} from './index';

const mockedTheme = {
  border: 1,
  spacing: num => num * 8,
  palette: {
    primary: {
      light: '#fff',
    },
  },
};
const mockStyledProps = {
  theme: mockedTheme,
};

describe('test styles utils', () => {
  describe('test getStyledProps', () => {
    test('if not pass styled props', () => {
      expect(getStyledProps()()).toBeNull();
    });
    test('getting existing value', () => {
      expect(getStyledProps('theme.palette.primary.light')(mockStyledProps)).toEqual('#fff');
    });
    test('getting existing value with unit', () => {});
    expect(getStyledProps('theme.border', 'px')(mockStyledProps)).toEqual('1px');
  });

  describe('test getSpacing', () => {
    test('getting spacing', () => {
      expect(getSpacing(1)(mockStyledProps)).toEqual('8px');
    });
    test('getting spacing with unit', () => {
      expect(getSpacing(1, 'em')(mockStyledProps)).toEqual('8em');
    });
  });
});
