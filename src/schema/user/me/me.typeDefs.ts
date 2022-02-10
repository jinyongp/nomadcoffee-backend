import { gql } from 'apollo-server-express';

export default gql`
  type UserOutput {
    ok: Boolean!
    error: String
    user: User
  }

  type Query {
    me: UserOutput!
  }
`;
