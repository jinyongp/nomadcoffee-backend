import { User } from '@prisma/client';
import { authorized } from '../users.utils';

type FollowUserArgs = Pick<User, 'username'>;

export default {
  Mutation: {
    followUser: authorized(async (_, { username }: FollowUserArgs, { client, authorizedUser }) => {
      await client.user.update({
        where: { id: authorizedUser.id },
        data: { following: { connect: { username } } },
      });
      return { ok: true };
    }),
  },
};
