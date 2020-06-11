import { GET_CHAT } from '../chat';

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
  const { chatId, message } = result;
  const { chat, contact } = client.readQuery({ query: GET_CHAT, variables: { chatId } });

  client.writeQuery({
    query: GET_CHAT,
    data: {
      contact,
      chat: {
        ...chat,
        messages: [...chat.messages, message],
      },
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
  addMessageUpdate(client, messageAdded);
};
