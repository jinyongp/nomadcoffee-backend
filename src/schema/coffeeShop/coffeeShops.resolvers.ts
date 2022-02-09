import { CoffeeShop } from '@prisma/client';
import { ComputedFields, CursorArgs } from '@types';

export default {
  CoffeeShop: {
    user: async ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    photos: async ({ id }, { items, lastId }: CursorArgs, { client }) => {
      return client.coffeeShopPhoto.findMany({
        where: { shop: { id } },
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
    },
    isMine: async ({ userId }, _, { authorizedUser }) => {
      return userId === authorizedUser?.id;
    },
    categories: async ({ id }, { items, lastId }: CursorArgs, { client }) => {
      return client.category.findMany({
        where: { shops: { some: { id } } },
        take: items,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      });
    },
  },
} as ComputedFields<CoffeeShop>;
