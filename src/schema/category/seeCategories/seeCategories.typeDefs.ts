import { gql } from 'apollo-server-express';

export default gql`
  type CategoriesOutput {
    ok: Boolean!
    error: String
    categories: [Category]
  }

  type Query {
    seeCategories(items: Int!, lastId: Int): CategoriesOutput!
  }
`;
