import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import ScalarsModule from '../scalars';
import AuthModule from '../auth';

import UserProvider from './UserProvider';

import resolvers from './userResolvers';
import { isAuth } from '../middlewares';

const UserModule = new GraphQLModule({
  name: 'user',
  imports: [ScalarsModule, AuthModule],
  providers: [UserProvider],
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

    type UserAvatar {
      sm: String
      md: String
    }

    type User {
      avatar: UserAvatar
      id: ID!
      username: String
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

    type MyContact {
      id: ID!
      chatId: ID!
      userInfo: User!
    }

    input UserCreateForm {
      username: String
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: String
      regStatus: String!
    }

    type UserActivityUpdate {
      userId: ID!
      status: Status!
      lastDate: DateTime!
    }

    type Query {
      user(id: ID!): User
      users: [User!]!
      me: User
      myContacts: [MyContact!]!
      searchUsers(searchValue: String!): [User!]!
    }

    type Mutation {
      createUser(form: UserCreateForm): User!
      deleteUser(id: ID!): User!
      removeUserContacts(userId: ID!): User!
      uploadAvatar(file: Upload!): UserAvatar!
    }

    type Subscription {
      userActivityUpdated: UserActivityUpdate!
      userUpdated: User!
    }
  `,
  resolvers,
  resolversComposition: {
    'Query.me': [isAuth()],
    'Query.myContacts': [isAuth()],
  },
});

export default UserModule;
