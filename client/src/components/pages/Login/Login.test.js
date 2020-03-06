import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import wait from 'waait';
import Drawer from '@material-ui/core/Drawer';

import Login from './Login';
import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';

// import { me } from '../../../__mocks__/mockedQueryData';
import { mountMockedProvider } from '../../../__mocks__/mockedProvider';

describe('Login', () => {
  test('snapshot render', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper).toMatchSnapshot();
  });

  test('mount render', async () => {
    const wrapper = mountMockedProvider(<Login />);

    await act(async () => {
      expect(wrapper.find(Login)).toHaveLength(1);
    });
  });

  test('call toggleForm', async () => {
    const wrapper = mountMockedProvider(<Login />);

    await act(async () => {
      wrapper.update();
      expect(wrapper.find(LoginPresentation).prop('stopAnimation')).toBe(true);
    });
  });
});
