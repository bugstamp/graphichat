import React, { Component, createContext } from 'react';

export const AppContext = createContext({});

class AppProvider extends Component {
  state = {}

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{}}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
