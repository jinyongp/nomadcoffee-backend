import { gql } from 'apollo-server-express';

export default gql`
  scalar Upload

  type CommonOutput {
    ok: Boolean!
    error: String
  }
`;
