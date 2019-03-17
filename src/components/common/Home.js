import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ME = gql`
  query GetMe {
    getMe {
      username
      email
      displayName
      firstName
      lastName
      birthday
      gender
      status
      lastDate
    }
  }
`;

class Home extends Component {
  state = {}

  render() {
    return (
        <Query query={GET_ME}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) {
              return 'Error...';
            }
            console.log(data.getMe);

            return (
              'home'
            );
          }}
        </Query>
    );
  }
}

export default Home;
