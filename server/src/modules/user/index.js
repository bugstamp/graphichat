import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import ScalarsModule from '../scalars';
import PubSubModule from '../pubsub';

import resolvers from './userResolvers';
import { isAuth } from '../middlewares';

const UserModule = new GraphQLModule({
  name: 'user',
  imports: [PubSubModule, ScalarsModule],
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

    type UserSocials {
      google: ID
      facebook: ID
      github: ID
    }

    type UserContactSettings {
      notifications: Boolean!
    }

    type UserContact {
      id: ID!
      userId: ID!
      chatId: ID!
      settings: UserContactSettings
    }

    type User {
      id: ID!
      username: String!
      email: EmailAddress!
      phone: PhoneNumber
      displayName: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: DateTime
      status: Status!
      createDate: DateTime!
      lastDate: DateTime!
      refreshToken: String
      regStatus: regStatus!
      socials: UserSocials!
      contacts: [UserContact!]!
    }

<<<<<<< HEAD
    type MyContact {
      chatId: ID!
      userInfo: User!
=======
    type myContact {
      person: User
      messages: [ChatMessage!]!
>>>>>>> 67bd404fca650cc32b331344eea754a728765526
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
<<<<<<< HEAD
      myContacts: [MyContact!]!
=======
      myContacts: [myContact!]!
>>>>>>> 67bd404fca650cc32b331344eea754a728765526
      searchUsers(searchValue: String!): [User!]!
    }

    type Mutation {
      createUser(form: UserCreateForm): User!
      deleteUser: User!
      removeContacts(userId: ID!): User!
    }

    # type Subscription {}
  `,
  resolvers,
  resolversComposition: {
    'Query.me': [isAuth()],
    'Query.myContacts': [isAuth()],
  },
  context: context => context,
});

export default UserModule;
