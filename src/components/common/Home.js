import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Wrapper = styled.div`
  flex: 1 auto;
`;

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
      <Wrapper>
        <Query query={GET_ME}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) {
              return 'Error...';
            }
            console.log(data.getMe);

            return 'Home';
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Home;
