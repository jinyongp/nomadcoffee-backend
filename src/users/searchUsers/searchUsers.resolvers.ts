import { CursorArgs, Resolvers } from '../../types';

type SearchUsersArgs = CursorArgs & { keyword: string };

export default {
  Query: {
    searchUsers: async (_, { keyword, items, lastId }: SearchUsersArgs, { client }) => {
      const users = await client.user.findMany({
        where: { username: { startsWith: keyword, mode: 'insensitive' } },
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
      return { ok: true, users };
    },
  },
} as Resolvers;
