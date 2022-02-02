import { CoffeeShop } from '@prisma/client';
import { authorized } from '@schema/user/users.utils';
import { Resolvers } from '@types';

type CreateCoffeeShopArgs = Pick<CoffeeShop, 'name' | 'latitude' | 'longitude'> & {
  photos?: string[];
  categories?: string[];
};

export default {
  Mutation: {
    createCoffeeShop: authorized(
      async (_, args: CreateCoffeeShopArgs, { authorizedUser, client }) => {
        const { name, latitude, longitude, photos, categories } = args;
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: { connect: { id: authorizedUser.id } },
            photos: {
              create: photos?.map((url) => ({ url })),
            },
            categories: {
              connectOrCreate: categories?.map((name) => {
                const slug = name.toLowerCase().replaceAll(' ', '-');
                return { where: { slug }, create: { name, slug } };
              }),
            },
          },
        });
        return { ok: true };
      },
    ),
  },
} as Resolvers;
