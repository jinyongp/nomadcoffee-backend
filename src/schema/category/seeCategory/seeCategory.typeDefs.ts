import { gql } from 'apollo-server-express';

export default gql`
  type CategoryOutput {
    ok: Boolean!
    error: String
    category: Category
  }

  type Query {
    seeCategory(id: Int!): CategoryOutput
  }
`;
