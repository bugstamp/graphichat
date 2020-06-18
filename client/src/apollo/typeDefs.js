import { gql } from 'apollo-boost';

export default gql`
  extend type ChatMessage {
    isOptimistic: Boolean
  }
`;
