import { authorized } from '../users.utils';

export default {
  Mutation: {
    unfollowUser: authorized(async (_, { username }, { authorizedUser, client }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) throw { code: 'P2025' };
      await client.user.update({
        where: { id: authorizedUser.id },
        data: { following: { disconnect: { username } } },
      });
      return { ok: true };
    }),
  },
};
