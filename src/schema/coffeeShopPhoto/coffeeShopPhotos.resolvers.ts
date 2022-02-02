import { CoffeeShopPhoto } from '@prisma/client';
import { ComputedFields } from '@types';

export default {
  CoffeeShopPhoto: {
    shop: async ({ id }, _, { client }) => {
      return client.coffeeShop.findUnique({ where: { id } });
    },
  },
} as ComputedFields<CoffeeShopPhoto>;
