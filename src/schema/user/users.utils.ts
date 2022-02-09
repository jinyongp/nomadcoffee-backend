import client from '@client';
import { AuthorizedResolver, CommonOutput } from '@types';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function getUser(token: string | undefined) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret);
    if (typeof decoded === 'string') return null;
    return await client.user.findUnique({ where: { id: decoded.id } });
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export function authorized<T>(resolver: AuthorizedResolver<T>): AuthorizedResolver<T> {
  return async (parent, args, context, info): Promise<CommonOutput> => {
    if (!context.authorizedUser) return { ok: false, error: '인증된 사용자가 없습니다.' };
    return resolver(parent, args, context, info);
  };
}
