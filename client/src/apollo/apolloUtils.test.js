import React from 'react';
import wait from 'waait';
import { adopt } from 'react-adopt';
import { Query, Mutation, Subscription } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import { createQuery } from './utils';
import cache from './cache';
import gql from '../gql';

const { GET_INITIAL_DATA } = gql;

const getInitialData = createQuery('getInitialData', GET_INITIAL_DATA);

const mockMe = {
  id: 1,
  avatar: {
    sm: 'smAvatar',
    md: 'mdAvatar',
    __typename: 'UserAvatar',
  },
  username: 'me',
  displayName: 'Me Test',
  firstName: 'Me',
  lastName: 'Test',
  status: 'COMPLETED',
  __typename: 'User',
};
const mocks = [
  {
    request: {
      query: GET_INITIAL_DATA,
      variables: {},
    },
    result: {
      data: {
        me: mockMe,
        myContacts: [],
        myChats: [],
      },
    },
  },
];

const MockedProviderComponent = ({ children }) => (
  <MockedProvider mocks={mocks} cache={cache}>
    {children}
  </MockedProvider>
);

describe('test apollo utils', () => {
  describe('createQuery', () => {
    test('create query without passing name', () => {
      expect(createQuery()).toThrow();
    });
    test('create query without passing query', () => {
      expect(createQuery('getInitialData')).toThrow();
    });
    test('create query without errors', () => {
      expect(createQuery('getInitialData', GET_INITIAL_DATA)({ render: () => null })).toBeTruthy();
    });
    test('render created query with adopt container', () => {
      const TestContainer = adopt({ getInitialData });
      const wrapper = mount((
        <MockedProviderComponent>
          <TestContainer>
            {() => (<div className="test" />)}
          </TestContainer>
        </MockedProviderComponent>
      ));

      expect(wrapper.find(Query)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing query loading state/passing query data to child', async () => {
      const TestContainer = adopt({ getInitialData });
      const wrapper = mount((
        <MockedProviderComponent>
          <TestContainer>
            {({
              getInitialData: {
                loading,
                data = { me: {} },
              },
            }) => {
              const { me: { displayName } } = data;

              return (<div className="test">{loading ? 'Loading' : displayName}</div>);
            }}
          </TestContainer>
        </MockedProviderComponent>
      ));
      expect(wrapper.find('.test').text()).toBe('Loading');

      await act(async () => {
        await wait();
        wrapper.update();

        expect(wrapper.find('.test').text()).toBe('Me Test');
      });
    });
    test('passing container props to query', async () => {
      const TestContainer = adopt({ getInitialData });
      const wrapper = mount((
        <MockedProviderComponent>
          <TestContainer
            getInitialDataProps={{
              skip: true,
            }}
          >
            {({
              getInitialData: {
                data = { me: {} },
                loading,
              },
            }) => {
              const { me: { displayName = '' } } = data;

              return (<div className="test">{loading ? 'Loading' : displayName}</div>);
            }}
          </TestContainer>
        </MockedProviderComponent>
      ));
      expect(wrapper.find('.test').text()).toBe('');

      await act(async () => {
        await wait();
        wrapper.update();

        expect(wrapper.find('.test').text()).toBe('');
      });
    });
  });
});
