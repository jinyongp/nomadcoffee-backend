import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editProfile(
      username: String
      password: String
      email: String
      name: String
      location: String
      avatarURL: Upload
      githubUsername: String
    ): CommonOutput
  }
`;
