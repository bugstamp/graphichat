import React, { Component } from 'react';
import createReactContext from 'create-react-context';

export const AppContext = createReactContext({});

class AppProvider extends Component {
  state = {
    user: {},
  }

  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          user,
          setUser: this.setUser,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
