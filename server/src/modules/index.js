import { GraphQLModule } from '@graphql-modules/core';

import ChatModule from './chat';
import AuthModule from './auth';
import UserModule from './user';
import ScalarsModule from './scalars';
import PubSubModule from './pubsub';

const AppModule = new GraphQLModule({
  imports: [
    PubSubModule,
    ScalarsModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
  context: context => context,
});

export default AppModule;
