import { CursorArgs, Resolvers } from '@types';

export default {
  Query: {
    seeCoffeeShops: async (_, { items, lastId }: CursorArgs, { client }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
      return { ok: true, coffeeShops };
    },
  },
} as Resolvers;
