import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Resolver } from '@types';

export function handleResolverError(resolver: Resolver): Resolver {
  return async (root, args, context, info) => {
    try {
      return await resolver(root, args, context, info);
    } catch (error) {
      // console.error(message, code);
      if (error instanceof PrismaClientKnownRequestError) {
        const { code, meta } = error;
        switch (code) {
          case 'P2002':
            switch ((meta as { target: string[] }).target[0]) {
              case 'email':
                return { ok: false, error: 'The Email Already Registered' };
              case 'username':
                return { ok: false, error: 'The Username Already Exists' };
              default:
                return { ok: false, error: 'User Already Exists' };
            }
          case 'P2025':
            return { ok: false, error: 'User Not Found' };
          default:
            return { ok: false, error: `Unexpected Server Error${code ? `(Code: ${code})` : ''}` };
        }
      } else {
        console.error(error);
        return { ok: false, error: `Unexpected Server Error` };
      }
    }
  };
}
