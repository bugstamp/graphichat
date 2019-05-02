import { GraphQLModule } from '@graphql-modules/core';

import ChatModule from './chat';
import AuthModule from './auth';
import UserModule from './user';
import PubSubModule from './pubsub';
import ScalarsModule from './scalars';

const AppModule = new GraphQLModule({
  imports: [
    ScalarsModule,
    PubSubModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
});

export default AppModule;
