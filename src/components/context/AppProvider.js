import React, { Component } from 'react';
import createReactContext from 'create-react-context';

export const AppContext = createReactContext({});

class AppProvider extends Component {
  state = {
    fetching: false,
    user: {},
  }

  setUser = (user) => {
    this.setState({ user });
  }

  setFetching = (fetching) => {
    this.setState({ fetching });
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          setFetching: this.setFetching,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
