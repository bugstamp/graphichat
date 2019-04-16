import { GraphQLModule } from '@graphql-modules/core';

import ScalarsModule from './scalars';
import UserModule from './user';
import AuthModule from './auth';

const AppModule = new GraphQLModule({
  imports: [
    ScalarsModule,
    UserModule,
    AuthModule,
  ],
});

export default AppModule;
