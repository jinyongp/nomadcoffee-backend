export default {
  Query: {
    async seeUser(_, { username }, { client }) {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: 'User Not Found' };
      return { ok: true, user };
    },
  },
};