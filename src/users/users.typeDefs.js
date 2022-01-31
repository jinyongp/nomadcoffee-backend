import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    followers(items: Int!, lastId: Int): [User]!
    following(items: Int!, lastId: Int): [User]!
    totalFollowers: Int!
    totalFollowing: Int!
    createdAt: String!
    updatedAt: String!
  }

  type UserOutput {
    ok: Boolean!
    user: User
    error: String
  }
`;
