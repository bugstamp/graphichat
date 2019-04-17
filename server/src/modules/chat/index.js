import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import resolvers from './chatResolvers';
import ScalarsModule from '../scalars';

// import { isAuth } from '../middlewares';

const ChatModule = new GraphQLModule({
  name: 'chat',
  imports: [ScalarsModule],
  typeDefs: gql`
    type Message {
      userId: ID!
      content: String!
      time: DateTime!
      editTime: DateTime
      edited: Boolean
      read: Boolean
    }

    type Chat {
      members: [ID!]
      createDate: DateTime!
      lastDate: DateTime!
      messages: [Message]
    }

    type Query {
      myChats: [Chat]
      chats: [Chat]
    }

    # type Mutation {
    # }
  `,
  resolvers,
  // resolversComposition: {
  //   'Query.me': [isAuth()],
  // },
});

export default ChatModule;
