import 'dotenv/config';
import jwt from 'jsonwebtoken';
import client from '../client';
import { AuthorizedResolver, CommonOutput } from '../types';

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

export function authorized(resolver: AuthorizedResolver): AuthorizedResolver {
  return async (parent, args, context, info): Promise<CommonOutput> => {
    if (!context.authorizedUser) return { ok: false, error: 'No User Authorized' };
    return resolver(parent, args, context, info);
  };
}
