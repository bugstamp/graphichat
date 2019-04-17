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
      ownerId: ID!
      content: String!
      time: DateTime!
      editTime: DateTime
      edited: Boolean 
    }

    type UserProfile {
      userId: ID!
      name: String!
      avatar: String
    }

    type Chat {
      ownerId: ID!
      profile: UserProfile
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
