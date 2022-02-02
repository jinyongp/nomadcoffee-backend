import { Category } from '@prisma/client';
import { ComputedFields, CursorArgs } from '@types';

export default {
  Category: {
    shops: async ({ id }, { items, lastId }: CursorArgs, { client }) => {
      return client.coffeeShop.findMany({
        where: { categories: { some: { id } } },
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
    },
    totalShops: async ({ id }, _, { client }) => {
      return client.coffeeShop.count({ where: { categories: { some: { id } } } });
    },
  },
} as ComputedFields<Category>;
