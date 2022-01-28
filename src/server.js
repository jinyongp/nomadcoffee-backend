import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import client from './client';
import schema from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
  schema,
  async context({ req }) {
    const authorizedUser = await getUser(req.headers.authorization);
    return { client, authorizedUser };
  },
});

const port = process.env.PORT || 4000;

(async () => {
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use('/static', express.static('uploads'));
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
})();
