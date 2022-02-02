import { CoffeeShop } from '@prisma/client';
import { authorized } from '@schema/user/users.utils';
import { Resolvers } from '@types';

type EditCoffeeShopArgs = Pick<CoffeeShop, 'id'> &
  Partial<Pick<CoffeeShop, 'name' | 'latitude' | 'longitude'>> & {
    photos?: string[];
    categories?: string[];
  };

export default {
  Mutation: {
    editCoffeeShop: authorized(async (_, args: EditCoffeeShopArgs, { authorizedUser, client }) => {
      const { id, name, latitude, longitude, photos, categories } = args;
      const coffeeShop: CoffeeShop & { photos?: { id: number }[]; categories?: { id: number }[] } =
        await client.coffeeShop.findFirst({
          where: { AND: [{ id }, { userId: authorizedUser.id }] },
          rejectOnNotFound: true,
          include: {
            ...(photos && { photos: { select: { id: true } } }),
            ...(categories && { categories: { select: { id: true } } }),
          },
        });

      await client.coffeeShop.update({
        where: { id },
        data: {
          name,
          latitude,
          longitude,
          photos: {
            deleteMany: coffeeShop?.photos,
            create: photos?.map((url) => ({ url })),
          },
          categories: {
            disconnect: coffeeShop?.categories,
            connectOrCreate: categories?.map((name) => {
              const slug = name.toLowerCase().replaceAll(' ', '-');
              return { where: { slug }, create: { name, slug } };
            }),
          },
        },
      });

      return { ok: true };
    }),
  },
} as Resolvers;
