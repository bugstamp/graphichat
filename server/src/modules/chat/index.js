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
      content: String!
      time: DateTime!
      editTime: DateTime
      ownerId: ID!
    }

    type UserProfile {
      name: String!
    }

    type Chat {
      ownerId: ID!
      userId: ID!
      createDate: DateTime!
      lastDate: DateTime!
      messages: [Message]
    }

    # type Query {
    # }
    #
    # type Mutation {
    # }
  `,
  resolvers,
  // resolversComposition: {
  //   'Query.me': [isAuth()],
  // },
});

export default ChatModule;
