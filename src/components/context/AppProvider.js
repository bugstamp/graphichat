import React, { Component } from 'react';
import createReactContext from 'create-react-context';

export const AppContext = createReactContext({});

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
