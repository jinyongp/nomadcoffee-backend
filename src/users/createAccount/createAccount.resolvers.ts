import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

type CreateAccountArgs = Pick<User, 'username' | 'email' | 'password'>;

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }: CreateAccountArgs, { client }) => {
      password = await bcrypt.hash(password, 10);
      const data = { username, email, password };
      await client.user.create({ data });
      return { ok: true };
    },
  },
} as Resolvers;
