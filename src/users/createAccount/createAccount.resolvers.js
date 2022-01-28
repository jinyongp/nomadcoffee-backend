import bcrypt from 'bcrypt';
import { protectResolver } from '../users.utils';

export default {
  Mutation: {
    createAccount: protectResolver(async (_, { username, email, password }, { client }) => {
      password = await bcrypt.hash(password, 10);
      const data = { username, email, password };
      await client.user.create({ data });
      return { ok: true };
    }),
  },
};
