import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow } from 'enzyme';
import { GraphQLError } from 'graphql';

import {
  getMeMock,
  uploadAvatarMock,
  updateUserMock,
} from '../../../__mocks__/mockedQueries';
import {
  me,
  updateUserResult,
} from '../../../__mocks__/mockedQueryData';
import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import { BadInputError } from '../../../__mocks__/mockedErrors';

import ResponsiveDialog from '../../common/ResponsiveDialog/ResponsiveDialog';
import SettingsDialog from './SettingsDialog';
import Settings from './Settings/Settings';

const defaultMocks = [
  getMeMock,
  uploadAvatarMock,
  updateUserMock,
];

describe('test SettingsDialog', () => {
  let open = false;
  const mockToggleFn = jest.fn(() => { open = !open; });
  const defaultProps = {
    open: false,
    toggle: mockToggleFn,
  };

  beforeEach(() => { open = false; });

  test('snapshot render', () => {
    const wrapper = shallow(<SettingsDialog />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount render', async () => {
    const wrapper = mountMockedProvider(<SettingsDialog {...defaultProps} />, defaultMocks);

    expect(wrapper.find(ResponsiveDialog)).toBeTruthy();
    expect(wrapper.find(Settings)).toBeTruthy();
  });
  test('getMe query', async () => {
    const wrapper = mountMockedProvider(<SettingsDialog {...defaultProps} open />, defaultMocks);

    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find(Settings).prop('me')).toEqual(me);
    });
  });
  test('updateUser mutation', async () => {
    const wrapper = mountMockedProvider(<SettingsDialog {...defaultProps} open />, defaultMocks);
    expect(wrapper.find(ResponsiveDialog).prop('loading')).toBe(false);

    await act(async () => {
      await wait();
      wrapper.find('input[name="username"]').simulate('blur', { target: { name: 'username', value: 'user' } });
      expect(wrapper.find(ResponsiveDialog).prop('loading')).toEqual(true);
    });
    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find(ResponsiveDialog).prop('loading')).toEqual(false);
      expect(wrapper.find(Settings).prop('updateUserResult')).toEqual(updateUserResult);
    });
  });
  test('updateUser mutation error', async () => {
    const error = new BadInputError({
      message: 'invalidField',
      data: {
        invalidField: 'username',
      },
    });
    const wrapper = mountMockedProvider(
      <SettingsDialog {...defaultProps} open />,
      [getMeMock, uploadAvatarMock, {
        ...updateUserMock,
        result: {
          errors: [error],
        },
      }],
    );

    await act(async () => {
      await wait();
      wrapper.find('input[name="username"]').simulate('blur', { target: { name: 'username', value: 'user' } });
    });
    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find(Settings).prop('error')).toBeDefined();
      expect(wrapper.find(Settings).instance().state).toHaveProperty('errors.username');
    });
  });
  test('uploadAvatar mutation', async () => {
    const file = {
      filename: '',
      mimetype: '',
      encoding: '',
    };
    const wrapper = mountMockedProvider(<SettingsDialog {...defaultProps} open />, defaultMocks);
    expect(wrapper.find(ResponsiveDialog).prop('loading')).toBe(false);

    await act(async () => {
      await wait();
      wrapper.find('input[type="file"]').simulate('change', {
        target: {
          files: [file],
          validity: { valid: true },
        },
      });
      expect(wrapper.find(ResponsiveDialog).prop('loading')).toEqual(true);
    });
    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find(ResponsiveDialog).prop('loading')).toEqual(false);
    });
  });
  test('pass open prop | call toggle func | open settings dialog', async () => {
    let wrapper = mountMockedProvider((
      <SettingsDialog {...defaultProps} open={open} />
    ), defaultMocks);
    expect(wrapper.find(ResponsiveDialog).prop('open')).toBe(false);
    expect(wrapper.find(ResponsiveDialog).prop('toggle')).toEqual(mockToggleFn);
    expect(wrapper.find(Settings)).toHaveLength(0);

    await act(async () => {
      await wait();
      wrapper.update();
      mockToggleFn();
      wrapper = mountMockedProvider(<SettingsDialog {...defaultProps} open={open} />, defaultMocks);
      expect(wrapper.find(ResponsiveDialog).prop('open')).toBe(true);
      expect(wrapper.find(Settings)).toHaveLength(1);
    });
  });
});
