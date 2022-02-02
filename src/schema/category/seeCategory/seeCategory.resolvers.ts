import { Category } from '@prisma/client';
import { Resolvers } from '@types';

type SeeCategoryArgs = Pick<Category, 'id'>;

export default {
  Query: {
    seeCategory: async (_, { id }: SeeCategoryArgs, { client }) => {
      const category = await client.category.findUnique({ where: { id } });
      return { ok: true, category };
    },
  },
} as Resolvers;
