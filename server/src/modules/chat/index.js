import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import ScalarsModule from '../scalars';
import CommonModule from '../common';
import AuthModule from '../auth';
import UserModule from '../user';

import ChatProvider from './ChatProvider';

import resolvers from './chatResolvers';
// import { isAuth } from '../middlewares';

const ChatModule = new GraphQLModule({
  name: 'chat',
  imports: [ScalarsModule, CommonModule, AuthModule, UserModule],
  providers: [ChatProvider],
  typeDefs: gql`
    enum ChatMessageType {
      system
      text
    }

    type ChatMessage {
      id: ID!
      senderId: ID
      type: ChatMessageType!
      content: String!
      time: DateTime!
      edited: Boolean!
      seen: Boolean!
    }

    type ChatHistory {
      date: DateTime!
      messages: [ChatMessage]
    }

    type Chat {
      id: ID!
      members: [ID!]!
      createdBy: ID!
      createDate: DateTime!
      history: [ChatHistory!]!
    }

    type ContactUpdate {
      contact: MyContact!
      chat: Chat!
    }

    type Query {
      chats: [Chat!]!
      myChats: [Chat!]!
    }

    type Mutation {
      createChat(userId: ID!): ContactUpdate!
      removeChat(id: ID!): Boolean!
      removeChats: Boolean!
    }

    type Subscription {
      chatCreated: ContactUpdate
    }
  `,
  resolvers,
  resolversComposition: {},
});

export default ChatModule;
