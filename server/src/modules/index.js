import { GraphQLModule } from '@graphql-modules/core';

import ScalarsModule from './scalars';
import CommonModule from './common';
import AuthModule from './auth';
import UserModule from './user';
import ChatModule from './chat';

const AppModule = new GraphQLModule({
  imports: [
    ScalarsModule,
    CommonModule,
    AuthModule,
    UserModule,
    ChatModule,
  ],
});

export default AppModule;
