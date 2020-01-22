import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow } from 'enzyme';

import TextField from '@material-ui/core/TextField';

import {
  me,
  updateUserResult,
} from '../../../../__mocks__/mockedQueryData';
import { mountMockedProvider } from '../../../../__mocks__/mockedProvider';
import { BadInputError, GraphQLErrors } from '../../../../__mocks__/mockedErrors';

import Settings from './Settings';

describe('test Settings', () => {
  const mockUpdateUser = jest.fn();
  const mockUploadAvatar = jest.fn();
  const defaultProps = {
    updateUser: mockUpdateUser,
    uploadAvatar: mockUploadAvatar,
  };

  test('snapshot render', () => {
    const wrapper = shallow(<Settings {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount render', () => {
    const wrapper = mountMockedProvider(<Settings {...defaultProps} />);

    expect(wrapper.find(Settings)).toHaveLength(1);
  });
  test('pass me', () => {
    const wrapper = mountMockedProvider(<Settings {...defaultProps} me={me} />);
    const { username } = me;

    expect(wrapper.find('input[name="username"]').prop('value')).toEqual(username);
  });
  test('pass updateUserResult', () => {
    const wrapper = mountMockedProvider(<Settings {...defaultProps} me={me} />);

    act(() => {
      wrapper.setProps({
        children: (<Settings {...defaultProps} me={me} updateUserResult={updateUserResult} />),
      });
    });
    const { field } = updateUserResult;

    expect(wrapper.find(Settings).state('success')).toEqual(field);
  });
  test('pass error', () => {
    const error = new BadInputError({
      message: 'invalidField',
      data: {
        invalidField: 'username',
      },
    });
    const errors = new GraphQLErrors([error]);
    const wrapper = mountMockedProvider(<Settings {...defaultProps} me={me} />);

    act(() => {
      wrapper.setProps({
        children: (<Settings {...defaultProps} me={me} error={errors} />),
      });
      wrapper.update();
    });
    const { field } = updateUserResult;

    expect(wrapper.find(Settings).state('errors')).toHaveProperty(field, 'invalidField');
  });
});
