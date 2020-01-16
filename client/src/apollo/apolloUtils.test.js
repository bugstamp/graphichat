import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { adopt } from 'react-adopt';
import { Query, Mutation, Subscription } from 'react-apollo';

import { createQuery, createMutation, createSubscription } from './utils';

import {
  getInitialDataMock,
  updateUserMock,
  userUpdateSubscriptionMock,
} from '../__mocks__/mockedQueries';
import { mountMockedProvider } from '../__mocks__/mockedProvider';
import queries from '../queries';

const {
  user: {
    getInitialData,
    updateUser,
    userUpdateSubscription,
  },
} = queries;

describe('test apollo utils', () => {
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
      ), [getInitialDataMock]);

      expect(wrapper.find(Query)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing loading state / passing data to child / passing container props', async () => {
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
              loading,
              data = { me: {} },
            },
          }) => {
            const { me: { displayName } } = data;

            return (<div className="test">{loading ? 'Loading' : displayName}</div>);
          }}
        </TestContainer>
      ), [getInitialDataMock]);
      expect(wrapper.find('.test').text()).toBe('Loading');

      await act(async () => {
        await wait();
        wrapper.update();
        expect(wrapper.find('.test').text()).toBe('Me Test');

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
      ), [updateUserMock]);

      expect(wrapper.find(Mutation)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing loading state / invoking mutation / passing container props', async () => {
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
            const { updateUser: updatedUser } = data;
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
                <p>{updatedUser.displayName || text}</p>
              </div>
            );
          }}
        </TestContainer>
      ), [updateUserMock]);
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

  describe('createSubscription', () => {
    const TestContainer = adopt({ updateUser, userUpdateSubscription });

    test('creating without passing name', () => {
      expect(createSubscription()).toThrow();
    });
    test('creating without passing query', () => {
      expect(createSubscription('updateUser')).toThrow();
    });
    test('creating without errors', () => {
      expect(updateUser({ render: () => null })).toBeTruthy();
    });
    test('rendering with adopt container', () => {
      const wrapper = mountMockedProvider((
        <TestContainer>
          {() => (<div className="test" />)}
        </TestContainer>
      ), [userUpdateSubscriptionMock]);

      expect(wrapper.find(Subscription)).toBeTruthy();
      expect(wrapper.find('.test')).toBeTruthy();
    });
    test('showing loading state / invoking mutation / passing container props', async () => {
      let completed = false;

      const wrapper = mountMockedProvider((
        <TestContainer
          userUpdateSubscriptionProps={{
            onSubscriptionData() {
              completed = true;
            },
          }}
        >
          {({
            userUpdateSubscription: {
              data = { userUpdated: {} },
            },
            updateUser: {
              mutation,
            },
          }) => {
            const { userUpdated = {} } = data;

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
                <p>{userUpdated.displayName || ''}</p>
              </div>
            );
          }}
        </TestContainer>
      ), [updateUserMock, userUpdateSubscriptionMock]);
      expect(wrapper.find('p').text()).toBe('');

      await act(async () => {
        wrapper.find('button').simulate('click');

        await wait();
        wrapper.update();
        expect(wrapper.find('p').text()).toBe('Me Test');
        expect(completed).toBeTruthy();
      });
    });
  });
});
