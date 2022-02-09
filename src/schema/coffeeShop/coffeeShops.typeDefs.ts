import { gql } from 'apollo-server-express';

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    isMine: Boolean!
    photos(items: Int!, lastId: Int): [CoffeeShopPhoto]!
    categories(items: Int!, lastId: Int): [Category]!
    createdAt: String!
    updatedAt: String!
  }
`;
