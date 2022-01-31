export default {
  Query: {
    async searchUsers(_, { keyword, items, lastId }, { client }) {
      const users = await client.user.findMany({
        where: { username: { startsWith: keyword, mode: 'insensitive' } },
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
      return { ok: true, users };
    },
  },
};
