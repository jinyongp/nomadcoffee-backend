import { gql } from 'apollo-server';

export default gql`
  type TokenOutput {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(username: String!, password: String!): TokenOutput
  }
`;
