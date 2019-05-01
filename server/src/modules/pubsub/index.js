import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'apollo-server-express';

const PubSubModule = new GraphQLModule({
  name: 'pubsub',
  providers: [PubSub],
});

export default PubSubModule;
