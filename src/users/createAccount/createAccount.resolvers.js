import bcrypt from 'bcrypt';

export default {
  Mutation: {
    async createAccount(_, { username, email, password }, { client }) {
      password = await bcrypt.hash(password, 10);
      const data = { username, email, password };
      await client.user.create({ data });
      return { ok: true };
    },
  },
};
