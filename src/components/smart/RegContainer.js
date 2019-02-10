import React from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
// eslint-disable-next-line
import gql from 'graphql-tag';

import Reg from '../dumb/Reg/Reg';
import mapMutationProps from './mapMutationProps';

const SIGN_UP_ASYNC_VALIDATION = gql`
  mutation SignUpAsyncValidation($field: String!, $value: String!) {
    signUpAsyncValidation(field: $field, value: $value) {
      field
      valid
    }
  }
`;

const signUpAsyncValidation = ({ render }) => (
  <Mutation mutation={SIGN_UP_ASYNC_VALIDATION}>
    {mapMutationProps(render, 'signUpAsyncValidation')}
  </Mutation>
);

const Composed = adopt({
  signUpAsyncValidation,
});

const RegContainer = () => (
  <Composed>
    {props => (<Reg {...props} />)}
  </Composed>
);

export default RegContainer;
