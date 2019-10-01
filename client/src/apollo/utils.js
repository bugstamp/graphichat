import React from 'react';
import { Query, Mutation, Subscription } from 'react-apollo';
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

export const createQuery = (name, gqlQuery, queryProps = {}) => (containerProps) => {
  const queryContainerPropsKey = `${name}Props`;
  const queryContainerProps = has(containerProps, queryContainerPropsKey)
    ? get(containerProps, queryContainerPropsKey)
    : {};
  const { render } = containerProps;

  return (
    <Query
      query={gqlQuery}
      {...queryProps}
      {...queryContainerProps}
    >
      {props => render({
        ...props,
        name,
      })}
    </Query>
  );
};

export const createSubscription = (name, gqlSubscription, subscriptionProps = {}) => (containerProps) => {
  const subscriptionContainerPropsKey = `${name}Props`;
  const subscriptionContainerProps = has(containerProps, subscriptionContainerPropsKey)
    ? get(containerProps, subscriptionContainerPropsKey)
    : {};
  const { render } = containerProps;

  return (
    <Subscription
      subscription={gqlSubscription}
      {...subscriptionProps}
      {...subscriptionContainerProps}
    >
      {props => render({
        ...props,
        name,
      })}
    </Subscription>
  );
};
