import config from 'config';
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { shallow } from 'enzyme';
import jwt from 'jsonwebtoken';

import AppRoute from './AppRoute';
import PrivateRoute from './PrivateRoute';
import Routes from './index';
import App from '../components/App';
import NotFound from '../components/common/NotFound';

import cache from '../apollo/cache';
import storage from '../storage';
import { theme } from '../styles';

import { mountMockedProvider } from '../__mocks__/mockedProvider';

const { tokenSecrets } = config;
const history = createMemoryHistory();

const TestComponent = () => (
  <div className="component" />
);

// eslint-disable-next-line
const TestLayout = ({ children }) => (
  <div>{children}</div>
);

// eslint-disable-next-line
const TestRouter = ({ children }) => (
  <Router history={history}>
    {children}
  </Router>
);

const TestAppRoute = props => (
  <AppRoute path="/" layout={TestLayout} component={TestComponent} {...props} />
);

const mountRouter = (routes, mocks = []) => mountMockedProvider((
  <TestRouter>{routes}</TestRouter>
), cache, mocks);

describe('test router', () => {
  beforeEach(() => {
    history.push('/');
  });

  describe('test AppRoute Component', () => {
    test('snapshot render', () => {
      const wrapper = shallow(<AppRoute path="/" layout={TestLayout} component={TestComponent} />);

      expect(wrapper).toMatchSnapshot();
    });
    test('Route render is defined', () => {
      const wrapper = mountRouter(<TestAppRoute />);

      expect(wrapper.find(Route)).toHaveLength(1);
      expect(wrapper.find(Route).prop('render')).toBeDefined();
    });
    test('pass props to Route', () => {
      const wrapper = mountRouter(<TestAppRoute testProps="testProps" />);

      expect(wrapper.find(Route).prop('testProps')).toEqual('testProps');
    });
    test('redirect render', () => {
      const wrapper = mountRouter(<TestAppRoute redirect />);

      expect(wrapper.find(TestComponent)).toHaveLength(1);
      expect(wrapper.find(TestLayout)).toHaveLength(0);
    });
    test('layout render', () => {
      const wrapper = mountRouter(<TestAppRoute />);

      expect(wrapper.find(TestComponent)).toHaveLength(1);
      expect(wrapper.find(TestLayout)).toHaveLength(1);
    });
    test('privateRoute render', () => {
      const wrapper = mountRouter(<TestAppRoute privateRoute />);

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
    test('redirect to login', () => {
      history.push('/chats');
      mountRouter(<App theme={theme} />);

      expect(history.location.pathname).toBe('/login');
    });
    test('redirect to notfound', () => {
      history.push('/sdgsg1213');
      const wrapper = mountRouter(<App theme={theme} />);

      expect(wrapper.find(NotFound)).toHaveLength(1);
    });
  });
});
