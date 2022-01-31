export default {
  User: {
    async followers({ id }, { items, lastId }, { client }) {
      return client.user
        .findUnique({ where: { id } })
        .followers({ take: items, ...(lastId && { skip: 1, cursor: { id: lastId } }) });
    },
    async following({ id }, { items, lastId }, { client }) {
      return client.user
        .findUnique({ where: { id } })
        .following({ take: items, ...(lastId && { skip: 1, cursor: { id: lastId } }) });
    },
    async totalFollowers({ id }, _, { client }) {
      return client.user.count({ where: { following: { some: { id } } } });
    },
    async totalFollowing({ id }, _, { client }) {
      return client.user.count({ where: { followers: { some: { id } } } });
    },
  },
};
