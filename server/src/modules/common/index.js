import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'apollo-server-express';

import DbProvider from './DbProvider';

const CommonModule = new GraphQLModule({
  name: 'common',
  providers: [PubSub, DbProvider],
});

export default CommonModule;
