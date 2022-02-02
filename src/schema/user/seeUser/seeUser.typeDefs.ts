import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeUser(username: String!): UserOutput
  }
`;
