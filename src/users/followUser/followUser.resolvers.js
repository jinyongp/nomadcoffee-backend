import { authorized } from '../users.utils';

export default {
  Mutation: {
    followUser: authorized(async (_, { username }, { client, authorizedUser }) => {
      await client.user.update({
        where: { id: authorizedUser.id },
        data: { following: { connect: { username } } },
      });
      return { ok: true };
    }),
  },
};
