import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int
    username: String
    password: String
  }

  type Query {
    getUser(username: String!): User
  }

  type Mutation {
    createUser(username: String!, password: String!): Boolean!
  }
`;
