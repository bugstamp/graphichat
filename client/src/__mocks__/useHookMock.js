import React from 'react';

const useHookMock = (hook, fn = jest.fn()) => {
  return jest.spyOn(React, hook).mockImplementation(fn);
};

export default useHookMock;
