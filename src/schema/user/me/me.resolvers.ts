import { authorized } from '@schema/user/users.utils';
import { Resolvers } from '@types';

export default {
  Query: {
    me: authorized(async (_, __, { client, authorizedUser }) => {
      const user = await client.user.findUnique({ where: { id: authorizedUser.id } });
      return { ok: true, user };
    }),
  },
} as Resolvers;
