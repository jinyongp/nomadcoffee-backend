import { gql } from 'apollo-server';

export default gql`
  scalar Upload

  type CommonOutput {
    ok: Boolean!
    error: String
  }
`;
