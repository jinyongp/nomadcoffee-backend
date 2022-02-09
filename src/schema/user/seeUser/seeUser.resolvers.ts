import { User } from '@prisma/client';
import { Resolvers } from '@types';

type SeeUserArgs = Pick<User, 'username'>;

export default {
  Query: {
    seeUser: async (_, { username }: SeeUserArgs, { client }) => {
      const user = await client.user.findUnique({ where: { username } });
      return { ok: true, user };
    },
  },
} as Resolvers;
