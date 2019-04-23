import { GraphQLModule } from '@graphql-modules/core';

import PubSubModule from './pubsub';
import ScalarsModule from './scalars';
import UserModule from './user';
import AuthModule from './auth';
import ChatModule from './chat';

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
