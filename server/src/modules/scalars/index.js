import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';

import resolvers from './scalarsResolvers';

const ScalarsModule = new GraphQLModule({
  name: 'scalars',
  typeDefs: gql`
    scalar DateTime
    scalar EmailAddress
    scalar NegativeFloat
    scalar NegativeInt
    scalar NonNegativeFloat
    scalar NonNegativeInt
    scalar NonPositiveFloat
    scalar NonPositiveInt
    scalar PhoneNumber
    scalar PositiveFloat
    scalar PositiveInt
    scalar PostalCode
    scalar RegularExpression
    scalar UnsignedFloat
    scalar UnsignedInt
    scalar URL
  `,
  resolvers,
});

export default ScalarsModule;
