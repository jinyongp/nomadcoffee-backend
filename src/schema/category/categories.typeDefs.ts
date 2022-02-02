import { gql } from 'apollo-server-express';

export default gql`
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops(items: Int!, lastId: Int): [CoffeeShop]!
    totalShops: Int!
  }
`;
