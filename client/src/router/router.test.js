import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import AppRoute from './AppRoute';
import PrivateRoute from './PrivateRoute';

const testComponent = () => (
  <div className="component" />
);

// eslint-disable-next-line
const testLayout = ({ children }) => (
  <div>{children}</div>
);

describe('test router', () => {
  describe('test AppRoute', () => {
    test('snapshot render', () => {
      const component = shallow(<AppRoute component={testComponent} />);

      expect(component).toMatchSnapshot();
    });

    test('Route render', () => {
      const routerWrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <AppRoute path="/" layout={testLayout} component={testComponent} />
        </MemoryRouter>
      ));

      expect(routerWrapper.find(Route).exists()).toEqual(true);
      expect(routerWrapper.find(Route).prop('render')).toBeDefined();
    });

    test('pass props to Route', () => {
      const routerWrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <AppRoute path="/" layout={testLayout} component={testComponent} testProps="testProps" />
        </MemoryRouter>
      ));

      expect(routerWrapper.find(Route).prop('testProps')).toEqual('testProps');
    });

    test('redirect render', () => {
      const routerWrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <AppRoute path="/" layout={testLayout} component={testComponent} redirect />
        </MemoryRouter>
      ));

      expect(routerWrapper.find(testComponent).exists()).toEqual(true);
      expect(routerWrapper.find(testLayout).exists()).toEqual(false);
    });

    test('layout render', () => {
      const routerWrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <AppRoute path="/" layout={testLayout} component={testComponent} />
        </MemoryRouter>
      ));

      expect(routerWrapper.find(testComponent).exists()).toEqual(true);
      expect(routerWrapper.find(testLayout).exists()).toEqual(true);
    });

    test('privateRoute render', () => {
      const routerWrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <AppRoute path="/" layout={testLayout} component={testComponent} privateRoute />
        </MemoryRouter>
      ));

      expect(routerWrapper.find(PrivateRoute).exists()).toEqual(true);
    });
  });
});
