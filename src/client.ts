import { PrismaClient } from '@prisma/client';
import { throwNotFoundError } from 'utilities/errors';

const notFoundErrors = {
  User: throwNotFoundError('해당 사용자를 찾을 수 없습니다.', 'User Not Found'),
  CoffeeShop: throwNotFoundError('해당 커피숍을 찾을 수 없습니다.', 'CoffeeShop Not Found'),
  CoffeeShopPhoto: throwNotFoundError('해당 사진을 찾을 수 없습니다.', 'CoffeeShopPhoto Not Found'),
};

const client = new PrismaClient({
  rejectOnNotFound: {
    findUnique: notFoundErrors,
    findFirst: notFoundErrors,
  },
});

export default client;
