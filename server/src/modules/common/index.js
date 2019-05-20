import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'graphql-subscriptions';

import DbProvider from './DbProvider';

const CommonModule = new GraphQLModule({
  name: 'common',
  providers: [PubSub, DbProvider],
});

export default CommonModule;
