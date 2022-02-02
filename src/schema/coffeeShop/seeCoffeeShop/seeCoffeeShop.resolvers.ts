import { CoffeeShop } from '@prisma/client';
import { Resolvers } from '@types';

type SeeCoffeeShopArgs = Pick<CoffeeShop, 'id'>;

export default {
  Query: {
    seeCoffeeShop: async (_, { id }: SeeCoffeeShopArgs, { client }) => {
      const coffeeShop = await client.coffeeShop.findUnique({ where: { id } });
      return { ok: true, coffeeShop };
    },
  },
} as Resolvers;
