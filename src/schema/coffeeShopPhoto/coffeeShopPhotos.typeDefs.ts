import { gql } from 'apollo-server-express';

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
`;
