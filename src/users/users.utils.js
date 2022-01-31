import 'dotenv/config';
import jwt from 'jsonwebtoken';
import client from '../client';

export async function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof decoded === 'string') return null;
    return await client.user.findUnique({ where: { id: decoded.id } });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export function authorized(resolver) {
  return (root, args, context, info) => {
    if (!context.authorizedUser) return { ok: false, error: 'No User Authorized' };
    return resolver(root, args, context, info);
  };
}
