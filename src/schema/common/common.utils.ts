import { Prisma } from '@prisma/client';
import { Resolver } from '@types';

export function handleResolverError(resolver: Resolver): Resolver {
  return async (root, args, context, info) => {
    try {
      return await resolver(root, args, context, info);
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { code, meta } = error;
        switch (code) {
          case 'P2002':
            switch ((meta as { target: string[] }).target[0]) {
              case 'email':
                return { ok: false, error: '이미 등록된 이메일입니다.' };
              case 'username':
                return { ok: false, error: '이미 등록된 이름입니다.' };
              default:
                return { ok: false, error: '이미 등록된 사용자입니다.' };
            }
          case 'User Not Found':
            return { ok: false, error: '해당 사용자를 찾을 수 없습니다.' };
          case 'CoffeeShop Not Found':
            return { ok: false, error: '해당 커피숍을 찾을 수 없습니다.' };
          case 'CoffeeShopPhoto Not Found':
            return { ok: false, error: '해당 사진을 찾을 수 없습니다.' };
          default:
            console.log(error);
            return {
              ok: false,
              error: `서버에서 예상치 못한 문제가 발생했습니다.${code ? ` (코드: ${code})` : ''}`,
            };
        }
      } else {
        // @see https://www.prisma.io/docs/reference/api-reference/error-reference
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
          console.error('PrismaClientUnknownRequestError');
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
          console.error('PrismaClientRustPanicError');
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
          console.error('PrismaClientInitializationError');
        } else if (error instanceof Prisma.PrismaClientValidationError) {
          console.error('PrismaClientValidationError');
        } else {
          console.error('Unknown Error');
        }
        return { ok: false, error: `서버에서 예상치 못한 문제가 발생했습니다.` };
      }
    }
  };
}
