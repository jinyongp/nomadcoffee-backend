import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import schema from './schema';

const server = new ApolloServer({ schema });

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
