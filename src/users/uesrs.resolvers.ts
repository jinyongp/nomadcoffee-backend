import { User } from '@prisma/client';
import { ComputedFields, CursorArgs } from '../types';

export default {
  User: {
    followers: async ({ id }, { items, lastId }: CursorArgs, { client }) => {
      return client.user
        .findUnique({ where: { id } })
        .followers({ take: items, ...(lastId && { skip: 1, cursor: { id: lastId } }) });
    },
    following: async ({ id }, { items, lastId }: CursorArgs, { client }) => {
      return client.user
        .findUnique({ where: { id } })
        .following({ take: items, ...(lastId && { skip: 1, cursor: { id: lastId } }) });
    },
    totalFollowers: async ({ id }, _, { client }) => {
      return client.user.count({ where: { following: { some: { id } } } });
    },
    totalFollowing: async ({ id }, _, { client }) => {
      return client.user.count({ where: { followers: { some: { id } } } });
    },
  },
} as ComputedFields<User>;
