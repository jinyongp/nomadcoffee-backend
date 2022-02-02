import { User } from '@prisma/client';
import { Resolvers } from '@types';

type SeeUserArgs = Pick<User, 'username'>;

export default {
  Query: {
    seeUser: async (_, { username }: SeeUserArgs, { client }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: 'User Not Found' };
      return { ok: true, user };
    },
  },
} as Resolvers;
