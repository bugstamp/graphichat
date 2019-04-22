import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import ScalarsModule from '../scalars';

import resolvers from './chatResolvers';
// import { isAuth } from '../middlewares';

const ChatModule = new GraphQLModule({
  name: 'chat',
  imports: [ScalarsModule],
  typeDefs: gql`
    type ChatMessage {
      id: ID!
      userId: ID!
      content: String!
      time: DateTime!
      editTime: DateTime
      edited: Boolean!
      read: Boolean!
    }

    type Chat {
      id: ID!
      createDate: DateTime!
      messages: [ChatMessage!]!
    }

    type Query {
      chats: [Chat!]!
    }

    type Mutation {
      removeChat(id: ID!): Boolean
    }
  `,
  resolvers,
  resolversComposition: {},
  context: context => context,
});

export default ChatModule;
