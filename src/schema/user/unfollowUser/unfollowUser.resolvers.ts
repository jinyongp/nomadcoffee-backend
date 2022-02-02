import { User } from '@prisma/client';
import { Resolvers } from '@types';
import { authorized } from '../users.utils';

type UnfollowUserArgs = Pick<User, 'username'>;

export default {
  Mutation: {
    unfollowUser: authorized(
      async (_, { username }: UnfollowUserArgs, { authorizedUser, client }) => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) throw { code: 'P2025' };
        await client.user.update({
          where: { id: authorizedUser.id },
          data: { following: { disconnect: { username } } },
        });
        return { ok: true };
      },
    ),
  },
} as Resolvers;
