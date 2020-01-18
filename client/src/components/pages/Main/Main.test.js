import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import wait from 'waait';

import Main from './Main';
import SettingsDialog from './SettingsDialog';
import { AppGrid } from './styled';

import { me } from '../../../__mocks__/mockedQueryData';
import { mountMockedProvider } from '../../../__mocks__/mockedProvider';

// eslint-disable-next-line
const TestChild = ({ toggleSettingsDialog, signOut }) => (
  <div>
    <button type="button" className="btn1" onClick={toggleSettingsDialog} />
    <button type="button" className="btn2" onClick={signOut} />
  </div>
);

describe('test Main', () => {
  const mockSignOut = jest.fn();
  const defaultProps = {
    loading: false,
    userId: me.id,
    sessionExpired: false,
    signOut: mockSignOut,
  };
  test('snapshot render', () => {
    const wrapper = shallow(<Main {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount render | check default type of children prop', async () => {
    const wrapper = mountMockedProvider((<Main {...defaultProps} />));

    expect(wrapper.find(Main)).toBeTruthy();
    expect(wrapper.find(AppGrid)).toBeTruthy();
    expect(wrapper.find(Main).prop('children')).toBe(null);

    await act(async () => {
      wrapper.update();
    });
  });
  test('pass child | pass props to child clone', async () => {
    const wrapper = mountMockedProvider(<Main {...defaultProps}><TestChild /></Main>);

    expect(wrapper.find(TestChild)).toBeTruthy();
    expect(wrapper.find(TestChild).prop('initialLoading')).toBe(false);
    expect(wrapper.find(TestChild).prop('toggleSettingsDialog')).toBeInstanceOf(Function);
    expect(wrapper.find(TestChild).prop('signOut')).toBeInstanceOf(Function);

    await act(async () => {
      wrapper.update();
    });
  });
  test('toggle settingsDialog', async () => {
    const wrapper = mountMockedProvider(<Main {...defaultProps}><TestChild /></Main>);
    expect(wrapper.find(SettingsDialog).prop('open')).toBe(false);

    await act(async () => {
      await wait();
      wrapper.find(TestChild).find('.btn1').simulate('click');
      wrapper.update();
      expect(wrapper.find(SettingsDialog).prop('open')).toBe(true);
    });
  });
  test('signOut call', async () => {
    const wrapper = mountMockedProvider((
      <Main {...defaultProps}>
        <TestChild />
      </Main>
    ));
    expect(wrapper.find(Main).prop('userId')).toBe(me.id);

    await act(async () => {
      wrapper.find(TestChild).find('.btn2').simulate('click');
      expect(mockSignOut).toBeCalledWith({ variables: { userId: me.id } });
    });
  });
  test('signOut call after session has expired', async () => {
    let wrapper = mountMockedProvider((
      <Main {...defaultProps}>
        <TestChild />
      </Main>
    ));
    expect(wrapper.find(Main).prop('sessionExpired')).toBe(false);

    await act(async () => {
      await wait();
      wrapper = mountMockedProvider((
        <Main {...defaultProps} sessionExpired>
          <TestChild />
        </Main>
      ));
      expect(wrapper.find(Main).prop('sessionExpired')).toBe(true);
      expect(mockSignOut).toBeCalledWith({ variables: { userId: me.id } });
    });
  });
});
