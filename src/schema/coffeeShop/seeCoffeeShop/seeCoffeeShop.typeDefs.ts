import { gql } from 'apollo-server-express';

export default gql`
  type CoffeeShopOutput {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }

  type Query {
    seeCoffeeShop(id: Int!): CoffeeShopOutput
  }
`;
