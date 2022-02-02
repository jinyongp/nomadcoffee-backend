import { CursorArgs, Resolvers } from '@types';

export default {
  Query: {
    seeCategories: async (_, { items, lastId }: CursorArgs, { client }) => {
      const categories = await client.category.findMany({
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
      return { ok: true, categories };
    },
  },
} as Resolvers;
