import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Wrapper = styled.div`
  flex: 1 auto;
`;

const GET_ME = gql`
  {
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
      friends {
        id
        name
      }
      socials {
        google {
          id
        }
        facebook {
          id
        }
        github {
          id
        }
      }
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
              console.log(error);
              return 'Error...';
            }
            console.log(data);

            return 'Home';
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Home;
