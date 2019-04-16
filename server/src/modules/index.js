import { GraphQLModule } from '@graphql-modules/core';

import ScalarsModule from './scalars';
import UserModule from './user';
import AuthModule from './auth';
import ChatModule from './chat';

const AppModule = new GraphQLModule({
  imports: [
    ScalarsModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
});

export default AppModule;
