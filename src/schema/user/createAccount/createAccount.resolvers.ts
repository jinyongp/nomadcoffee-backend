import { User } from '@prisma/client';
import { Resolvers } from '@types';
import bcrypt from 'bcrypt';

type CreateAccountArgs = Pick<User, 'name' | 'username' | 'email' | 'password'>;

export default {
  Mutation: {
    createAccount: async (_, data: CreateAccountArgs, { client }) => {
      data.password = await bcrypt.hash(data.password, 10);
      await client.user.create({ data });
      return { ok: true };
    },
  },
} as Resolvers;
