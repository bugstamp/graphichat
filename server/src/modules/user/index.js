import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import ScalarsModule from '../scalars';
import ChatModule from '../chat';

import resolvers from './userResolvers';
import { isAuth } from '../middlewares';

const UserModule = new GraphQLModule({
  name: 'user',
  imports: [ScalarsModule, ChatModule],
  typeDefs: gql`
    enum Status {
      OFFLINE
      ONLINE
    }

    enum regStatus {
      EMAIL_UNCONFIRMED
      UNCOMPLETED
      COMPLETED
    }

    type Social {
      google: ID
      facebook: ID
      github: ID
    }

    type Contact {
      userId: ID!
      chatId: ID!
    }

    type User {
      id: ID!
      username: String!
      email: String!
      displayName: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: DateTime
      status: Status
      createDate: DateTime!
      lastDate: DateTime!
      refreshToken: String
      regStatus: regStatus!
      socials: Social
      contacts: [Contact!]!
    }

    type myContact {
      person: User
      messages: [ChatMessage!]!
    }

    input UserCreateForm {
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: String
      regStatus: String!
    }

    type Query {
      user(id: ID!): User
      users: [User!]!
      me: User
      myContacts: [myContact!]!
      searchUsers(searchValue: String!): [User!]!
    }

    type Mutation {
      createUser(form: UserCreateForm): User!
      deleteUser: User!
      addContact(userId: ID!): Contact
      removeContacts(userId: ID!): User!
    }
  `,
  resolvers,
  resolversComposition: {
    'Query.me': [isAuth()],
    'Query.myContacts': [isAuth()],
  },
  context: context => context,
});

export default UserModule;
