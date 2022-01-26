import { gql } from 'apollo-server';

export default gql`
  type CommonOutput {
    ok: Boolean!
    error: String
  }
`;
