import React from 'react';
import wait from 'waait';
import { adopt } from 'react-adopt';
import { Query, Mutation, Subscription } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { createQuery, createMutation } from './utils';
import { initialState } from './cache';
import gql from '../gql';

const {
  GET_INITIAL_DATA,
  UPDATE_USER,
} = gql;
const getInitialData = createQuery('getInitialData', GET_INITIAL_DATA);
const updateUser = createMutation('updateUser', UPDATE_USER);

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
const getInitialDataMock = {
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
};
const updateUserMock = {
  request: {
    query: UPDATE_USER,
    variables: {
      field: 'username',
      value: 'user',
    },
  },
  result: {
    data: {
      updateUser: mockMe,
    },
  },
};

describe('test apollo utils', () => {
  let mockedCache = {};
  const mountMockedProvider = (children, cache, mocks = []) => mount((
    <MockedProvider mocks={mocks} cache={cache}>
      {children}
    </MockedProvider>
  ));

  beforeEach(() => {
    mockedCache = new InMemoryCache({ freezeResults: true });
    mockedCache.writeData({ data: initialState });
  });

  describe('createQuery', () => {
    const TestContainer = adopt({ getInitialData });

    test('creating without passing name', () => {
      expect(createQuery()).toThrow();
    });
    test('creating without passing query', () => {
      expect(createQuery('getInitialData')).toThrow();
    });
    test('creating without errors', () => {
      expect(getInitialData({ render: () => null })).toBeTruthy();
    });
    test('rendering with adopt container', () => {
      const wrapper = mountMockedProvider((
        <TestContainer>
          {() => (<div className="test" />)}
        </TestContainer>
      ), mockedCache, [getInitialDataMock]);

      expect(wrapper.find(Query)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing loading state and passing data to child', async () => {
      const wrapper = mountMockedProvider((
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
      ), mockedCache, [getInitialDataMock]);
      expect(wrapper.find('.test').text()).toBe('Loading');

      await act(async () => {
        await wait();
        wrapper.update();
        expect(wrapper.find('.test').text()).toBe('Me Test');
      });
    });
    test('passing container props', async () => {
      let completed = false;
      const wrapper = mountMockedProvider((
        <TestContainer
          getInitialDataProps={{
            onCompleted() {
              completed = true;
            },
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
      ), mockedCache, [getInitialDataMock]);
      expect(wrapper.find('.test').text()).toBe('Loading');

      await act(async () => {
        await wait();
        expect(completed).toBeTruthy();
      });
    });
  });

  describe('createMutation', () => {
    const TestContainer = adopt({ updateUser });

    test('creating without passing name', () => {
      expect(createMutation()).toThrow();
    });
    test('creating without passing query', () => {
      expect(createMutation('updateUser')).toThrow();
    });
    test('creating without errors', () => {
      expect(updateUser({ render: () => null })).toBeTruthy();
    });
    test('rendering with adopt container', () => {
      const wrapper = mountMockedProvider((
        <TestContainer>
          {() => (<div className="test" />)}
        </TestContainer>
      ), mockedCache, [updateUserMock]);

      expect(wrapper.find(Mutation)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing loading state and invoking mutation and passing container props', async () => {
      let completed = false;
      const wrapper = mountMockedProvider((
        <TestContainer
          updateUserProps={{
            onCompleted() {
              completed = true;
            },
          }}
        >
          {({
            updateUser: {
              mutation,
              result: {
                data = { updateUser: {} },
                loading,
              },
            },
          }) => {
            const { updateUser: updateUserData } = data;
            const text = loading ? 'Loading' : '';

            return (
              <div className="test">
                <button
                  type="button"
                  onClick={() => mutation({
                    variables: {
                      field: 'username',
                      value: 'user',
                    },
                  })}
                />
                <p>{updateUserData.displayName || text}</p>
              </div>
            );
          }}
        </TestContainer>
      ), mockedCache, [updateUserMock]);
      expect(wrapper.find('p').text()).toBe('');

      await act(async () => {
        wrapper.find('button').simulate('click');

        await wait();
        wrapper.update();
        expect(wrapper.find('p').text()).toBe('Loading');

        await wait();
        wrapper.update();
        expect(wrapper.find('p').text()).toBe('Me Test');
        expect(completed).toBeTruthy();
      });
    });
  });
});
