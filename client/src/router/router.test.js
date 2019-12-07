import config from 'config';
import React from 'react';
import { MemoryRouter, Route, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import jwt from 'jsonwebtoken';

import AppRoute from './AppRoute';
import PrivateRoute from './PrivateRoute';
import Routes from './index';

import storage from '../storage';

const { tokenSecrets } = config;

const TestComponent = () => (
  <div className="component" />
);

// eslint-disable-next-line
const TestLayout = ({ children }) => (
  <div>{children}</div>
);

const AppRouteComponent = props => (
  <AppRoute path="/" layout={TestLayout} component={TestComponent} {...props} />
);

const mountRouter = (routes, initialEntries = ['/']) => mount((
  <MemoryRouter initialEntries={initialEntries}>
    {routes}
  </MemoryRouter>
));

describe('test router', () => {
  describe('test AppRoute Component', () => {
    test('snapshot render', () => {
      const wrapper = shallow(<AppRoute path="/" layout={TestLayout} component={TestComponent} />);

      expect(wrapper).toMatchSnapshot();
    });
    test('Route render is defined', () => {
      const wrapper = mountRouter(<AppRouteComponent />);

      expect(wrapper.find(Route)).toHaveLength(1);
      expect(wrapper.find(Route).prop('render')).toBeDefined();
    });
    test('pass props to Route', () => {
      const wrapper = mountRouter(<AppRouteComponent testProps="testProps" />);

      expect(wrapper.find(Route).prop('testProps')).toEqual('testProps');
    });
    test('redirect render', () => {
      const wrapper = mountRouter(<AppRouteComponent redirect />);

      expect(wrapper.find(TestComponent)).toHaveLength(1);
      expect(wrapper.find(TestLayout)).toHaveLength(0);
    });
    test('layout render', () => {
      const wrapper = mountRouter(<AppRouteComponent />);

      expect(wrapper.find(TestComponent)).toHaveLength(1);
      expect(wrapper.find(TestLayout)).toHaveLength(1);
    });
    test('privateRoute render', () => {
      const wrapper = mountRouter(<AppRouteComponent privateRoute />);

      expect(wrapper.find(PrivateRoute)).toHaveLength(1);
    });
  });

  describe('test PrivateRoute Component', () => {
    test('snapshot render', () => {
      const wrapper = shallow(<PrivateRoute><TestComponent /></PrivateRoute>);

      expect(wrapper).toMatchSnapshot();
    });
    test('redirect to login', () => {
      const wrapper = mountRouter(<PrivateRoute><TestComponent /></PrivateRoute>);

      expect(wrapper.find(Redirect)).toHaveLength(1);
      expect(wrapper.find(Redirect).prop('to')).toEqual('login');
    });
    test('auth render', () => {
      const mockToken = {
        data: {
          regStatus: 'COMPLETED',
        },
      };
      const token = jwt.sign(mockToken, tokenSecrets.token);
      storage.token.set(token);

      const wrapper = mountRouter(<PrivateRoute><TestComponent /></PrivateRoute>);

      expect(wrapper.find(TestComponent)).toHaveLength(1);
      storage.token.remove();
    });
    test('redirect to reg', () => {
      const mockToken = {
        data: {
          regStatus: 'UNCOMPLETED',
        },
      };
      const token = jwt.sign(mockToken, tokenSecrets.token);
      const to = `reg?token=${token}`;
      storage.token.set(token);

      const wrapper = mountRouter(<PrivateRoute><TestComponent /></PrivateRoute>);

      expect(wrapper.find(Redirect)).toHaveLength(1);
      expect(wrapper.find(Redirect).prop('to')).toEqual(to);
      storage.token.remove();
    });
  });

  describe('test routes', () => {
    test('snapshot render', () => {
      const wrapper = shallow(<Routes />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
