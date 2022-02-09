import { CoffeeShop } from '@prisma/client';
import { authorized } from '@schema/user/users.utils';
import { Resolvers } from '@types';

type DeleteCoffeeShopArgs = Pick<CoffeeShop, 'id'>;

export default {
  Mutation: {
    deleteCoffeeShop: authorized(
      async (_, { id }: DeleteCoffeeShopArgs, { client, authorizedUser }) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          select: { userId: true },
        });
        const isMine = coffeeShop.userId === authorizedUser.id;
        if (!isMine) return { ok: false, error: '사용자가 소유한 커피숍이 아닙니다.' };
        await client.coffeeShop.delete({ where: { id } });
        return { ok: true };
      },
    ),
  },
} as Resolvers;
