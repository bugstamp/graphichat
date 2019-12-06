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

const AppRouteComponent = props => (
  <AppRoute path="/" layout={testLayout} component={testComponent} {...props} />
);

const mountRouter = (routes, initialEntries = ['/']) => mount((
  <MemoryRouter initialEntries={initialEntries}>
    {routes}
  </MemoryRouter>
));

describe('test router', () => {
  describe('test AppRoute', () => {
    test('snapshot render', () => {
      const component = shallow(<AppRoute path="/" layout={testLayout} component={testComponent} />);

      expect(component).toMatchSnapshot();
    });

    test('Route render is defined', () => {
      const routerWrapper = mountRouter(<AppRouteComponent />);

      expect(routerWrapper.find(Route).exists()).toEqual(true);
      expect(routerWrapper.find(Route).prop('render')).toBeDefined();
    });

    test('pass props to Route', () => {
      const routerWrapper = mountRouter(<AppRouteComponent testProps="testProps" />);

      expect(routerWrapper.find(Route).prop('testProps')).toEqual('testProps');
    });

    test('redirect render', () => {
      const routerWrapper = mountRouter(<AppRouteComponent redirect />);

      expect(routerWrapper.find(testComponent).exists()).toEqual(true);
      expect(routerWrapper.find(testLayout).exists()).toEqual(false);
    });

    test('layout render', () => {
      const routerWrapper = mountRouter(<AppRouteComponent />);

      expect(routerWrapper.find(testComponent).exists()).toEqual(true);
      expect(routerWrapper.find(testLayout).exists()).toEqual(true);
    });

    test('privateRoute render', () => {
      const routerWrapper = mountRouter(<AppRouteComponent privateRoute />);

      expect(routerWrapper.find(PrivateRoute).exists()).toEqual(true);
    });
  });
});
