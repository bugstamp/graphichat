import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'apollo-server-express';

import db from '../../db';

const CommonModule = new GraphQLModule({
  name: 'common',
  providers: [PubSub],
  context: () => ({ db }),
});

export default CommonModule;
