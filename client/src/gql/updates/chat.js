import { GET_CHAT } from '../chat';
import { GET_MY_CHATS } from '../user';

export const getOptimisticMessage = ({
  chatId,
  myId,
  optimisticId,
  content,
  time,
}) => ({
  __typename: 'Mutation',
  addMessage: {
    chatId,
    optimistic: true,
    optimisticId,
    message: {
      id: optimisticId,
      senderId: myId,
      content,
      time,
      type: 'text',
      seen: false,
      edited: false,
      __typename: 'ChatMessage',
    },
    __typename: 'MessageUpdate',
  },
});

export const fetchMoreMessagesUpdate = (prev, { fetchMoreResult: { chatMessages } }) => ({
  ...prev,
  chat: {
    ...prev.chat,
    messages: [...chatMessages, ...prev.chat.messages],
  },
});

export const addMessageUpdate = (client, result) => {
  const { chatId, optimistic, message } = result;
  const { chat, contact } = client.readQuery({ query: GET_CHAT, variables: { chatId } });

  client.writeQuery({
    query: GET_CHAT,
    data: {
      contact,
      chat: {
        ...chat,
        messages: [...chat.messages, { ...message, isOptimistic: optimistic }],
      },
    },
  });
};

export const addMessageSubscriptionUpdate = (client, result) => {
  const { chatId, message } = result;
  const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS, variables: { chatId } });

  client.writeQuery({
    query: GET_MY_CHATS,
    data: {
      myContacts,
      myChats: myChats.map((chat) => {
        const { id, messages } = chat;
        if (id === chatId) {
          return { ...chat, messages: [...messages, message] };
        }
        return chat;
      }),
    },
  });
};

export const addMessageMutationUpdate = (client, { data: { addMessage: newMessage } }) => {
  addMessageUpdate(client, newMessage);
};

export const messageAddedSubscriptionUpdate = ({
  client,
  subscriptionData: { data: { messageAdded } },
}) => {
  addMessageSubscriptionUpdate(client, messageAdded);
};

export const chatCreatedUpdate = (client, data) => {
  const { contact, chat } = data;
  const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });

  client.writeQuery({
    query: GET_MY_CHATS,
    data: {
      myContacts: [...myContacts, contact],
      myChats: [...myChats, chat],
    },
  });
};

export const createChatMutationUpdate = (client, {
  data: { createChat },
}) => chatCreatedUpdate(client, createChat);

export const chatCreatedSubscriptionUpdate = ({
  client,
  subscriptionData: { chatCreated },
}) => chatCreatedUpdate(client, chatCreated);
