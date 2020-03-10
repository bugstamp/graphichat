import React from 'react';

const useHookMock = (hook, returnValue) => {
  return jest.spyOn(React, hook).mockImplementation(() => returnValue);
};

export default useHookMock;
