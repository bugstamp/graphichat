import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'graphql-subscriptions';

const PubSubModule = new GraphQLModule({
  name: 'pubsub',
  providers: [PubSub],
});

export default PubSubModule;
