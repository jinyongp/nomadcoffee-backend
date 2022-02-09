import { CursorArgs, Resolvers } from '@types';

type SeeCoffeeShopsArgs = CursorArgs & { userId?: number };

export default {
  Query: {
    seeCoffeeShops: async (_, { items, lastId, userId }: SeeCoffeeShopsArgs, { client }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
        ...(userId && { where: { userId } }),
      });
      return { ok: true, coffeeShops };
    },
  },
} as Resolvers;
