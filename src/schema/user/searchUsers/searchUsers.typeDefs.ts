import { gql } from 'apollo-server-express';

export default gql`
  type UsersOutput {
    ok: Boolean!
    error: String
    users: [User]!
  }

  type Query {
    searchUsers(keyword: String!, items: Int!, lastId: Int): UsersOutput!
  }
`;
