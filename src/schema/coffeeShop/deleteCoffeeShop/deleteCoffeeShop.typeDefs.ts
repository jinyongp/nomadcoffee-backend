import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    deleteCoffeeShop(id: Int!): CommonOutput!
  }
`;
