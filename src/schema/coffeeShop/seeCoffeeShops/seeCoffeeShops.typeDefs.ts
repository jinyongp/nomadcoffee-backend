import { gql } from 'apollo-server-express';

export default gql`
  type CoffeeShopsOutput {
    ok: Boolean!
    error: String
    coffeeShops: [CoffeeShop]
  }

  type Query {
    seeCoffeeShops(items: Int!, lastId: Int, userId: Int): CoffeeShopsOutput!
  }
`;
