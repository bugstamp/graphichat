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
      google: ID!
      facebook: ID!
      github: ID!
    }

    type Contact {
      userId: ID!
      chatId: ID!
    }

    type User {
      id: ID!
      username: String
      email: String!
      displayName: String
      firstName: String
      lastName: String
      gender: String
      birthday: DateTime
      status: Status
      createDate: DateTime!
      lastDate: DateTime!
      refreshToken: String
      regStatus: regStatus
      socials: Social
      contacts: Contact
    }

    type MyContact {
      person: User
      messages: ChatMessage
    }

    type Query {
      user(id: ID!): User
      users: [User]
      me: User
      myContacts: [MyContact]
    }

    type Mutation {
      delete: User
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
