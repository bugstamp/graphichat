import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { get, has } from 'lodash';

export const createMutation = (name, gqlMutation, mutationProps = {}) => (containerProps) => {
  const mutationContainerPropsKey = `${name}Props`;
  const mutationContainerProps = has(containerProps, mutationContainerPropsKey)
    ? get(containerProps, mutationContainerPropsKey)
    : {};
  const { render } = containerProps;

  return (
    <Mutation
      mutation={gqlMutation}
      {...mutationProps}
      {...mutationContainerProps}
    >
      {(mutation, result) => render({
        mutation,
        result,
        name,
      })}
    </Mutation>
  );
};

// export const createQuery = (name, gqlQuery, queryProps = {}) => (containerProps) => {
//   const queryContainerPropsKey = `${name}Props`;
//
//   return (
//     <Query
//       query={queryProps}
//     />
//   );
// };
