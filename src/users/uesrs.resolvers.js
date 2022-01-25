import client from '../client';

export default {
  Query: {
    async getUser(_, { username }) {
      return client.user.findFirst({ where: { username } });
    },
  },
  Mutation: {
    async createUser(_, { username, password }) {
      const user = await client.user.findFirst({ where: { username } });
      if (user) return false;

      await client.user.create({ data: { username, password } });
      return true;
    },
  },
};
